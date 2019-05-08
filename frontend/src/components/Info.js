import React from 'react'
import Notification from './Notification'
import LoginForm from './LoginForm'
import LogoutButton from './LogoutButton'
import { connect } from 'react-redux'

const Info = (props) => {

  return (
    <div className='info'>
      <h1>Blogilista-sovellus</h1>
      <Notification />
      {props.user === null ?
        <LoginForm /> :
        <div>
          <p>{props.user.name} logged in</p>
          <LogoutButton />
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
export default connect(mapStateToProps)(Info)