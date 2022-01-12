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

const CategoryPage = () => {
    const {category} = useParams()
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const imageStyle = {
        display: 'block',
        margin: 'auto',
        width: 50,
        height: 50,
    }
    const [mobileView, setMobileView] = useState(false)

    const updateView = () => {
        const mql = window.matchMedia('(max-width: 850px)');
        setMobileView(mql.matches)
    };

    useEffect(() => {
        window.addEventListener("resize", updateView);
        return () => window.removeEventListener("resize", updateView);
    }, []);
    const addCart= (product) => {
        //create a copy of our cart state, avoid overwritting existing state
        
  
        let tempCart = [...cart];
        console.log(tempCart)
  
  product = {
    ...product,
    cartQuantity:1
  }
  //assuming we have an ID field in our item
  
  //look for item in cart array
  let existingItem = tempCart.find(cartItem => cartItem._id == product._id);
  
  //if item already exists
  if (existingItem) {
    existingItem.cartQuantity++ //update item
  } else { //if item doesn't exist, simply add it
    //setCart.push(product)
    tempCart.push(product);
    
  }
  
   //update app state
   setCart(tempCart)
  
   //make cart a string and store in local space
   const stringCart = JSON.stringify(tempCart);
   localStorage.setItem("cart", stringCart)
   tempCart = []
   window.location.reload();
    }
    
    
    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem('cart'));
        if (localCart) setCart(localCart)
        if(category==="all")
        {
            axios.get(`${SERVER_HOST}/products/getAllProducts`)
            .then(res => {
                setProducts(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
        }
        else{
        axios.get(`${SERVER_HOST}/products/productsByCategory/${category}`)
            .then(res => {
                setProducts(res.data)
                console.log(res.data)
                
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
        }
    }, [category])

    return (
        <div className="CategoryPage" >
            <TopAppBar/>
            <h1>Category {category}</h1>
            
            <Grid container spacing={2} direction="col">
                {!mobileView
                    ?
                    <Grid item xs={2}>
                        <Paper >
                            <CategoriesList />
                        </Paper>
                    </Grid>
                    : ""}
           <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={2}>
                    {products.map((row) => (
                        <Grid item xs={6} md={4}key={row}>
                         <Card
                           sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                         >
                             {row.img.map((photo) => ( 
                              <CardMedia key={row._id}
                              component="img"
                              sx={{
                                // 16:9
                                pt: '56.25%',
                              }}
                              image={`data:;base64,${photo}`}
                               alt={`product_photo`}
                              
                            />))}
                          

                           <CardContent sx={{ flexGrow: 1 }}>
                             <Typography gutterBottom variant="h5" component="h2">
                               {row.name}
                             </Typography>
                           </CardContent>
                           <CardActions>
                             <div>
                            
                             <Button size="small"  onClick={()=>addCart(row)}>{`${row.price}$ Add to Cart`}</Button>
                             <Button size="small">Go Details Page</Button>
                            </div>
                           </CardActions>
                         </Card>
                       </Grid>
                    ))}
                </Grid>
                </Container>
                </Grid>
                
        </div>
    );
}

export default CategoryPage;