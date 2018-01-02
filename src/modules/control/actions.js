import * as action from './actionTypes';
import axios from 'axios';


/* ------------    ACTION CREATORS      ------------------ */

const getControls = controls   => ({ type: action.FETCH_CONTROLS, controls });
const update = control   => ({ type: action.UPDATE_CONTROL, control });


export const fetchControls = () => dispatch => {
  axios.get('/api/controls')
   .then(res => dispatch(getControls(res.data)))
   .catch(err => console.error('Some Error', err));
};

export const updateControl = (props) => dispatch => {

  axios.put(`/api/controls/${props.id}`,props)
   .then(res => dispatch(update(res.data)))
   .catch(err => console.error('Some Error', err));
};

export const addEvidence = ({policyId,controlId}) => dispatch => {
  axios.put(`/api/controls/evidence/${controlId}`,{policyId})
   .then(res => dispatch(update(res.data)))
   .catch(err => console.error('Some Error', err));
};
