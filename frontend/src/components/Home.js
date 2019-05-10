import React from 'react'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Info from './Info'
import { Container } from 'semantic-ui-react'

const Home = () => {
  return (
    <Container text>
      <h2>Blogs</h2>
      <BlogForm />
      <BlogList />
      <div>Icons made by <a href="https://www.freepik.com/?__hstc=57440181.7ebf30df7b4e39a47331243185735b83.1557492653527.1557492653527.1557492653527.1&__hssc=57440181.6.1557492653527&__hsfp=1185596251" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    </Container>
  )
}
export default Home
