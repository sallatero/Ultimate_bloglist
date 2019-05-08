import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
  console.log('PROPS: ', props)

  return (
    <div>
      <h2>Blogs</h2>
      {props.blogsToShow.map(b =>
        <BlogListItem key={b.id} blog={b} />
      )}
    </div>
  )
}

const BlogListItem = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <p style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></p>
  )
}

//Sorts blogs for rendering
const blogsToShow = ({ blogs }) => {
  console.log('blogsToShow: ', blogs)
  const blogsToShow = blogs.sort((a, b) => b.likes - a.likes)
  return blogsToShow
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    blogsToShow: blogsToShow(state)
  }
}


export default connect(mapStateToProps)(BlogList)
