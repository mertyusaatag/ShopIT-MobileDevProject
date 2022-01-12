import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Typography, Grid, ImageList } from '@mui/material';
import { useState, useEffect } from 'react';
import { ADMIN_LEVEL, SERVER_HOST } from '../config/global_constants';
import { Link } from 'react-router-dom'
import axios from 'axios';
import TopAppBar from './AppBar';

const Homepage = () => {
    const [productList,setProductList] = useState([])
    const [cart, setCart] = useState([])
    const imageStyle = {
        display: 'block',
        margin: 'auto',
        width: 50,
        height: 50,
    }

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
         //turn it into js
         const localCart = JSON.parse(localStorage.getItem('cart'));
         if (localCart) setCart(localCart)

        axios.get(`${SERVER_HOST}/products/getAllProducts`)
            .then(res => {
                setProductList(res.data)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })

            
            //load persisted cart into state if it exists
           
    }, [])
    return(
        <div className="Homepage">
            <TopAppBar></TopAppBar>
        
            <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
                    {productList.map((row) => (
                         <Grid item key={row} xs={12} sm={6} md={4}>
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
                             <Typography>
                               {row.desc}
                             </Typography>
                           </CardContent>
                           <CardActions>
                             <div>
                             <Button size="small">{`${row.price} Add to Cart`}</Button>
                             <Button size="small" onClick={()=>addCart(row)}>Go Details Page</Button>
                            </div>
                           </CardActions>
                         </Card>
                       </Grid>
                    ))}
                </Grid>
                </Container>
        </div>
    );
}

export default Homepage;