import { combineReducers } from 'redux'
import { RECEIVE_ISSUE } from './actionTypes'

interface Action {
  type: string, 
  data?: object,
  msg?: object,
}
const initUser:object = {}
// 产生user状态的reducer
function post(state:object = initUser, action:Action) {
  switch(action.type) {
    case RECEIVE_ISSUE: 
      return action.data
    default: 
      return state
  }
}

export default combineReducers({
  post
})