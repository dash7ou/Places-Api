import React from 'react';
import { BrowserRouter as Router , Switch, Route } from "react-router-dom";
import Users from "./user/pages/User";
import './App.css';

const App = ()=> {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Users}/>
      </Switch>
    </Router>
  );
}

export default App;
