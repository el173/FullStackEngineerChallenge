import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

function MyReviewView(props) {
  const { employeeList } = props;
  const classes = useStyles();

  const [selectedUser, setSelectedUser] = useState(null);

  let userTypeInput = useRef();

  useEffect(() => {
    if(employeeList) {
      setSelectedUser(employeeList[0].id);
    }
  },[employeeList]);

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  console.log(employeeList);

  return (
    <div> 
        <Paper className={classes.root}>
          {/* {employeeList ? ( */}
            <div>
              <InputLabel>Select Employee</InputLabel>
              <Select
                value={'admin'}
                fullWidth
                onChange={handleChange}
                ref={userTypeInput}
              >
                <MenuItem value={'admin'}>Admin</MenuItem>
                <MenuItem value={'employee'}>Employee</MenuItem>
              </Select>
            </div>
          {/* ) : null} */}
        </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  employeeList: state.employee?.employeeList,
});

export default connect(
  mapStateToProps,
  null,
)(MyReviewView);