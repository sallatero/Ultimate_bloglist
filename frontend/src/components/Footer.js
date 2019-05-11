import React from 'react'
import LoginForm from './LoginForm'
import Info from './Info'
import LogoutButton from './LogoutButton'
import Home from './Home'
import BlogPage from './BlogPage'
import User from './User'
import UserList from './UserList'
import { connect } from 'react-redux'
import { Container, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, withRouter, NavLink } from 'react-router-dom'

const Footer = (props) => {

  const style = {
    margin: 10,
    padding: 5
  }
  const style2 = {
    marginTop: 100
  }

  return (
    <div style={style2}>
      <Container>
        <Segment inverted>
          <div style={style}>Icons made by
            <a href="https://www.freepik.com/?__hstc=57440181.7ebf30df7b4e39a47331243185735b83.1557492653527.1557492653527.1557492653527.1&__hssc=57440181.6.1557492653527&__hsfp=1185596251"
              title="Freepik"> Freepik </a> from
            <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com </a>
         is licensed by  <a href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0" target="_blank"> CC 3.0 BY </a>
          </div>
        </Segment>
      </Container>
    </div>
  )
}

export default Footer