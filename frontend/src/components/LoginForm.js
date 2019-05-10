import React from 'react'
import Togglable from '../components/Togglable'
import { useField } from '../hooks'
import { setMessage } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loggedUserReducer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button, FormField } from 'semantic-ui-react'

export const LoginForm = (props) => {
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    resetUsername()
    resetPassword()
    try {
      props.loginUser(event.target[0].value, event.target[1].value)
      props.history.push('/')
      console.log('HISTORY PUSH')
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
        <h2>Login here</h2>

        <Form onSubmit={handleLogin}>
          <Form.Field>
            <label>Username</label>
            <input {...username} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input {...password} />
          </Form.Field>
          <Button primary type="submit">log in</Button>
          <Button type="reset" onClick={() => loginFormRef.current.toggleVisibility()}>cancel</Button>
        </Form>
      </div>
    </Togglable>
  )
}

const mapDispatchToProps = {
  loginUser, setMessage
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))