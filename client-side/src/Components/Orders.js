
import TopAppBar from './AppBar'
import OrderCard from './OrderCard'
import React from 'react';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { SERVER_HOST } from '../config/global_constants';


const Orders = () => {

    const [orders,setOrders] = useState([])
    const [userId, setUserId] = useState()
    let content = null;
     
    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));

        axios.get(`${SERVER_HOST}/users/getUserByEmail/${loggedUser.email}`, {headers: {"authorization": loggedUser.token}})
             .then(res => {
                setUserId(res.data._id)          
        })


        axios.get(`${SERVER_HOST}/orders/userOrders/${userId}`,  { headers: { "authorization": loggedUser.token }})  //to check
             .then(respo => {  
                     setOrders(respo.data)
              })
           },[userId])   
        

           if(orders.length > 0){
            content =
            orders.map( (order,key) =>
                 {  
                    return  ( <List 
                             sx={{ width: '100%',
                                maxWidth: 960,
                                bgcolor: 'background.paper',
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginBottom: 5
                                }}><Paper elevation={6}>
                                    <OrderCard 
                                     list = {order}/></Paper>

                                  
                          </List>  )                
                })

            }

        //     else{
        //         content =  <Typography  sx={{fontSize: 35,marginLeft:"auto",marginRight:"auto"}}          
        //         component="span"
        //         variant="body2"
        //          color="text.primary" >
               
        //        <b>You don't have any order</b>
        //    </Typography>
        //     }

    return(
        <div className="Orders">
            <TopAppBar/>
                 <h1 style={{marginBottom: 0}}>Order history</h1>
                     <Divider variant="middle" sx={{  marginBottom:10,borderWidth: 1, borderColor:"black",borderStyle:"solid"  }} />
                         {content}      
        </div>
    );
}

export default Orders;