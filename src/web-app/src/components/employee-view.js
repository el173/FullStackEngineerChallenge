import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {
  GET_EMP_LIST,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../action-types';

const columns = [
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'password', label: 'Password', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'type', label: 'User type', minWidth: 170 },
  { id: 'action', label: 'Edit', minWidth: 100 },
  { id: 'delete', label: 'Delete', minWidth: 100 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  separator: {
    height: 100,
  },
  editContainer: {
    width: '40%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function EmployeeView(props) {
  const { employeeList } = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [empList, setEmpList] = useState([]);
  const [formHeader, setFormHeader] = useState('Add New Employee');
  const [editItem, setEditItem] = useState(null);
  const [userType, setUserType] = React.useState('admin');
  
  let userNameInput = useRef();
  let passwordInput = useRef();
  let userTypeInput = useRef();

  useEffect(() => {
    props.getEmpList();
  }, []);

  useEffect(() => {
    const list = [];
    employeeList &&  employeeList?.employeeList?.length > 0 && employeeList.employeeList.map(item => {
      list.push(
        {
          username: item.username,
          password: item.password,
          status: item.status === 1 ? 'Active' : 'Deleted',
          type: item.user_type,
          action: <Button 
            variant="outlined" 
            color="primary" 
            disabled={item.status !== 1}
            onClick={() => makeItemEditable(item)}
            >EDIT</Button>,
          delete: <Button 
            variant="outlined" 
            color="secondary" 
            disabled={item.status !== 1} 
            onClick={() => deleteUser(item)}
            >DELETE</Button>,
        }
      );
    });
    setEmpList(list);
  }, [employeeList]);

  const deleteUser = (item) => {
    if(window.confirm(`Are you sure do you want to delete user ${item.username}`)) {
      props.deleteUser({
        userId: item.id,
      });
    }
  }

  const makeItemEditable = (item) => {
    userNameInput.current.value = item.username;
    passwordInput.current.value = item.password;
    setUserType(item.user_type);
    setEditItem(item);
    setFormHeader('Edit Employee');
  }

  const clearEdit = () => {
    userNameInput.current.value = '';
    passwordInput.current.value = ''
    setEditItem(null);
    setUserType('admin');
    setFormHeader('Add New Employee');
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const addOrUpdateUser = () => {
    let payload = {
      username: userNameInput.current.value,
      password: passwordInput.current.value,
      type: userType === 'admin' ? 1 : 2,
      callback: () => clearEdit(),
    }
    if(payload.username && payload.password) {
      if(editItem) {
        payload = {
          ...payload,
          userId: editItem.id,
        };
        props.updateUser(payload);
      } else {
        props.addUser(payload);
      }
    } else {
      alert('Invalid input');
    }
  }
  
  return (
    <div>
      <div>{formHeader}</div>
      <Paper className={classes.editContainer}>
        <TextField 
          id="username"
          label="Username"
          type="email"
          fullWidth
          required
          inputRef={userNameInput}
        />
        <TextField 
          id="password"
          label="Password"
          type="password"
          fullWidth
          required 
          inputRef={passwordInput}
        />
        <InputLabel id="demo-simple-select-filled-label">User type</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={userType}
          fullWidth
          onChange={handleChange}
          ref={userTypeInput}
        >
          <MenuItem value={'admin'}>Admin</MenuItem>
          <MenuItem value={'employee'}>Employee</MenuItem>
        </Select>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => addOrUpdateUser()}
          >{ editItem ? 'UPDATE' : 'SAVE' }</Button>
        {
          editItem ? (
            <Button 
              variant="outlined" 
              color="secondary"
              onClick={() => clearEdit()} 
              >CANCEL</Button>
          ) : null
        }
      </Paper>
      <div className={classes.separator} />
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
            {empList && empList.length > 0 && empList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
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
        count={empList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  employeeList: state.employee,
});

const mapDispatchToProps = (dispatch) => ({
  getEmpList: () => dispatch(
    { type: GET_EMP_LIST }
  ),
  addUser: (payload) => dispatch(
    { type: ADD_USER, payload }
  ),
  updateUser: (payload) => dispatch(
    { type: UPDATE_USER, payload }
  ),
  deleteUser: (payload) => dispatch(
    { type: DELETE_USER, payload }
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeView);
