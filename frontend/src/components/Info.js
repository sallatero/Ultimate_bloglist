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
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}
export default connect(mapStateToProps)(Info)