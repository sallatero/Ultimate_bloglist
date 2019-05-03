import blogService from '../services/blogs'
import { setMessage } from '../reducers/notificationReducer'

/* STATE for blogs:
data: array of blogs
*/

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW',
      data: newBlog
    })
  }
}
export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: { id }
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const obj = { ...blog, likes: blog.likes + 1 }
    //blogs.find(b => b.id === id)
    try {
      const modifiedBlog = await blogService.update(blog.id, obj)
      //{ ...oldVersion, likes: oldVersion.likes + 1 }
      dispatch({
        type: 'LIKE',
        data: modifiedBlog
      })
      //setBlogs(blogs.map(b => b.id !== id ? b : newVersion))
    }catch (exception) {
      console.log('EXCEPTION: Blogin likettäminen ei onnistunut')
      setMessage('Blogin likettäminen ei onnistunut', 5000)
    }
  }
}

const blogReducer = (state = [], action) => {
  console.log('blogReducer: ', action.type, action.data)

  switch (action.type) {
  case 'INIT_BLOGS' : {
    return action.data
  }
  case 'NEW' : {
    const newState = state.concat(action.data)
    return newState
  }
  case 'LIKE' : {
    const newState = state.map(b => b.id === action.data.id ? action.data : b)
    return newState
  }
  case 'DELETE' : {
    const newState = state.filter(b => b.id !== action.data.id)
    return newState
  }
  default:
    return state
  }
}

export default blogReducer