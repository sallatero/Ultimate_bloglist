import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'

import MenuComponent from './components/MenuComponent'
import Footer from './components/Footer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/userlistReducer'


const App = (props) => {
  console.log('app alkoi')
  //Haetaan kirjautuneen käyttäjän tiedot ekalla latauksella
  useEffect(() => {
    props.initializeUser()
  }, [])

  //Haetaan kannasta blogit
  useEffect(() => {
    props.initializeBlogs()
  }, [])

  //Haetaan kannasta käyttäjät
  useEffect(() => {
    props.initializeUsers()
  }, [])

  return (
    <Router>
      <MenuComponent />
      <Footer />
    </Router>
  )
}

const mapDispatchToProps = {
  initializeUser,
  initializeBlogs,
  initializeUsers
}
export default connect(null, mapDispatchToProps)(App)