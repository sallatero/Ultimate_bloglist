import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const BlogList = (props) => {
  console.log('PROPS: ', props)

  return (
    <div>
      <h2>Blogs</h2>
      {props.blogsToShow.map(b =>
        <Blog key={b.id} blog={b} />
      )}
    </div>
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
    blogsToShow: blogsToShow(state),
    username: state.user.username
  }
}


export default connect(mapStateToProps)(BlogList)
