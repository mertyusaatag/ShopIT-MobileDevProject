import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVER_HOST } from '../config/global_constants';
import TopAppBar from './AppBar'
import mongoose from 'mongoose';
import { Carousel } from 'react-responsive-carousel';
import asus from '../Images/asus_ad.jpg'
import intel from '../Images/intel_ad.jpg'
import corsair from '../Images/corsair_ad.jpg'
import ryzen from '../Images/ryzen_ad.jpg'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {  Paper, Typography, Button} from '@mui/material';
import { QuantityPicker } from 'react-qty-picker';


const slideImages = [asus, intel, corsair, ryzen]
const ProductPage = () => {
 
    const [productDetails, setProductDetails] = useState([]);
    const {id} = useParams();
    const [quantity_, setQuantity_] = useState()
    const [errorFlag, setErrorFlag] = useState(false)


    useEffect(() => {
        axios.get(`${SERVER_HOST}/products/getProduct/${id}`)
        .then(res => {
            setProductDetails(res.data);
        })

       
    })

  
    return(
        <div style={{width:"95%", maxWidth: 1900, marginLeft:"auto", marginRight:"auto"}}>
            <TopAppBar/>
                <h1 style={{marginBottom: 40}}>Product Details</h1>
                            <div style ={{display: "flex"}}>
                                <div style={{width:"50%",maxWidth:800, height:600}}>
                                    <Paper >
                                        <Carousel height="800px"showArrows={true} showThumbs={true}
                                            infiniteLoop={true} autoPlay={false}
                                            centerMode={true} centerSlidePercentage={370}
                                            stopOnHover={true} transitionTime={1000}
                                            interval={5000} showStatus={false} dynamicHeight={false}>
                                            {slideImages.map((img, index) => (
                                                <div className="each-fade" key={index}>
                                                    <img src={img} alt="slide-img"   />
                                                </div>
                                            ))}
                                        </Carousel>
                                    </Paper>
                                    </div>
                                         <div style={{marginLeft:"auto", marginRight:"auto"}}>
                                                 <Paper sx={{width: 500}}>
                                                    <Typography sx={{marginBottom: 1,fontSize:40}}><b>{productDetails.name}</b></Typography>
                                                    <Typography sx={{marginBottom: 6,fontSize:17, color:"gray"}}><b>Product number:{productDetails._id}</b></Typography>
                                                    </Paper>
                                                    
                                                <div style={{display: "flex"}}>
                                               
                                                        <div style={{marginTop: 20}}>
                                                            <Paper sx={{height:100, padding:2}}>
                                                                <Typography sx={{fontSize:25 }}> Quantity </Typography>
                                                                <QuantityPicker smooth value={1}
                                                                            max={productDetails.quantity}
                                                                            min={1}
                                                                            onChange ={(value)=>{
                                                                                    if(value === productDetails.quantity)
                                                                                      {
                                                                                         alert("This is maximum quantity you can add to cart " )       
                                                                                         }
                                                                                     }   
                                                                        }/>
                                                            </Paper>
                                                        </div>

                                                        <Paper sx={{width:150,marginLeft:"auto",marginTop:"auto", padding:2}}>
                                                            <Typography sx={{fontSize:25 }}> Price: <b>{productDetails.price}</b>$</Typography>
                                                            <Button variant="contained" size="large" sx={{marginTop:1}}>Add to cart {<AddShoppingCartIcon />}</Button>
                                                         </Paper>

                                                        
                                                 </div>

                                                 <div style={{maxWidth: 500, marginTop: 50}}>
                                                    <Paper>
                                                        <Typography sx={{fontSize:25 }}> Product Description</Typography>
                                                        <Typography sx={{fontSize:18 ,padding:2}}>{productDetails.desc}</Typography>
                                                    </Paper>
                                                 </div>
                                            </div>
                                </div>
         

        </div>
    )
}

export default ProductPage;