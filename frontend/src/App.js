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
  const [token, setToken ] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token)=>{
    setUserId(uid);
    setToken(token);
  }, []);

  const logout = useCallback(()=>{
    setToken(null);
    setUserId(null)
  }, [])

  let routes;
  if(token){
    routes = (<Switch>
      <Route path="/" exact component={Users}/>
      <Route path="/:userId/places" exact component={UserPlaces} />
      <Route path="/places/new" exact component={NewPlace} />
      <Route path="/places/:placeId" component={UpdatePlace} />
      <Redirect to="/" />
    </Switch>)
  }else{
    routes = (<Switch>
      <Route path="/" exact component={Users}/>
      <Route path="/:userId/places" exact component={UserPlaces} />
      <Route path="/auth" exact component={Auth} />
      <Redirect to="/auth" />
    </Switch>)
  }
  return (
    <AuthContext.Provider
      value={
        {
          isLoggedIn: !!token,
          token,
          userId,
          login,
          logout
        }
      }
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
