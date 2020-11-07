/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
 LoginScreen,
 MainContainer,
} from './layout';

import { LoadingSpinner } from '../components';


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
          <MainContainer />
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

