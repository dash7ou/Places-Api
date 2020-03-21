import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router , Switch, Route, Redirect } from "react-router-dom";

import Users from "./user/pages/User";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

import './App.css';

const App = ()=> {
  const [isLoggedIn, setISLoggedIn ] = useState(false);

  const login = useCallback(()=>{
    setISLoggedIn(true);
  }, [])
  const logout = useCallback(()=>{
    setISLoggedIn(false);
  }, [])
  return (
    <AuthContext.Provider
      value={
        {
          isLoggedIn: isLoggedIn,
          login,
          logout
        }
      }
    >
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" exact component={Users}/>
            <Route path="/:userId/places" exact component={UserPlaces} />
            <Route path="/places/new" exact component={NewPlace} />
            <Route path="/places/:placeId" component={UpdatePlace} />
            <Route path="/auth" exact component={Auth} />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
