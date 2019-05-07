import React from 'react'
import { connect } from 'react-redux'

const UserList = (props) => {

  return (
    <div>
      <h2>Users</h2>
      <table><tbody>
        <tr><th></th><th>blogs created</th></tr>
        {props.users.map(u =>
          <User key={u.id} user={u} />
        )}
      </tbody></table>
    </div>
  )
}

const User = (user) => {
  //console.log('USER: ', user)
  return (
    <tr><td>{user.user.name}</td><td>{user.user.blogs.length}</td></tr>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserList)