import * as actions from './actionTypes'

export default function reducers(state={sections: [], filter: "", open: ""}, action){
  switch(action.type){
		case actions.FETCH_SECTIONS:
      return {...state, sections: action.sections}
    case actions.CHANGE_OPEN:
      return {...state, open: action.number}
    case actions.FILTER_INCOMPLETE:
      return {...state, filter: action.filter}
    default:
      return state;
  }
}
