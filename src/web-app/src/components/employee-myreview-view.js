
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {
  GET_ASSIGNED_REVIEWS,
  GET_MY_REVIEW,
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

const myFeedbackColumns = [
  { id: 'giver', label: 'Giver', minWidth: 100 },
  { id: 'receiver', label: 'Receiver', minWidth: 100 },
  { id: 'feedback', label: 'Feedback', minWidth: 200 },
  { id: 'date', label: 'Feedback date', minWidth: 100 },
  { id: 'modified', label: 'Modified', minWidth: 30 },
  { id: 'modifiedBy', label: 'Modified Admin', minWidth: 100 },
];

const assignedFeedbackColumns = [
  { id: 'giver', label: 'Giver', minWidth: 100 },
  { id: 'receiver', label: 'Receiver', minWidth: 100 },
  { id: 'feedback', label: 'Feedback', minWidth: 200 },
  { id: 'date', label: 'Feedback date', minWidth: 100 },
  { id: 'modified', label: 'Modified', minWidth: 30 },
  { id: 'modifiedBy', label: 'Modified Admin', minWidth: 100 },
  { id: 'action', label: 'Update', minWidth: 100 },
];

function MyReviewView(props) {
  const { myReviewList, assignedReview } = props;
  const classes = useStyles();

  const [myReviewPage, setPage] = useState(0);
  const [rowsPerPageMyReviews, setRowsPerPage] = useState(10);
  const [assignedReviewPage, setAssignedPage] = useState(0);
  const [rowsPerPageAssignedReviews, setAssignedRowsPerPage] = useState(10);
  const [reviewTableData, setReviewTableData] = useState([]);
  const [assignedTableData, setAssignedTableData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      props.getMyReview();
      props.getAssignedReviews();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const list = [];
    assignedReview &&  assignedReview?.length > 0 && assignedReview.map(item => {
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
    setAssignedTableData(list);
  }, [assignedReview]);

  useEffect(() => {
    const list = [];
    myReviewList &&  myReviewList?.length > 0 && myReviewList.map(item => {
      list.push(
        {
          giver: item.giver,
          receiver: item.receiver,
          feedback: item.feedback,
          date: item.date,
          modified: item.modifier ? 'YES' : 'NO',
          modifiedBy: item.modifier,
        }
      );
    });
    setReviewTableData(list);
  }, [myReviewList]);

  const showFeedbackInput = (item) => {
    const feedback = prompt('Enter your feedback');
    if(feedback !== null) {
      if(feedback.trim() == '') {
        alert('Enter valid feedback');
      } else {
        props.updateReview({
          feedback: feedback,
          feedbackId: item.id,
        });
      }
    }
  };

  const handleMyReviewChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleMyReviewChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAssignedReviewChangePage = (event, newPage) => {
    setAssignedPage(newPage);
  };

  const handleAssignedReviewChangeRowsPerPage = (event) => {
    setAssignedRowsPerPage(+event.target.value);
    setAssignedPage(0);
  };

  return (
    <div> 
      <div className={classes.separator} />
        { assignedTableData && assignedTableData.length > 0 ? (
          <div>
            <h2>Assigned feedback for me</h2>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {assignedFeedbackColumns.map((column) => (
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
                    {assignedTableData.slice(
                        assignedReviewPage * rowsPerPageAssignedReviews, assignedReviewPage * rowsPerPageAssignedReviews + rowsPerPageAssignedReviews
                      ).map((row, key) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                          {assignedFeedbackColumns.map((column) => {
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
                count={assignedTableData.length}
                rowsPerPage={rowsPerPageAssignedReviews}
                page={assignedReviewPage}
                onChangePage={handleAssignedReviewChangePage}
                onChangeRowsPerPage={handleAssignedReviewChangeRowsPerPage}
              />
            </Paper>
          </div>
        ) : null} 
        { reviewTableData && reviewTableData.length > 0 ? (
          <div>
            <h2>Received feedback for me</h2>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {myFeedbackColumns.map((column) => (
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
                    {reviewTableData.slice(myReviewPage * rowsPerPageMyReviews, myReviewPage * rowsPerPageMyReviews + rowsPerPageMyReviews).map((row, key) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                          {myFeedbackColumns.map((column) => {
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
                rowsPerPage={rowsPerPageMyReviews}
                page={myReviewPage}
                onChangePage={handleMyReviewChangePage}
                onChangeRowsPerPage={handleMyReviewChangeRowsPerPage}
              />
            </Paper>
          </div>
        ) : null}    
    </div>
  );
}

const mapStateToProps = (state) => ({
  myReviewList: state.employee?.myReviewList,
  assignedReview: state.employee?.assignedReview,
});

const mapDispatchToProps = (dispatch) => ({
  getMyReview: () => dispatch(
    { type: GET_MY_REVIEW }
  ),
  getAssignedReviews: () => dispatch(
    { type: GET_ASSIGNED_REVIEWS }
  ),
  updateReview: (payload) => dispatch(
    { type: UPDATE_REVIEW, payload }
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyReviewView);