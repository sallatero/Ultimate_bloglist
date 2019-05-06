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
import { createBlog, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { connect } from 'react-redux'
import Bloglist from './components/BlogList'
import { initializeUser, setUser, loginUser, logoutUser } from './reducers/userReducer'

const App = (props) => {
  //const [blogs, setBlogs] = useState([])
  //const [user, setUser] = useState(null)

  //Haetaan kannasta blogit
  useEffect(() => {
    props.initializeBlogs()
  }, [])

  //Haetaan kirjautuneen käyttäjän tiedot ekalla latauksella
  useEffect(() => {
    props.initializeUser()
  }, [])

  const addMessage = (message) => {
    console.log('App addMessage')
    props.setMessage(message, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in', event.target[0].value, event.target[1].value)

    try {
      /*
      const response = await loginService.login({
        username: event.target[0].value, password: event.target[1].value
      })*/
      props.loginUser(event.target[0].value, event.target[1].value)
    } catch(exception) {
      console.log('exception: ', exception)
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
      props.logoutUser()
      //window.localStorage.clear()
      //blogService.setToken(null)
      //setUser(null)
    } catch(exception) {
      addMessage('uloskirjaus ei onnistunut')
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
      <Togglable buttonLabel='add blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef}/>
      </Togglable>
    )
  }

  return (
    <div className='app'>
      <h1>Blogilista-sovellus</h1>
      <Notification />

      {props.user === null ?
        <div>{loginform()}</div> :
        <div>
          <p>{props.user.name} logged in</p>
          <LogoutButton handleSubmit={handleLogout} />
          {blogform()}
          <Bloglist username={props.user.username}/>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setMessage,
  initializeUser, setUser, logoutUser, loginUser,
  initializeBlogs, likeBlog, deleteBlog
}
export default connect(mapStateToProps, mapDispatchToProps)(App)