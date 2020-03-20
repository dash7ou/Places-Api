import React from 'react';
import { BrowserRouter as Router , Switch, Route, Redirect } from "react-router-dom";

import Users from "./user/pages/User";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

import './App.css';

const App = ()=> {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact component={Users}/>
          <Route path="/:userId/places" exact component={UserPlaces} />
          <Route path="/places/new" exact component={NewPlace} />
          <Route path="/places/:placeId" component={UpdatePlace} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
