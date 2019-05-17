import loginService from '../services/login'
import userService from '../services/users'
import { setMessage } from '../reducers/notificationReducer'

/* HALUTAANKO TEHDÄ TÄSTÄ TOIMINNALLISUUTTA? JOS LISÄÄ VAIN RESTILLÄ
export const createUser = (username, name, password) => {
  return async dispatch => {
    const newUser = await userService.create(user)
    dispatch(setMessage(`New user added '${user.username}`, 5000))
    dispatch({
      type: 'NEW_USER',
      data: newUser
    })
  }
}
*/

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

const userlistReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS': {
    return action.data
  }
  case 'NEW_BLOG': {
    let newBlog = { ...action.data }
    console.log('USER LIST REDUCER: ', newBlog)
    const newState = state.map(u => {
      if (u.id === newBlog.user.id) {
        //delete newBlog.user
        const newBlogsArr = u.blogs.concat(newBlog)
        return { ...u, blogs: newBlogsArr }
      }
      return u
    })
    return newState
  }
  case 'DELETE_BLOG': {
    let deletableBlog = { ...action.data }
    const newState = state.map(u => {
      if (u.id === deletableBlog.user.id) {
        const newBlogsArr = u.blogs.filter(b => b.id !== deletableBlog.id)
        return { ...u, blogs: newBlogsArr }
      }
      return u
    })
    return newState
  }
  default:
    return state
  }
}

export default userlistReducer