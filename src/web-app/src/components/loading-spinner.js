
import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import {
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PulseLoader from 'react-spinners/PulseLoader';

import { colors } from '../config/styles';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
    overflow: 'hidden',
  }
}));

function LoadingSpinner(props) {
  const classes = useStyles();
  const { visible } = props.loadingSpinnerConfig;
   return (
     <div>
       <Dialog
         open={visible}
         aria-labelledby="spinner-dialog-title"
         aria-describedby="spinner-dialog-description"
         PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }
      }}
       >
         <Grid className={classes.container}>
           <PulseLoader
             size={15}
             color={colors.primaryColor1}
             loading
           />
           <p id="spinner-dialog-title">Please wait...</p>
         </Grid>
       </Dialog>
     </div>
   );
}

LoadingSpinner.defaultProps = {
  loadingSpinnerConfig: {
    visible: false,
  },
};

const mapStateToProps = (state) => ({
  loadingSpinnerConfig: state.common.loadingSpinnerConfig
});

export default connect(
  mapStateToProps,
  null
)(LoadingSpinner);
