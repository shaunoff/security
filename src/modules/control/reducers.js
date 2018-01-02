import * as actions from './actionTypes'

export default function reducers(state=[], action){
  switch(action.type){
		case actions.FETCH_CONTROLS:
      return action.controls
    case actions.UPDATE_CONTROL:
      const newArray = state.map( control => control.id === action.control.id ? action.control : control)
        return newArray
    default:
      return state;
  }
}
