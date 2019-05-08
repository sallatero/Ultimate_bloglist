import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserListItem = ({ user }) => {
  return (
    <tr><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
  )
}

const UserList = (props) => {

  return (
    <div className='user-list'>
      <h2>Users</h2>
      <table><tbody>
        <tr><th></th><th>blogs created</th></tr>
        {props.users.map(u =>
          <UserListItem key={u.id} user={u} />
        )}
      </tbody></table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserList)