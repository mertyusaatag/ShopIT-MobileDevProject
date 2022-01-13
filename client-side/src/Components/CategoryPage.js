import React from 'react'
import TopAppBar from './AppBar';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { SERVER_HOST } from '../config/global_constants';
import { Link } from 'react-router-dom'
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid, Paper, Button, Avatar } from '@mui/material';
import CategoriesList from "./CategoriesList"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const paperStyle = {
    padding: "50px 50px",
    width: 250,
    margin: "20px auto",
}

const imageStyle = {
    display: 'block',
    margin: 'auto',
    width: 200,
    height: 170,
}

const CategoryPage = () => {
    const { category } = useParams()
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    const [mobileView, setMobileView] = useState(false)

    const updateView = () => {
        const mql = window.matchMedia('(max-width: 850px)');
        setMobileView(mql.matches)
    };

    
    const addCart = (product) => {
        //create a copy of our cart state, avoid overwritting existing state


        let tempCart = cart;
        console.log(tempCart)

        product = {
            ...product,
            cartQuantity: 1
        }
        //assuming we have an ID field in our item

        //look for item in cart array
        let existingItem = tempCart.products.find(cartItem => cartItem._id == product._id);

        //if item already exists
        if (existingItem) {
            existingItem.cartQuantity++ //update item
        } else { //if item doesn't exist, simply add it
            //setCart.push(product)
            tempCart.products.push(product);
        }

        tempCart.total = tempCart.total + product.price

        //update app state
        setCart(tempCart)

        //make cart a string and store in local space
        const stringCart = JSON.stringify(tempCart);
        localStorage.setItem("cart", stringCart)
    }

    useEffect(() => {
        window.addEventListener("resize", updateView);
        return () => window.removeEventListener("resize", updateView);
    }, []);

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


    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem('cart'));
        if (localCart) setCart(localCart)
        if (category === "all") {
            axios.get(`${SERVER_HOST}/products/getAllProducts`)
                .then(res => {
                    setProducts(res.data)
                })
                .catch(err => {
                    console.log(err.response.data.message)
                })
        }
        else {
            axios.get(`${SERVER_HOST}/products/productsByCategory/${category}`)
                .then(res => {
                    setProducts(res.data)

                })
                .catch(err => {
                    console.log(err.response.data.message)
                })
        }
    }, [category])

    return (
        <div className="CategoryPage" >
            <TopAppBar />

            <Grid container spacing={3} direction="row" m="auto" alignItems="stretch" justifyContent="center">
                {!mobileView
                    ?
                    <Grid item xs={3}>
                        <Paper >
                            <CategoriesList />
                        </Paper>
                    </Grid>
                    : ""}

                <Grid item xs>
                    <Grid container item spacing={3} alignItems="stretch" justifyContent="center">
                        {products
                            ? products.map(product => (
                                <Grid item>
                                    <Paper style={paperStyle}>
                                        <Grid container spacing={3} direction="column" m="auto" alignItems="stretch" justifyContent="center">
                                            <img src={`data:;base64,${product.img[0]}`} alt={`product_photo`} style={imageStyle} />
                                            <Typography variant="h6">{product.name}</Typography>
                                            <Typography variant="h6">${product.price}</Typography><br />
                                            <Button size="small" variant="outlined">See details</Button><br />
                                            <Button disabled={product.inStock ? false : true} size="small"
                                            variant="contained" endIcon={<AddShoppingCartIcon />} onClick={() => addCart(product)}>
                                                Add to cart
                                            </Button>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            ))
                            : <Typography variant="h4">Loading products...</Typography>}
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );
}

export default CategoryPage;