import React from 'react'
import {BrowserRouter as Router, Route, Switch  } from 'react-router-dom'

import Login from '../components/Login.js/Login';
import Home from '../components/Home/Home';

import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/Login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
