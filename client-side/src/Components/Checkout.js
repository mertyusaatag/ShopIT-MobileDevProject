import React from "react";
import TopAppBar from "./AppBar";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { Typography, Paper, Button, Divider, TextField, MenuItem } from "@mui/material"
import { GUEST_LEVEL, SERVER_HOST } from "../config/global_constants";
import CurrentOrderTable from "./CurrentOrderTable";
import Payment from "./Payment";
import axios from 'axios';

const euCountries = [
    'Austria',
    'Belgium',
    'Bulgaria',
    'Cyprus',
    'Czech Republic',
    'Germany',
    'Denmark',
    'Estonia',
    'Spain',
    'Finland',
    'France',
    'United Kingdom',
    'Greece',
    'Hungary',
    'Croatia',
    'Ireland',
    'Italy',
    'Lithuania',
    'Luxembourg',
    'Latvia',
    'Malta',
    'Netherlands',
    'Poland',
    'Portugal',
    'Romania',
    'Sweden',
    'Slovenia',
    'Slovakia',
];

const deliveryOptions = [{
    label: "Standard delivery: 3-5 days $4.99",
    value: 4.99
},
{
    label: "Quick delivery: 1-2 days $9.99",
    value: 9.99
},
{
    label: "Next day delivery $14.99",
    value: 14.99
}]

const paperStyle = {
    padding: "50px 50px",
    width: 800,
    margin: "20px auto",
}

function Checkout() {
    const [cart, setCart] = useState([])
    const [user, setUser] = useState(null)
    const [userID, setUserID] = useState('')
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [country, setCountry] = useState("")
    const [delivery, setDelivery] = useState('')
    const [total, setTotal] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorFlag, setErrorFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)

    const handleOnClick = (e) => {
        e.preventDefault()
        setSuccessFlag(false)
        setErrorFlag(false)
        setErrorMessage("")
        if (name === "") {
            setErrorFlag(true)
            setErrorMessage("Name is required")
        } else if (email === "") {
            setErrorFlag(true)
            setErrorMessage("Email is required")
        } else if (phoneNumber === null) {
            setErrorFlag(true)
            setErrorMessage("Phone number is required")
        } else if (phoneNumber !== null && phoneNumber.toString().length !== 9) {
            setErrorFlag(true)
            setErrorMessage("Incorrect phone number.")
        } else if (country === "") {
            setErrorFlag(true)
            setErrorMessage("Country field is required")
        } else if (address === "") {
            setErrorFlag(true)
            setErrorMessage("Address field is required")
        } else if (delivery === '') {
            setErrorFlag(true)
            setErrorMessage("Choose a delivery option")
        } else {
            const products = cart.products.map(product => (
                {
                    productId: product._id,
                    quantity: product.cartQuantity
                }
            ))
            const order = {
                userId: userID,
                products: products,
                address: `${address} ${country}`,
                phoneNumber: phoneNumber,
                amount: total,
                status: "unpaid"
            }
            localStorage.setItem("order", JSON.stringify(order))
            setSuccessFlag(true)
        }
    }

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        if (loggedUser.accessLevel > GUEST_LEVEL) {
            axios.get(`${SERVER_HOST}/users/getUserByEmail/${loggedUser.email}`, {headers: {authorization: loggedUser.token}})
            .then(res => {
                setUserID(res.data._id)
                setUser(loggedUser)
                setName(loggedUser.name)
                setEmail(loggedUser.email)
            })
            .catch(err => {
                console.log(err.response)
            })
            setUser(loggedUser)
            setName(loggedUser.name)
            setEmail(loggedUser.email)
        }
        const localCart = JSON.parse(localStorage.getItem('cart'));
        if (localCart) {
            setCart(localCart)
            setTotal(localCart.total)
        }
        return  () =>{
            const localOrder = JSON.parse(localStorage.getItem('order'));
            if(localOrder && localOrder.status !== "unpaid"){
                if(localOrder.status !== "unpaid"){
                    localStorage.removeItem('order')
                }
            }
        }
    }, [])
    return (
        <div className="Checkout">
            <TopAppBar />
            <Paper style={paperStyle}>
                {cart.products
                    ? [(user
                        ? <div>
                            <Typography variant="h4">You are logged in as {user.name}</Typography>
                            <Typography variant="h5">Some information will be filled automatically.</Typography><br />
                        </div>
                        : <div>
                            <Typography variant="h4">You are not logged in.</Typography>
                            <Typography variant="h6">Log in or continue as guest.</Typography>
                            <Button component={Link} to="/login" variant="contained" >Sign in</Button>
                            <Typography>
                                New to ShopIT? <Link to="/SignUp">Sign up!</Link>
                            </Typography>
                        </div>),
                    (<div>
                        <Divider><Typography variant="h6">Your Order</Typography></Divider>
                        <CurrentOrderTable /><br />
                        <Divider><Typography variant="h6">Delivery information</Typography></Divider><br />
                        <TextField fullWidth sx={{ m: 1 }} label="Your full name" variant="outlined"
                            required
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }} />
                        <TextField fullWidth sx={{ m: 1 }} label="Email" variant="outlined"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                        <TextField fullWidth sx={{ m: 1 }} label="Phone number" variant="outlined"
                            required
                            value={phoneNumber}
                            type="number"
                            onChange={(e) => {
                                setPhoneNumber(e.target.value)
                            }} />
                        <TextField fullWidth sx={{ m: 1 }} label="Country" variant="outlined"
                            required
                            select
                            defaultValue=""
                            value={country}
                            onChange={(e) => {
                                setCountry(e.target.value)
                            }}>
                            {euCountries.map(country => (
                                <MenuItem key={country} value={country}>
                                    {country}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField fullWidth sx={{ m: 1 }} label="Address" variant="outlined"
                            required
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }} />
                        <Divider><Typography variant="h6">Delivery options</Typography></Divider><br />
                        <TextField fullWidth sx={{ m: 1 }} label="Delivery" variant="outlined"
                            required
                            select
                            value={delivery}
                            onChange={(e) => {
                                setDelivery(e.target.value)
                                setTotal(cart.total + e.target.value)
                            }}>
                            {deliveryOptions.map(option => (
                                <MenuItem key={option.label} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField><br />
                        <Button variant="contained" onClick={handleOnClick}>Go to payment</Button><br />
                        {errorFlag ? <Typography variant="h6" color="red">{errorMessage}</Typography> : ''}<br />
                        {successFlag
                            ? <div>
                                <Divider><Typography variant="h6">Payment</Typography></Divider><br />
                                <Typography variant="h4">Your total is: ${total}</Typography><br />
                                <Payment total={total} />
                            </div>
                            : ""}

                    </div>)
                    ]
                    : <Typography>Your cart is empty.</Typography>}
            </Paper>
        </div>
    );
}

export default Checkout;