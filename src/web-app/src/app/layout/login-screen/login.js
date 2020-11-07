import React from 'react';
import { 
    Paper, 
    withStyles, 
    Grid, 
    TextField, 
    Button, 
} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'

import {styles} from './style';

class Login extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.mainContainer}>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="username" label="Password" type="password" fullWidth required />
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
          </Grid>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Login);