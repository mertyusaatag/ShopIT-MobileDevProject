import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography, Grid, ImageList, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import CurrentOrderTable from './CurrentOrderTable';

export default function CartDialog() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([])
  const [redirectFlag, setRedirectFlag] = useState(false)

  const handleCheckout = (e) => {
    e.preventDefault()
    setRedirectFlag(true)
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    window.location.reload()
    setOpen(false);
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')));
    console.log(cart)
  }, [])

  useEffect(() => {
    window.addEventListener("storage", () => {
      const localCart = JSON.parse(localStorage.getItem('cart'));
      if (localCart) setCart(localCart)
    });

    return () => {
      window.removeEventListener("storage", () => {
        const localCart = JSON.parse(localStorage.getItem('cart'));
        if (localCart) setCart(localCart)
      });
    };
  }, []);

  return (
    <div>
      <IconButton size="large" aria-label="shopping-cart" color="inherit" onClick={handleClickOpen}>
        <ShoppingCartIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          {"Basket"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <CurrentOrderTable />
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Go Back</Button>
          {cart
            ?
            <Button onClick={handleCheckout} autoFocus>
              Checkout
            </Button>
          :""}

        </DialogActions>
      </Dialog>
        {redirectFlag ? <Navigate to="/checkout" /> : ""}
    </div>
      );
}






