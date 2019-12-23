import React from 'react';
import {Navbar as Nav} from 'react-bootstrap'
import './Navbar.css';
import { Redirect } from 'react-router';

class Navbar extends React.Component {
	constructor(){
		super();
		this.state = {
			logoutRedirect : false
		}
	}
	logout(){
		localStorage.removeItem("userId");
		localStorage.removeItem("userName");
		this.setState({
			logoutRedirect : true
		})
	}
	render(){
		if(this.state.logoutRedirect === true){
			return <Redirect to="/login"/>;
		}
		let uname = '';
		if (localStorage.hasOwnProperty("userName")) {
			uname = localStorage.getItem("userName")
		}
		else{
			return <Redirect to="/login"/>;
		}
		return (
			<Nav>
				<ul>
					<li>Home</li>
					<li>About</li>
					<li onClick={()=>this.logout()}>Logout</li>
					<li>Welcome {uname}</li>
				</ul>
			</Nav>
		  );		
	}
}
export default Navbar;
