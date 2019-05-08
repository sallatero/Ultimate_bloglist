import React from 'react'
import PropTypes from 'prop-types'
import Togglable from '../components/Togglable'
import { useField } from '../hooks'
import { setMessage } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loggedUserReducer'
import { connect } from 'react-redux'


const LoginForm = (props) => {
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    resetUsername()
    resetPassword()
    try {
      props.loginUser(event.target[0].value, event.target[1].value)
    } catch(exception) {
      console.log('exception: ', exception)
      props.setMessage('kirjautuminen epäonnistui')
    }
  }

  //Ref loginformiin
  const loginFormRef = React.createRef()

  return (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <div className='loginForm'>
        <h2>Kirjaudu sisään</h2>

        <form onSubmit={handleLogin}>
          <div>
          Käyttäjätunnus
            <input {...username} />
          </div>
          <div>
          Salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    </Togglable>
  )
}

const mapDispatchToProps = {
  loginUser, setMessage
}

export default connect(null, mapDispatchToProps)(LoginForm)