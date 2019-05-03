import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')
  const [likes, likesReset] = useField('number')

  const addBlog = (event) => {
    event.preventDefault()
    console.log('adding a new blog', event.target.title.value)

    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: event.target.likes.value
    }
    console.log('BlogForm blogi: ', blog)
    titleReset()
    authorReset()
    urlReset()
    likesReset()
    try {
      props.createBlog(blog)
      props.setMessage(`New blog added '${blog.title}`, 5000)
      props.blogFormRef.current.toggleVisibility()
    } catch (exception) {
      props.setMessage('Blog add unsuccessful!', 5000)
    }
  }



  return (
    <div>
      <h2>Lisää blogi</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input name='title' {...title} />
        </div>
        <div>
          Author
          <input name='author' {...author} />
        </div>
        <div>
          Url
          <input name='url' {...url} />
        </div>
        <div>
          Likes
          <input name='likes' {...likes} />
        </div>
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  setMessage
}

export default connect(null, mapDispatchToProps)(BlogForm)