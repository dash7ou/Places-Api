import React from 'react';
import { BrowserRouter as Router , Switch, Route } from "react-router-dom";

import Users from "./user/pages/User";
import MainNavigation from "./shared/components/Navigation/MainNavigation"

import './App.css';

const App = ()=> {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact component={Users}/>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
