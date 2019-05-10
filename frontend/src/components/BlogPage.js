import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'
import CommentForm from './CommentForm'
import { Divider, Header, Table, Button, List, ListContent, Image, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const BlogPage = (props) => {
  if (props.blog === undefined) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  let deletable = true
  if (props.loggedUser === null) {
    deletable = false
  } else if (props.blog.user) {
    deletable = props.blog.user.username === props.loggedUser.username
  }
  //ableToDelete: blogin delete-nappula näkyy vain blogin lisänneelle käyttäjälle
  const ableToDelete = { display: deletable ? '' : 'none' }

  const addLike = (blog) => {
    props.likeBlog(blog, props.loggedUser.token)
  }
  const deleteBlog = (blog) => {
    props.deleteBlog(blog, props.loggedUser.token)
    props.history.push('/')
  }

  //Kokeile like-nappulasta primary
  //tee delete-nappula kaikille ja disabled jos ei saa poistaa
  return (
    <Container text>
      <Divider horizontal>
        <Header as='h4'>
          {props.blog.title} by {props.blog.author}
        </Header>
      </Divider>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>Title</Table.Cell>
            <Table.Cell>{props.blog.title}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Author</Table.Cell>
            <Table.Cell>{props.blog.author}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Url</Table.Cell>
            <Table.Cell>
              <Link to={props.blog.url}>{props.blog.url}</Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Likes</Table.Cell>
            <Table.Cell>
              {props.blog.likes} </Table.Cell>
            <Table.Cell>
              <Button size='mini' onClick={() => addLike(props.blog)}>like</Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Added by</Table.Cell>
            <Table.Cell>
              {props.blog.user ?
                <Link to={`/users/${props.blog.user.id}`}>{props.blog.user.name}</Link>
                : '' }
            </Table.Cell>
            <Table.Cell>
              {deletable ?
                <Button size='mini' onClick={() => deleteBlog(props.blog)}>delete</Button>
                : ''}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Divider horizontal>
        <Header as='h4'>
      Comments
        </Header>
      </Divider>
      <CommentForm blog={props.blog}/>
      <List celled>
        {props.blog.comments.map(c =>
          <List.Item key={c.id}> <Image avatar src="/comment.png" />
            <ListContent>{c.text}</ListContent></List.Item>
        )}
      </List>
    </Container>
  )
}
/*
const blogDetails = () => {
  return (

  )
}

const blogComments = () => {
  return (

  )
}
*/
const mapStateToProps = (state) => {
  //console.log(state)
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  likeBlog, deleteBlog,
  setMessage
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogPage))