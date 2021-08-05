import React from 'react'
import {BrowserRouter as Router, Route, Switch  } from 'react-router-dom'
import Login from '../components/Login/Login';
import Logout from '../components/Logout/Logout';
import Home from '../components/Home/Home';


import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Route path='/logout' component={Logout}/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
