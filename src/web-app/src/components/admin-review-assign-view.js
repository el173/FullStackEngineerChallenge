import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {
  GET_EMP_LIST,
  ASSIGN_REVIEWER,
} from '../action-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

function AdminReviewAssignView(props) {
  const { employeeList } = props;
  const classes = useStyles();
  const [selectedReviewer, setSelectedReviewer] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState('');
  const [receiverList, setReceiverList] = useState([]);

  useEffect(() => {
    props.getEmpList();
  },[]);

  const handleReviewerChange = (event) => {
    setSelectedReviewer(event.target.value);
    setReceiverList(employeeList.filter(item => item.id !== event.target.value));
  };

  const handleReceiverChange = (event) => {
    setSelectedReceiver(event.target.value);
  };

  const assignReviewer = () => {
    if(selectedReceiver !== '' && selectedReviewer !== '') {
      props.assignReview({
        reviewer: selectedReviewer,
        receiver: selectedReceiver,
      });
    } else {
      alert('Please select both values');
    }
  }

  return (
    <div> 
        <div>Assign reviewer</div>
        <Paper className={classes.root}>
          {employeeList ? (
            <div>
              <div>
                <InputLabel >Select reviewer</InputLabel>
                <Select
                  value={selectedReviewer}
                  fullWidth
                  onChange={handleReviewerChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    employeeList.map((item, key) => (
                      <MenuItem key={key} value={item.id}>{item.username}</MenuItem>
                    ))
                  }
                </Select>
              </div>
              <div>
                <InputLabel >Select employee</InputLabel>
                <Select
                  value={selectedReceiver}
                  fullWidth
                  onChange={handleReceiverChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    receiverList.map((item, key) => (
                      <MenuItem key={key} value={item.id}>{item.username}</MenuItem>
                    ))
                  }
                </Select>
              </div>
              <Button 
              variant="outlined" 
              color="primary"
              onClick={() => assignReviewer()}
              >SAVE</Button>
            </div>
          ) : null}
        </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  employeeList: state.employee?.employeeList,
});

const mapDispatchToProps = (dispatch) => ({
  getEmpList: () => dispatch(
    { type: GET_EMP_LIST, payload: { empOnly: true } }
  ),
  assignReview: (payload) => dispatch(
    { type: ASSIGN_REVIEWER, payload }
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminReviewAssignView);