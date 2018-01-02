import React, { Component } from 'react'
import { Menu, Icon,Header} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import Home from 'react-icons/lib/io/ios-home-outline';
import Section from 'react-icons/lib/io/ios-speedometer-outline';
export default class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: 'inbox'
		};
		this.handleClick = this.handleClick.bind(this)
	}

  handleClick(e, { name }){
		this.setState({ activeItem: name })
	}

  render() {
    return (
			<div className="sidebar" style={{height: "calc(100vh - 50px)", backgroundColor: '#4D394B',width: "200px", display: 'flex', flexDirection: 'column'}}>
				<NavLink exact to="/" className="navlink" activeClassName="selected">
					<Home fontSize="24px" style={{marginRight: "20px"}}/>
					DASHBOARD
				</NavLink>
				<NavLink to="/section" className="navlink" activeClassName="selected">
					<Section fontSize="24px" style={{marginRight: "20px"}}/>
					ASSESSMENT
				</NavLink>
				<NavLink to="/savePoint" className="navlink" activeClassName="selected">
					<Section fontSize="24px" style={{marginRight: "20px"}}/>
					SAVE POINTS
				</NavLink>

			</div>
    )
  }
}
