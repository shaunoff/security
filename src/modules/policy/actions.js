import * as action from './actionTypes';
import axios from 'axios';


/* ------------    ACTION CREATORS      ------------------ */


const getPolicies = policies   => ({ type: action.FETCH_POLICIES, policies });





export const fetchPolicies = () => dispatch => {
  axios.get('/api/policies')
   .then(res => dispatch(getPolicies(res.data)))
   .catch(err => console.error('Some Error', err));
};
