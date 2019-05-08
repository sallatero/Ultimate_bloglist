import React from 'react'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Info from './Info'

const Home = () => {
  return (
    <div className='home'>
      <BlogForm />
      <BlogList />
    </div>
  )
}
export default Home
