import React, { useRef } from 'react';
import { connect } from 'react-redux';

import { 
    Paper, 
    withStyles, 
    Grid, 
    TextField, 
    Button, 
} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'

import { styles } from './style';
import { checkLogin } from './actions';

function Login(props) {
  const { classes } = props;
  let userNameInput = useRef();
  let passwordInput = useRef();
  return (
    <Paper className={classes.mainContainer}>
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField 
              id="username"
              label="Username"
              type="email"
              fullWidth
              autoFocus
              required
              inputRef={userNameInput}
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField 
              id="password"
              label="Password"
              type="password"
              fullWidth
              required 
              inputRef={passwordInput}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button 
            variant="outlined"
            color="primary"
            style={{ textTransform: "none" }}
            onClick={() => props.authenticate({
              userName: userNameInput.current.value,
              password: passwordInput.current.value,
            })}
          >
            Login
          </Button>
        </Grid>
      </div>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  user: state.login.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: (payload) => dispatch(
    checkLogin(payload)
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Login));
