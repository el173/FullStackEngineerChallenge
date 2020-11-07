/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  HashRouter,
} from 'react-router-dom';

import {
 LoginScreen,
 NotFoundScreen,
 HomeScreen,
} from './layout';

import { LoadingSpinner } from '../components';

import NavigationHandler from '../lib/navigation-handler';

function Main(props) {
  const { user } = props;
  const loggedUserObj = window.sessionStorage.getItem("user");
  const [loggedUser, setLoggedUser] = useState(loggedUserObj ? JSON.parse(loggedUserObj) : null);

  useEffect(() => {
    setLoggedUser(loggedUserObj ? JSON.parse(loggedUserObj) : null);
  }, [user]);

  return (
    <div>
      {
        loggedUser && loggedUser.logged
        ? (
          <HashRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={
                () => <HomeScreen />
              }
              />
              <Route component={NotFoundScreen} />
            </Switch>
            <NavigationHandler />
          </HashRouter>
        ) 
        : (
          <LoginScreen />
        )
      }
      <LoadingSpinner />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.login.loggedUser,
});

export default connect(
  mapStateToProps,
  null,
)(Main);

