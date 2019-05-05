import blogService from '../services/blogs'
import { setMessage } from '../reducers/notificationReducer'

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const setUser = (user) => {
  return dispatch => {
    console.log('setUser: ', user)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
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
    blogService.setToken(null)
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