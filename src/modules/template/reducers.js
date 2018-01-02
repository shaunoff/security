import * as actions from './actionTypes'

export default function reducers(state={}, action){
  switch(action.type){
		case actions.UPLOADING:
      return {...state, uploading: true}
    default:
      return state;
  }
}
