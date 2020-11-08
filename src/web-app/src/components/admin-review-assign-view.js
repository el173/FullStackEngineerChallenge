import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {
  GET_EMP_LIST,
  ASSIGN_REVIEWER,
  GET_ALL_REVIEWS,
  UPDATE_REVIEW,
} from '../action-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  separator: {
    height: 50,
  },
}));

const columns = [
  { id: 'giver', label: 'Giver', minWidth: 100 },
  { id: 'receiver', label: 'Receiver', minWidth: 100 },
  { id: 'feedback', label: 'Feedback', minWidth: 200 },
  { id: 'date', label: 'Feedback date', minWidth: 100 },
  { id: 'modified', label: 'Modified', minWidth: 30 },
  { id: 'modifiedBy', label: 'Modified Admin', minWidth: 100 },
  { id: 'action', label: 'Update', minWidth: 100 },
];

function AdminReviewAssignView(props) {
  const { employeeList, reviewList } = props;
  const classes = useStyles();
  const [selectedReviewer, setSelectedReviewer] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState('');
  const [receiverList, setReceiverList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reviewTableData, setReviewTableData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      props.getEmpList();
      props.getReviewList();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const list = [];
    reviewList &&  reviewList?.length > 0 && reviewList.map(item => {
      list.push(
        {
          giver: item.giver,
          receiver: item.receiver,
          feedback: item.feedback,
          date: item.date,
          modified: item.modifier ? 'YES' : 'NO',
          modifiedBy: item.modifier,
          action: <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => showFeedbackInput(item)}
            >UPDATE FEEDBACK</Button>,
        }
      );
    });
    setReviewTableData(list);
  }, [reviewList]);

  const showFeedbackInput = (item) => {
    const feedback = prompt('Enter your feedback');
    if(feedback !== null) {
      if(feedback.trim() === '') {
        alert('Enter valid feedback');
      } else {
        props.updateReview({
          feedback: feedback,
          feedbackId: item.id,
          byAdmin: true,
        });
      }
    }
  };

  const handleReviewerChange = (event) => {
    setSelectedReviewer(event.target.value);
    setReceiverList(employeeList.filter(item => item.id !== event.target.value));
  };

  const handleReceiverChange = (event) => {
    setSelectedReceiver(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
        <h2>Assign reviewer</h2>
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
        <div className={classes.separator} />
        { reviewTableData && reviewTableData.length > 0 ? (
          <div>
            <h2>Update feedback</h2>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reviewTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={reviewTableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        ) : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  employeeList: state.employee?.employeeList,
  reviewList: state.employee?.allReviewList,
});

const mapDispatchToProps = (dispatch) => ({
  getEmpList: () => dispatch(
    { type: GET_EMP_LIST, payload: { empOnly: true } }
  ),
  assignReview: (payload) => dispatch(
    { type: ASSIGN_REVIEWER, payload }
  ),
  getReviewList: () => dispatch(
    { type: GET_ALL_REVIEWS }
  ),
  updateReview: (payload) => dispatch(
    { type: UPDATE_REVIEW, payload }
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminReviewAssignView);