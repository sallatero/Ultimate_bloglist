import React from 'react'
import { connect } from 'react-redux'
import Info from './Info'

const UserList = (props) => {

  return (
    <div className='user-list'>
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