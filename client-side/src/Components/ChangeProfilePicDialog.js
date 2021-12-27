import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Input } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function ChangeProfilePicDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Input accept="image/*" id="button-file" type="file" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Change photo</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}