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

/*
export const deleteBlogFromUser = (blogId, user, token) => {
  return async dispatch => {
    try {
      console.log('user: ', user)
      //pitää hakea käyttäjä kannasta ja poistaa blogId sieltä
      const modifiedBlogs = user.blogs.filter(b => b.id === blogId ? false : true)
      const modifiedObj = { ...user, blogs: modifiedBlogs }
      const response = await userService.update(user.id, modifiedObj, token)
      //Tarkistetaan oikeudet poistoon
      if (response === 401) {
        dispatch(setMessage('Unauthorized action.', 5000))
        dispatch({
          type: 'RESET_USER'
        })
        return
      }
      const modifiedUser = response
      dispatch({
        type: 'UPDATE_USER',
        data: modifiedUser
      })
    }catch (exception) {
      console.log('EXCEPTION: blogin poistaminen käyttäjältä ei onnistunut, ', exception)
    }
  }
}
*/
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

/* DELETE_BLOGIIN
const newState = state.map(u => {
      if (u.id === action.data.user.id) {
        const newBlogsArr = u.blogs.filter(b => b.id === action.data.id ? false : true)
        return { ...u, blogs: newBlogsArr }
      }
      return u
    })
    return newState
*/

export default userlistReducer