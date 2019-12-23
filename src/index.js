import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './login/Login'
import Admin from './admin/Admin'

const routing = (
    <Router>
      <div>
        <Route path="/" exact component={Login}/>
        <Route path="/login" component={Login} />
        <Route path="/home" component={App} />
        <Route path="/admin" component={Admin} />
      </div>
    </Router>
)  

ReactDOM.render(routing, document.getElementById('root'));
