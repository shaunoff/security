import * as actions from './actionTypes'

export default function reducers(state=[], action){
  switch(action.type){
		case actions.FETCH_POLICIES:
      return action.policies
    default:
      return state;
  }
}
