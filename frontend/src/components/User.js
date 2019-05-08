import React from 'react'

//käyttäjän lisäämät blogit
const User = ({ user }) => {
  if (user === undefined) {
    return null
  }
  return (
    <div className='user'>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default User