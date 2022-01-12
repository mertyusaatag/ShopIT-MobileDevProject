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
import { Button, Typography, Grid, ImageList, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function CartDialog() {
  const [open, setOpen] = useState(false);

  const [cart, setCart] = useState([])

  const imageStyle = {
    display: 'block',
    margin: 'auto',
    width: 50,
    height: 50,
  }

  useEffect(() => {

    setCart(JSON.parse(localStorage.getItem('cart')));
  }, [])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const removeItem = (productID) => {

    //create cartCopy
    let tempCart = [...cart]

    let existingItem = tempCart.find(cartItem => cartItem._id === productID)
    if (existingItem.cartQuantity > 1) {
      existingItem.cartQuantity--;
    }
    else {
      tempCart = tempCart.filter(item => item._id !== productID);
      window.location.reload();
    }

    //update state and local
    setCart(tempCart);
    ;
    const cartString = JSON.stringify(tempCart)
    tempCart = []
    localStorage.setItem('cart', cartString)
    console.log(tempCart);
    console.log(cart);
  }

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
      >
        <DialogTitle id="alert-dialog-title">
          {"Basket"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              {cart.length
                ? <Table stickyHeader sx={{ minWidth: 650, tableLayout: "auto" }} size="small" aria-label="cocktail table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Unit Prices</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total Prices</TableCell>
                      <TableCell>Sub Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.map((row) => (
                      <TableRow key={row._id} sx={{ height: 50 }}>
                        <TableCell><img src={`data:;base64,${row.img}`} alt={`product_photo`} style={imageStyle} /></TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.cartQuantity}</TableCell>
                        <TableCell>{row.price * row.cartQuantity}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="error" data-id={row._id} onClick={() => removeItem(row._id)}>
                            Delete
                          </Button> <br />
                        </TableCell>
                      </TableRow>

                    ))}
                  </TableBody>
                </Table>
                : <Typography variant="h4">Your cart is empty.</Typography>
              }

            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Go Back</Button>
          {cart.length
            ? <Button onClick={handleClose} autoFocus>
              Checkout
            </Button>
            : ""}

        </DialogActions>
      </Dialog>
    </div>
  );
}






