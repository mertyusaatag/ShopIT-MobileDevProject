import React, { useEffect, useState } from "react"
import axios from 'axios'
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { SERVER_HOST } from '../config/global_constants';
import moment from 'moment';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar'

const OrderCard = (props) =>{

    const [productList, setProductList] = useState([]);
   
    useEffect(() =>
    {
        props.list.products.map((product, key) =>
        {  
          return(
            axios.get(`${SERVER_HOST}/products/getProduct/${product.productId}` )
            .then (response => {
              setProductList(productList => [...productList, response.data]);
            })
          )
        })

    },[])
 
    return( 
         <ListItem alignItems="flex-start"
                sx={{
                   display: "block ",
                   marginBottom: 5
                }}>
                    <ListItemText sx={{ marginBottom: 5}}>
                       <Typography  sx={{fontSize: 25,marginLeft:"25%"}}          
                                        component="span"
                                        variant="body2"
                                         color="text.primary" >
                                       
                                       <b>Order number:</b> {props.list._id}<br/>
                                   </Typography>
                               
                        </ListItemText>

                        <ListItemText sx={{ marginBottom: 2}}>
                                   <Typography  sx={{fontSize:20}}          
                                                component="span"
                                                variant="body2"
                                                color="text.primary" >
                                       
                                       <b>Order date:</b> {moment (props.list.createdAt).format("L LTS")}<br/>
                                   </Typography>
                            </ListItemText>
                
                            <ListItemText sx={{ marginBottom: 4}}>
                                   <Typography  sx={{fontSize:20}}          
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary" >
                                       
                                       <b>Shiped to: </b>{ props.list.address} <br/>
                                   </Typography>
                        </ListItemText>  

                    <List>
                    { productList.map((prod, index) =>
                         {
                             return(
                            <ListItem alignItems="flex-start" 
                                      sx={{
                                        border:" 2px solid black",
                                         borderRadius: "5px 10px 5px 10px",
                                         marginBottom: 3,
                                         width: '100%',
                                         maxWidth: 500,
                                         marginLeft: "auto",
                                         marginRight: "auto"
                                    }}>
                                <Avatar src={`data:;base64,${prod.img[0]}`}
                                        alt={`product_photo`}
                                        sx={{ width: 100, height: 100, margin: "auto", border: '1px solid lightgrey' }} />

                                <ListItem sx={{
                                        display: "block",
                                        fontSize: "13px",
                                        marginLeft: "5%",
                                        
                                    }}>
                                        
                                <Typography
                                       
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        
                                        <b>Product number:</b> {prod._id}<br/>
                                    </Typography>
                                
                                    
                                    
                                <Typography
                                        
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        
                                        <b>Product name:</b> {prod.name}<br/>
                                    </Typography>
                                  
                                   
                                   
                                <Typography
                                      
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        
                                        <b>Quantity: </b>{props.list.products[index].quantity}<br/>
                                    </Typography>
                                   
                                   
                                   
                                <Typography
                                   
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        
                                        <b>Price:</b> {prod.price}$
                                    </Typography>
                                   
                                   
                                </ListItem>
                             </ListItem>
                             )
                         })}   
                    </List>

               <Divider variant="middle" component="li"sx={{ marginLeft: "60%" ,width: '100%',
                                maxWidth: 360}} />
                                
                                
                                <Typography
                                        sx={{ display: 'inline',marginLeft: "5%", fontSize: 17 }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        
                                       <b> Delivery status :</b> {props.list.status}
                                    </Typography>

                                    <Typography
                                        sx={{ display: 'inline',marginLeft: "80%", fontSize: 17 }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >

                                       <b> Total:</b> {props.list.amount}$
                                    </Typography>
              </ListItem>)
    
   
}

export default OrderCard