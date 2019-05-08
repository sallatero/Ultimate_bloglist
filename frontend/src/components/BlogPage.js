import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'

const BlogPage = (props) => {
  if (props.blog === undefined) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  let deletable = true
  if (props.loggedUser === null) {
    deletable = false
  } else if (props.blog.user) {
    deletable = props.blog.user.username === props.loggedUser.username
  }
  //ableToDelete: blogin delete-nappula näkyy vain blogin lisänneelle käyttäjälle
  const ableToDelete = { display: deletable ? '' : 'none' }

  const addLike = (blog) => {
    props.likeBlog(blog, props.loggedUser.token)
  }
  const deleteBlog = (blog) => {
    props.deleteBlog(blog, props.loggedUser.token)
    props.history.push('/')
  }

  return (
    <div style={blogStyle} className='blog'>
      <h2>{props.blog.title} by {props.blog.author}</h2>
      <p><a href={props.blog.url}>{props.blog.url}</a></p>
      <p>{props.blog.likes} likes <button onClick={() => addLike(props.blog)}>like</button></p>
      <p>added by {props.blog.user ? props.blog.user.name : ''}</p>
      <div style={ableToDelete}>
        <p><button onClick={() => deleteBlog(props.blog)}>delete</button></p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  likeBlog, deleteBlog,
  setMessage
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogPage))