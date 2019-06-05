import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Icon } from 'semantic-ui-react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  //hideWhenVisible: piilotetaan kun login-lomake on näkyvissä
  const hideWhenVisible = { display: visible ? 'none' : '' }

  //showWhenVisible: näytetään kun login-lomakkeen tulisi olla näkyvissä
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const myButton = () => {
    if (props.buttonLabel === 'login') {
      return (
        <Button icon labelPosition='left' onClick={toggleVisibility}>
          <Icon name='sign-in'/>Login</Button>
      )
    } else if (props.buttonLabel === 'add blog') {
      return (
        <Button icon labelPosition='left' data-cy='add-blog' onClick={toggleVisibility}>
          <Icon name='add'/>Add blog</Button>
      )
    } else {
      return null
    }
  }

  return (
    <React.Fragment>
      <Container textAlign='right' style={hideWhenVisible}>
        {myButton()}
      </Container>
      <Container style={showWhenVisible}>
        {props.children}
      </Container>
    </React.Fragment>
  )
}
)

Togglable.displayName = 'Togglable'

export default Togglable