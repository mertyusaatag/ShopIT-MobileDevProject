import * as React from 'react';
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CartDialog() {
  const [open, setOpen] = React.useState(false);

  let [cart, setCart] = useState([])
let localCart = localStorage.getItem("cart");



//this is called on component mount
useEffect(() => {
//turn it into js
localCart = JSON.parse(localCart);
//load persisted cart into state if it exists
if (localCart) setCart(localCart)

}, []) //the empty array ensures useEffect only runs once


const addItem = (item) => {

//create a copy of our cart state, avoid overwritting existing state
let cartCopy = [...cart];

//assuming we have an ID field in our item
let {ID} = item;

//look for item in cart array
let existingItem = cartCopy.find(cartItem => cartItem.ID == ID);

//if item already exists
if (existingItem) {
    existingItem.quantity += item.quantity //update item
} else { //if item doesn't exist, simply add it
  cartCopy.push(item)
}

//update app state
setCart(cartCopy)

//make cart a string and store in local space
let stringCart = JSON.stringify(cartCopy);
localStorage.setItem("cart", stringCart)

}
const editItem = (itemID, amount) => {

let cartCopy = [...cart]

//find if item exists, just in case
let existentItem = cartCopy.find(item => item.ID == itemID);

//if it doesnt exist simply return
if (!existentItem) return

//continue and update quantity
existentItem.quantity += amount;

//validate result
if (existentItem.quantity <= 0) {
  //remove item  by filtering it from cart array
  cartCopy = cartCopy.filter(item => item.ID != itemID)
}

//again, update state and localState
setCart(cartCopy);

let cartString = JSON.stringify(cartCopy);
localStorage.setItem('cart', cartString);
}

const removeItem = (itemID) => {

//create cartCopy
let cartCopy = [...cart]

cartCopy = cartCopy.filter(item => item.ID != itemID);

//update state and local
setCart(cartCopy);

let cartString = JSON.stringify(cartCopy)
localStorage.setItem('cart', cartString)
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}






