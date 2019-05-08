import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/loggedUserReducer'
import { setMessage } from '../reducers/notificationReducer'

const LogoutButton = (props) => {

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out user')
    try {
      props.logoutUser()
    } catch(exception) {
      props.setMessage('uloskirjaus ei onnistunut')
    }
  }

  return (
    <div>
      <button type="submit" onClick={handleLogout}>logout</button>
    </div>
  )
}
const mapDispatchToProps = {
  logoutUser, setMessage
}
export default connect(null, mapDispatchToProps)(LogoutButton)