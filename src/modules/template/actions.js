import * as action from './actionTypes';
import axios from 'axios';


/* ------------    ACTION CREATORS      ------------------ */

export const exampleAction   = stories => ({ type: INITIALIZE, stories });
const create = story   => ({ type: CREATE, story });
const remove = id      => ({ type: REMOVE, id });
const update = story   => ({ type: UPDATE, story });


export const exampleThunk = () => dispatch => {
  axios.get('/api/stories')
       .then(res => dispatch(exampleAction(res.data)))
       .catch(err => console.error('Some Error', err));
};
