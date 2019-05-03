import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogoutButton from './components/LogoutButton'
import Togglable from './components/Togglable'
import { setMessage } from './reducers/notificationReducer'
import { connect } from 'react-redux'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  //const [message, setMessage] = useState('')
  //const [err, setErr] = useState(false)

  //Haetaan kannasta blogit
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  //Haetaan kirjautuneen käyttäjän tiedot ekalla latauksella
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addMessage = (message) => {
    console.log('App addMessage')
    props.setMessage(message, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in', event.target[0].value, event.target[1].value)

    try {
      const response = await loginService.login({
        username: event.target[0].value, password: event.target[1].value
      })
      if (response.errorTitle && response.statusCode) { //Authentication problem
        addMessage(`Kirjautuminen ei onnistunut: ${response.errorTitle}`)
        return
      } else {
        const user = response
        setUser(user)
        addMessage('Kirjautuminen onnistui')

        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        addMessage(`Tervetuloa ${user.name}`)
      }
    } catch(exception) {
      addMessage('kirjautuminen epäonnistui')
    }
  }

  //Ref loginformiin
  const loginFormRef = React.createRef()

  /*
    loginForm()-funktio kutsuu komponentteja
    - Togglable
      joka hoitaa näkyvyyden vaihtelun käärimällä lapsielementin <LoginForm>
      itsensä sisään
    - LoginForm
      joka huolehtii itse kirjautumislomakkeen ulkoasusta
  */
  const loginform = () => {
    return (
      <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out user')
    try {
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      addMessage('Hei hei!')
    } catch(exception) {
      addMessage('uloskirjaus ei onnistunut')
    }
  }

  const handleBlogLike = async (id) => {
    const oldVersion = blogs.find(b => b.id === id)
    const newVersion = { ...oldVersion, likes: oldVersion.likes + 1 }
    try {
      await blogService.update(id, newVersion)
      setBlogs(blogs.map(b => b.id !== id ? b : newVersion))
      addMessage('blogin likettäminen onnistui')
    }catch (exception) {
      addMessage('Blogin likettäminen ei onnistunut')
    }
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    /* blogFormRef-refin ja Togglablen hookin ansiosta
      voidaan tässä kutsua Togglablen funktiota toggleVisibility,
      joka piilottaa bloginlisäysformin. */
    blogFormRef.current.toggleVisibility()

    console.log('adding a new blog', event.target[0].value)
    try {
      const response = await blogService.create({
        title: event.target[0].value, author: event.target[1].value, url: event.target[2].value, likes: event.target[3].value
      })
      if (response.errorTitle && response.statusCode) { // Problem
        console.log('Problem adding blog: ', response)
        if (response.errorTitle === 'expired token') {
          try {
            window.localStorage.clear()
            blogService.setToken(null)
            setUser(null)
            addMessage('Kirjaudu sisään uudelleen!')
          } catch(exception) {
            addMessage('uloskirjaus ei onnistunut')
          }
        }
        addMessage(`blogin lisääminen ei onnistunut: ${response.errorTitle}`)
      } else {
        setBlogs(blogs.concat(response))
        addMessage('blogin lisääminen onnistui')
      }
    } catch(exception) {
      //Jos käyttäjän token on vanhentunut
      addMessage('Istuntosi on vanhentunut. Kirjaudu uudelleen sisään.')
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
    }
  }

  const handleBlogDelete = async (id) => {
    try {
      const blog = blogs.find(b => b.id === id)
      if (!blog) {
        addMessage('Blogia ei löytynyt')
      }
      window.confirm(`Haluatko varmasti poistaa blogin ${blog.title}?`)
      await blogService.remove(id)
      const filtered = blogs.filter((b) => {
        return b.id !== id
      })
      setBlogs(filtered)
      addMessage('blogin poisto onnistui')
    } catch (exception) {
      console.log('exception: ', exception)
      //Jos käyttäjän token on vanhentunut
      addMessage('Istuntosi on vanhentunut. Kirjaudu uudelleen sisään.')
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
    }
  }

  //Ref blogiformiin
  const blogFormRef = React.createRef()

  /*
    blogForm()-funktio kutsuu komponentteja
    - Togglable
      joka hoitaa näkyvyyden vaihtelun käärimällä lapsielementin <BlogForm>
      itsensä sisään
    - BlogForm
      joka huolehtii itse bloginlisäyslomakkeen ulkoasusta
  */

  const blogform = () => {
    return (
      <Togglable buttonLabel='lisää blogi' ref={blogFormRef}>
        <BlogForm
          handleSubmit={handleBlogAdd}
        />
      </Togglable>
    )
  }

  return (
    <div className='app'>
      <h1>Blogilista-sovellus</h1>
      <Notification />

      {user === null ?
        <div>{loginform()}</div> :
        <div>
          <p>{user.name} logged in</p>
          <LogoutButton handleSubmit={handleLogout} />
          {blogform()}
          <h2>blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes).map(b =>
            <Blog key={b.id} blog={b} addLike={handleBlogLike} deleteBlog={handleBlogDelete} username={user.username}/>
          )}
        </div>
      }
    </div>
  )
}

const mapDispatchToProps = {
  setMessage
}

export default connect(null, mapDispatchToProps)(App)