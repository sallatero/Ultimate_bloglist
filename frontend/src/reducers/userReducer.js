import loginService from '../services/login'
import { setMessage } from '../reducers/notificationReducer'

export const initializeUser = () => {
  return dispatch => {
    console.log('initializing logged in user')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username: username, password: password
    })
    if (user.statusCode) {
      dispatch(setMessage('Wrong username or password', 5000))
      dispatch({
        type: 'RESET_USER'
      })
      return
    }
    //Lisää käyttäjän tiedot local storageen
    console.log('user: ', user)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    dispatch(setMessage(`Tervetuloa ${user.name}`, 5000))
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const setUser = (user) => {
  return dispatch => {
    console.log('setUser: ', user)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    dispatch(setMessage(`Tervetuloa ${user.name}`, 5000))
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    console.log('logout user: ')
    window.localStorage.clear()
    //blogService.setToken(null)
    dispatch(setMessage('Hei hei!', 5000))
    dispatch({
      type: 'RESET_USER'
    })

  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER': {
    return action.data
  }
  case 'RESET_USER': {
    return null
  }
  default:
    return state
  }
}

export default userReducer