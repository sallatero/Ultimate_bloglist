import userService from '../services/users'

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