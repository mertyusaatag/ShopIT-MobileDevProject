import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { GUEST_LEVEL } from '../config/global_constants';
import { Navigate } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PaymentSuccess(props) {
    const [open, setOpen] = useState(true);
    const [userFlag, setUserFlag] = useState(false)
    const [homepageFlag, setHomepage] = useState(false)
    const [ordersFlag, setOrders] = useState(false)
    const paymentID = props.paymentID


    const handleOrders = () => {
        setOrders(true)
        setOpen(false);
    };

    const handleHomepage = () => {
        setHomepage(true)
        setOpen(false);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user.accessLevel > GUEST_LEVEL) {
            setUserFlag(true)
        }
    }, [])

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleHomepage}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"PayPal payment confirmed."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Typography variant="h6" color="success">Payment <b>{paymentID}</b> was succesfull!</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleHomepage}>Back to homepage</Button>
                    {userFlag ? <Button onClick={handleOrders}>Your orders</Button> : ""}
                </DialogActions>
            </Dialog>
            {homepageFlag ? <Navigate to="/homepage" /> : ""}
            {ordersFlag ? <Navigate to="/userOrders" /> : ""}
        </div>
    );
}