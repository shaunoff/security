import * as actions from './actionTypes'

export default function reducers(state=[], action){
  switch(action.type){
    case actions.FETCH_SAVEPOINTS:
      return action.savePoints
    default:
      return state;
  }
}
