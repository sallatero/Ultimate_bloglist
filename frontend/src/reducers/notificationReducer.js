/* STATE for notification:
content: message to be shown
*/

export const setMessage = (content, seconds) => {
  console.log('setMessage: ', content)
  return dispatch => {
    dispatch({
      type: 'SET_MSG',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, seconds)
  }
}

const notificationReducer = (state = '', action) => {
  console.log('notificationReducer: ', action.type, action.data)

  switch (action.type) {
  case 'SET_MSG' : {
    return action.content
  }
  case 'RESET' : {
    return null
  }
  default:
    return state
  }
}

export default notificationReducer