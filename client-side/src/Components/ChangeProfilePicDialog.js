import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Input, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import { SERVER_HOST } from '../config/global_constants';

export default function ChangeProfilePicDialog() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('')
  const [errorFlag, setErrorFlag] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorFlag(false)
    let formData = new FormData()
    formData.append("img", selectedFile)
    formData.append("email", user.email)
    axios.post(`${SERVER_HOST}/users/changePhoto`, formData, {headers: {"Content-type": "multipart/form-data", "authorization": user.token}})
    .then(res => {
        const localUser = JSON.parse(localStorage.getItem("user"))
        localUser.img = res.data
        localStorage.setItem("user", JSON.stringify(localUser))
        window.location.reload()
        setOpen(false)
    })
    .catch(err => {
        setErrorFlag(true)
        setErrorMessage(err.response.data.message)
    })
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user.accessLevel!==0){
        setUser(user)
    }
},[])


  return (
    <div>
        <Button variant="contained" endIcon={<PhotoCamera/>} onClick={handleClickOpen}>
            Change profile picture
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Profile picture</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose photo you would want to use as your profile picture.
          </DialogContentText>
          <Input accept="image/*" id="button-file" type="file" onChange={handleFileChange}/>
          {errorFlag ? <Typography color="red">{errorMessage}</Typography> : ""}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Change photo</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}