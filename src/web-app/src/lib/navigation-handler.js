import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  useHistory,
} from 'react-router-dom';


function NavigationHandler(props) {
  const { navigationConfig } = props;
  const history = useHistory();
  const changeAppNavigation = (routeName, browserHistory) => {
    if (routeName && browserHistory) {
      browserHistory.push(routeName);
    }
  };

  useEffect(() => {
    changeAppNavigation(navigationConfig, history);
  }, [navigationConfig]);


  return (
    <div />
  );
}

const mapStateToProps = (state) => ({
  navigationConfig: state.common.navigationConfig,
});

export default connect(
  mapStateToProps,
  null
)(NavigationHandler);
