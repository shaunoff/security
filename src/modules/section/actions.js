import * as action from './actionTypes';
import axios from 'axios';


/* ------------    ACTION CREATORS      ------------------ */

const fetch = sections   => ({ type: action.FETCH_SECTIONS, sections });

export const changeOpen = number => ({ type: action.CHANGE_OPEN, number });
export const filterIncomplete = filter => ({ type: action.FILTER_INCOMPLETE, filter });

export const fetchSections = () => dispatch => {
  axios.get('/api/sections')
   .then(res => dispatch(fetch(res.data)))
   .catch(err => console.error('Some Error', err));
};
