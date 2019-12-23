import React from 'react';
import './Login.css'
import { Redirect } from 'react-router';

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      username : '',
      password : '',
      action : ''
    }
  }
  validate(uname, pword){
    let requestBody = { username : uname, password : pword };
		fetch('http://localhost:8080/login', {
      headers: new Headers({'Content-type': 'application/json'}),
		 	method: 'post',
      body: JSON.stringify(requestBody)
		}).then(response => {
      if(response.status === 200)
        return response.json()
    }).then((data)=>{
      if(data)
        localStorage.setItem("userId",data.id);
        localStorage.setItem("userName",data.username);
        data.role === 'admin' ?
        this.setState({action:"/admin"}) :
        this.setState({action:"/home"}) ;
    });        
  }
  render() {
    if(this.state.action !==''){
      return <Redirect to={this.state.action}/>;
    }
    return (
      <div>
        <div className="login-page">
          <div className="form">
            <form method="get" action={this.state.action} className="login-form">
              <input type="text" placeholder="Username" value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
              <input type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
              <button type="button" onClick={()=>this.validate(this.state.username,this.state.password)} >Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;