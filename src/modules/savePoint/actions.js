import * as action from './actionTypes';
import axios from 'axios';


/* ------------    ACTION CREATORS      ------------------ */

const fetch = savePoints   => ({ type: action.FETCH_SAVEPOINTS, savePoints });


export const fetchSavePoint = () => dispatch => {
  axios.get('/api/savePoint')
   .then(res => dispatch(fetch(res.data)))
   .catch(err => console.error('Some Error', err));
};
