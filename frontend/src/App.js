import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogoutButton from './components/LogoutButton'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import Home from './components/Home'
import Info from './components/Info'
import User from './components/User'
import { setMessage } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { connect } from 'react-redux'
import Bloglist from './components/BlogList'
import { initializeUser, setUser, loginUser, logoutUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/userlistReducer'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import BlogPage from './components/BlogPage'

const App = (props) => {
  console.log('app alkoi')
  //Haetaan kirjautuneen käyttäjän tiedot ekalla latauksella,  console.log('initializing logged in user')
  useEffect(() => {
    props.initializeUser()
  }, [])

  //Haetaan kannasta blogit, console.log('initializing blogs')
  useEffect(() => {
    props.initializeBlogs()
  }, [])

  //Haetaan kannasta käyttäjät,  console.log('initializing all users')
  useEffect(() => {
    props.initializeUsers()
  }, [])

  /*
  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in', event.target[0].value, event.target[1].value)

    try {
      props.loginUser(event.target[0].value, event.target[1].value)
    } catch(exception) {
      console.log('exception: ', exception)
      addMessage('kirjautuminen epäonnistui')
    }
  }
*/

  /*
  const loginform = () => {
    return (
      <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }
  */



  /*
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
          <UserList />
          <Bloglist />
        </div>
      }
    </div>
  )  */

  const userById = (id) => {
    const user = props.users.find(u => u.id === id)
    return user
  }

  const blogById = (id) => {
    const blog = props.blogs.find(b => b.id === id)
    return blog
  }

  const padding = { padding: 5 }

  if (props.loggedUser === null) {
    return (
      <div className='app'>
        <Info />
        <Router><LoginForm /></Router>
      </div>
    )
  } else {
    return (
      <div className='app'>
        <Info />
        <div>
          <Router>
            <div>
              <div>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/users">users</Link>
                <div>
                  <em>{props.loggedUser.name} logged in</em>
                  <LogoutButton />
                </div>
              </div>
              <Route exact path="/" render={() =>
                <Home />
              } />
              <Route exact path="/blogs/:id" render={({ match }) =>
                <BlogPage blog={blogById(match.params.id)} />
              } />
              <Route exact path="/users" render={() =>
                <UserList />
              } />
              <Route exact path="/users/:id" render={({ match }) =>
                <User user={userById(match.params.id)} />
              } />
              <Route path="/login" render={() =>
                <LoginForm  />
              } />
            </div>
          </Router>
        </div>
      </div>
    )
  }

  /*
  return (
    <div className='app'>
      <Info />
      {props.loggedUser === null ?
        <Login /> :
        <div>
          <Router>
            <div>
              <div>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/users">users</Link>
                {props.loggedUser
                  ? <div>
                    <em>{props.loggedUser.name} logged in</em>
                    <LogoutButton />
                  </div>
                  : <Link to='/login'>login</Link>
                }
              </div>
              <Route exact path="/" render={() =>
                <Home />
              } />
              <Route exact path="/users" render={() =>
                <UserList />
              } />
              <Route exact path="/users/:id" render={({ match }) =>
                <User user={userById(match.params.id)} />
              } />
              <Route path="/login" render={() =>
                <Login  />
              } />
            </div>
          </Router>
        </div>
      }
    </div>
  )
  */
}

/*
<Link style={padding} to="/blogs">blogs</Link>


<Route path="/blogs" render={() => <Blogs />} />

*/

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    users: state.users,
    blogs: state.blogs
  }
}
const mapDispatchToProps = {
  setMessage,
  initializeUser, setUser, logoutUser, loginUser,
  initializeBlogs, likeBlog, deleteBlog,
  initializeUsers
}
export default connect(mapStateToProps, mapDispatchToProps)(App)