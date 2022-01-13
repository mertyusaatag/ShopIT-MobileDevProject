import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';



function CurrentOrderTable() {
    const [cart, setCart] = useState(null)
    const [update, setUpdate] = useState(false)

    const imageStyle = {
        display: 'block',
        margin: 'auto',
        width: 50,
        height: 50,
    }

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')));
        setUpdate(false)
    }, [update])

    const removeItem = (productID) => {

        //create cartCopy
        let tempCart = cart

        let existingItem = tempCart.products.find(cartItem => cartItem._id === productID)
        if (existingItem.cartQuantity > 1) {
            existingItem.cartQuantity--; 
        }
        else {
            tempCart.products = tempCart.products.filter(item => item._id !== productID);
        }
        tempCart.total = tempCart.total - existingItem.price
        //update state and local
        setCart(tempCart);
        const cartString = JSON.stringify(tempCart)
        localStorage.setItem('cart', cartString)
        setUpdate(true)
    }
    return (
        <div className="CurrentOrderTable">
            {cart
                ? [(cart.products
                    ?<div><Table stickyHeader sx={{ minWidth: 650, tableLayout: "auto" }} size="small" aria-label="cocktail table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Unit Prices</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total Prices</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.products.map((row) => (
                            <TableRow key={row._id} sx={{ height: 50 }}>
                                <TableCell><img src={`data:;base64,${row.img[0]}`} alt={`product_photo`} style={imageStyle} /></TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.cartQuantity}</TableCell>
                                <TableCell>${row.price * row.cartQuantity}</TableCell>
                                <TableCell>
                                    <IconButton variant="contained" color="error" data-id={row._id} onClick={() => removeItem(row._id)}>
                                        <DeleteIcon />
                                    </IconButton> <br />
                                </TableCell>
                            </TableRow>

                        ))}
                        <TableRow>
                            <TableCell colSpan={4} align="right">
                                <Typography variant="h6">Order price:</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography variant="h6">${cart.total}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table></div>
                : <Typography variant="h4">Your cart is empty.</Typography>)]
            :""}
        </div>
    );
}

export default CurrentOrderTable;