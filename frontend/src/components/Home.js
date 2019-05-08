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

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out user')
    try {
      props.logoutUser()
    } catch(exception) {
      setMessage('uloskirjaus ei onnistunut')
    }
  }

  //Siirrä handleSubmit LogoutButtoniin
  return (
    <div className='home'>
      <h1>Blogilista-sovellus</h1>
      <Notification />

      {props.user === null ?
        <LoginForm /> :
        <div>
          <p>{props.user.name} logged in</p>
          <LogoutButton handleSubmit={handleLogout} />
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
