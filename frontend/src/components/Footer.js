import React from 'react'
import { Container, Segment } from 'semantic-ui-react'

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
          <div style={style}>
            Blog listing app by <em>Salla Tero</em>
          </div>
        </Segment>
      </Container>
    </div>
  )
}

export default Footer