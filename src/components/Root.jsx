import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Sidebar from './Sidebar';
import Navbar from './Navbar';


import Control from '../modules/control'
import Section from '../modules/section'
import SavePoint from '../modules/savePoint'
import Dashboard from '../modules/dashboard'

import { fetchSections } from "../modules/section/actions"
import { fetchControls } from "../modules/control/actions"
import { fetchPolicies } from "../modules/policy/actions"
import { fetchUsers } from '../redux/users';
import { fetchStories } from '../redux/stories';

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
	componentDidMount() {
		this.props.fetchInitialData();
	}
	render () {
		return (
	    <Router>
				<div id="main">
			    <Navbar />
					<div style={{display: 'flex'}}>
						<Sidebar />
						<div style={{flex: 1}}>
							<Route exact path="/" component={Dashboard.containers} />
							<Route path="/section/:id" component={Control.containers.Control} />
							<Route exact path="/section" component={Section.containers} />
							<Route exact path="/savePoint" component={SavePoint.containers} />
						</div>
					</div>
			  </div>
		  </Router>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null;

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchUsers());
    dispatch(fetchStories());
		dispatch(fetchSections());
		dispatch(fetchControls());
		dispatch(fetchPolicies());
    // what other data might we want to fetch on app load?
  }
});

export default connect(mapState, mapDispatch)(Root);
