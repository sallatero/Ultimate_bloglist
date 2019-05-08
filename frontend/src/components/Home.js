import React from 'react'
import Notification from './Notification'
import LoginForm from './LoginForm'
import LogoutButton from './LogoutButton'
import { connect } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Home = (props) => {

  return (
    <div className='home'>
      <h1>Blogilista-sovellus</h1>
      <Notification />

      {props.user === null ?
        <LoginForm /> :
        <div>
          <p>{props.user.name} logged in</p>
          <LogoutButton />
          <BlogForm />
          <BlogList />
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
  logoutUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
