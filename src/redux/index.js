import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import section from '../modules/section'
import control from '../modules/control'
import policy from '../modules/policy'
import savePoint from '../modules/savePoint'

export default combineReducers({
	 users, stories,
	 sections: section.reducers,
	 controls: control.reducers,
	 policies: policy.reducers,
	 savePoints: savePoint.reducers
  });
