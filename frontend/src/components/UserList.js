import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Table } from 'semantic-ui-react'

const UserList = (props) => {

  const style = {
    marginTop: 50
  }

  return (
    <Container text>
      <h2>Users</h2>
      <div style={style}>
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Blogs added</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.users.map(u =>
              <Table.Row key={u.id}>
                <Table.Cell>
                  <Link to={`/users/${u.id}`}>
                    {u.name}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {u.blogs.length}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserList)