import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Container } from 'semantic-ui-react'

/*
Komponentin Togglable luova funktio on kääritty funktiokutsun forwardRef sisälle.
Näin lapsikomponentti (esim. Appin BlogForm) pääsee käsiksi tähän Togglable-komponenttiin.

Togglable käyttää useImperativeHandle-hookia tarjotakseen sisäistä funktiotaan
toggleVisibility ulkopuolelta kutsuttavaksi.
*/

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

  /*
  Eka div (hideWhenVisible) on sellainen nappula, joka tuo esiin sen 'masterin'.
  Nappula on piilossa kun sen 'master' on näkyvillä

  Toinen div (showWhenVisible) on edellisen master, sen yhteydessä on nappula,
  jolla master voidaan piilottaa
  */
  return (
    <React.Fragment>
      <Container textAlign='right' style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Container>
      <Container style={showWhenVisible}>
        {props.children}
      </Container>
    </React.Fragment>
  )
}
)

export default Togglable