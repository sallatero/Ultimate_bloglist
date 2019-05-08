import React, { useState, useEffect } from 'react'
//import Blog from './components/Blog'
//import blogService from './services/blogs'
//import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogoutButton from './components/LogoutButton'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { setMessage } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { connect } from 'react-redux'
import Bloglist from './components/BlogList'
import { initializeUser, setUser, loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/userlistReducer'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import Home from './components/Home'

const App = (props) => {

  //Haetaan kannasta blogit
  useEffect(() => {
    props.initializeBlogs()
  }, [])

  //Haetaan kirjautuneen käyttäjän tiedot ekalla latauksella
  useEffect(() => {
    props.initializeUser()
  }, [])

  //Haetaan kannasta käyttäjät
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

  return (
    <div className='app'>
      <Router>
        <div>
          <div>
            <Link to="/">home</Link>

          </div>
          <Route exact path="/" render={() => <Home />} />

        </div>
      </Router>
    </div>
  )
}

/*
<Link to="/blogs">blogs</Link>
<Link to="/users">users</Link>

<Route path="/blogs" render={() => <Blogs />} />
<Route path="/users" render={() => <Users />} />
*/

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setMessage,
  initializeUser, setUser, logoutUser, loginUser,
  initializeBlogs, likeBlog, deleteBlog,
  initializeUsers
}
export default connect(mapStateToProps, mapDispatchToProps)(App)