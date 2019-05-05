import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const LoginForm = ({ handleSubmit }) => {
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  const preSubmit = (event) => {
    resetUsername()
    resetPassword()
    handleSubmit(event)
  }

  return (
    <div className='loginForm'>
      <h2>Kirjaudu sisään</h2>

      <form onSubmit={preSubmit}>
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
  )
}

export default LoginForm