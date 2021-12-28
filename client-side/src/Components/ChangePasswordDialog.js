import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { SERVER_HOST } from '../config/global_constants';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPasword, setConfirmPassword] = useState('');
  const [user, setUser] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorFlag, setErrorFlag] = useState(false);
  const [redirectFlag, setRedirectFlag] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordChange = () => {
      setErrorFlag(false)
      if(newPassword !== confirmNewPasword){
        setErrorFlag(true)
        setErrorMessage("Passwords don't match")
      }else if(newPassword === currentPassword){
        setErrorFlag(true)
        setErrorMessage("New password can't be identical to current one.")
      }else{
        const data = {
          email: user.email,
          password: currentPassword,
          newPassword: newPassword
        }
        axios.put(`${SERVER_HOST}/users/changePassword`, data, {headers:{"authorization": user.token}})
        .then(res => {
          console.log(res.data.message)
          setRedirectFlag(true)
          setOpen(false)
        })
        .catch(err => {
          setErrorFlag(true)
          setErrorMessage(err.response.data.message)
        })
      }
  }

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if(loggedUser){
        setUser(loggedUser)
    }
},[])

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Change password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Password Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
              You will get logged out after successful operation.
          </DialogContentText>
          <TextField
            autoFocus
            onChange={(e) => {
                setCurrentPassword(e.target.value)
            }}
            margin="dense"
            id="currentPassword"
            label="Current password."
            type="password"
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            onChange={(e) => {
                setNewPassword(e.target.value)
            }}
            margin="dense"
            id="newPassword"
            label="New password."
            type="password"
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            onChange={(e) => {
                setConfirmPassword(e.target.value)
            }}
            margin="dense"
            id="confirmNewPassword."
            label="Confirm new password"
            type="password"
            fullWidth
            variant="standard"
          />
          {errorFlag ? <Typography color="red">{errorMessage}</Typography> : ''}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePasswordChange}>Change password</Button>
        </DialogActions>
      </Dialog>
      {redirectFlag ? <Navigate to="/logout" /> : ""}
    </div>
  );
}