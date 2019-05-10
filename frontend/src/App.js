import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import UserList from './components/UserList'
import Home from './components/Home'
import Info from './components/Info'
import User from './components/User'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { connect } from 'react-redux'
import { initializeUser, setUser, loginUser, logoutUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/userlistReducer'
import { BrowserRouter as Router, Route, withRouter, Link, NavLink } from 'react-router-dom'
import BlogPage from './components/BlogPage'
import { Container, Menu } from 'semantic-ui-react'

const App = (props) => {
  console.log('app alkoi')
  //Haetaan kirjautuneen käyttäjän tiedot ekalla latauksella,  console.log('initializing logged in user')
  useEffect(() => {
    props.initializeUser()
  }, [])

  //Haetaan kannasta blogit, console.log('initializing blogs')
  useEffect(() => {
    props.initializeBlogs()
  }, [])

  //Haetaan kannasta käyttäjät,  console.log('initializing all users')
  useEffect(() => {
    props.initializeUsers()
  }, [])

  const userById = (id) => {
    const user = props.users.find(u => u.id === id)
    return user
  }

  const blogById = (id) => {
    const blog = props.blogs.find(b => b.id === id)
    return blog
  }

  /*
  const padding = { padding: 5 }
  <NavLink style={padding} exact to="/" activeClassName="selected">home</NavLink>
  <NavLink style={padding} to="/users" activeClassName="selected">users</NavLink>

  active={activeItem === 'home'} onClick={handleItemClick}
  active={activeItem === 'users'} onClick={handleItemClick}
*/
  /*
  let activeItem = 'home'
  const handleItemClick = (e, { name }) => {
    console.log('handleItemClick ', activeItem, '->', name)
    activeItem = name
    console.log('activeItem after', activeItem)
  }
*/
  return (
    <Container>
      <div className='app'>
        {props.loggedUser === null ?
          <div>
            <Info />
            <Router>
              <LoginForm />
            </Router>
          </div>
          :
          <div>
            <Router>
              <div>
                <Menu size='mini' color='teal' inverted>
                  <Menu.Item name='home' as={NavLink} exact to='/' content='home' />
                  <Menu.Item name='users' as={NavLink} to='/users' content='users' />
                  <Menu.Menu position='right'>
                    <Menu.Item>
                      <em>{props.loggedUser.name} logged in</em>
                    </Menu.Item>
                    <Menu.Item>
                      <LogoutButton />
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>
                <Info />
                <Route exact path="/" render={() =>
                  <Home />
                } />
                <Route exact path="/blogs/:id" render={({ match }) =>
                  <BlogPage blog={blogById(match.params.id)} />
                } />
                <Route exact path="/users" render={() =>
                  <UserList />
                } />
                <Route exact path="/users/:id" render={({ match }) =>
                  <User user={userById(match.params.id)} />
                } />
                <Route path="/login" render={() =>
                  <LoginForm  />
                } />
              </div>
            </Router>
          </div>
        }
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    users: state.users,
    blogs: state.blogs
  }
}
const mapDispatchToProps = {
  setMessage,
  initializeUser, setUser, logoutUser, loginUser,
  initializeBlogs, likeBlog, deleteBlog,
  initializeUsers
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))