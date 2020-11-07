/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Switch,
  Route,
  HashRouter,
} from 'react-router-dom';

import {
 LoginScreen,
 NotFoundScreen,
} from './layout';

function Main() {
  const isLoggedIn = false;
  return (
    <div>
      {
        isLoggedIn 
        ? (
          <HashRouter>
            <Switch>
              <Route
                exact
                path="/mobile-hybrid-datapack"
                render={
                () => <LoginScreen />
              }
              />
              <Route component={NotFoundScreen} />
            </Switch>
          </HashRouter>
        ) 
        : (
          <LoginScreen />
        )
      }
    </div>
  );
}

export default Main;
