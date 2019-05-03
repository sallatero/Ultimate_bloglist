import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log('Notification props: ', props)
  let style = {
    margin: 15,
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (props.notification === '') {
    style.display = 'none'
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification: state
  }
}

export default connect(mapStateToProps)(Notification)