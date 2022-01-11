import React from 'react'
import TopAppBar from './AppBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Button, Avatar } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CategoriesList from './CategoriesList';
import asus from '../Images/asus_ad.jpg'
import intel from '../Images/intel_ad.jpg'
import corsair from '../Images/corsair_ad.jpg'
import ryzen from '../Images/ryzen_ad.jpg'
import cpu from '../Images/cpu_small.jpg'
import gpu from '../Images/gpu_small.jpg'
import motherboard from '../Images/motherboard_small.jpg'
import { GUEST_LEVEL, ADMIN_LEVEL } from '../config/global_constants';

const slideImages = [asus, intel, corsair, ryzen]
const chosenCategories = [{
    img: cpu,
    link: "/category/cpu",
    label: "CPUs"
},
{
    img: gpu,
    link: "/category/gpu",
    label: "GPUs"
},
{
    img: motherboard,
    link: "/category/motherboard",
    label: "Motherboards"
}]

const Homepage = () => {
    const [user, setUser] = useState(null)
    const [mobileView, setMobileView] = useState(false)

    const updateView = () => {
        const mql = window.matchMedia('(max-width: 850px)');
        setMobileView(mql.matches)
    };

    useEffect(() => {
        window.addEventListener("resize", updateView);
        return () => window.removeEventListener("resize", updateView);
    }, []);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        if (loggedUser.accessLevel > GUEST_LEVEL) {
            setUser(loggedUser)
        }

    }, [])
    return (
        <div className="Homepage" >
            <TopAppBar />
            <Grid container spacing={3} direction="row" m="auto" alignItems="stretch" justifyContent="center">
                {!mobileView
                    ?
                    <Grid item xs={2}>
                        <Paper >
                            <CategoriesList />
                        </Paper>
                    </Grid>
                    : ""}

                <Grid item xs={9}>
                    <Grid container item spacing={3} direction="column" alignItems="stretch" justifyContent="center">
                        <Grid item>
                            <Paper>
                                <Carousel showArrows={true} showThumbs={false}
                                    infiniteLoop={true} autoPlay={true}
                                    centerMode={true} centerSlidePercentage={170}
                                    stopOnHover={true} transitionTime={1000}
                                    interval={5000} showStatus={false}>
                                    {slideImages.map((slideImage, index) => (
                                        <div className="each-fade" key={index}>
                                            <img src={slideImage} alt="slide-img" />
                                        </div>
                                    ))}
                                </Carousel>
                            </Paper>
                        </Grid>
                        <Grid container item spacing={3} direction="row" alignItems="stretch" justifyContent="center" >
                            <Grid item xs>
                                {!user
                                    ? <Paper style={{ padding: "10px 50px", height: "100%" }}>
                                        <Typography variant="h6">Sign in for the best experience</Typography><br />
                                        <Button component={Link} to="/login" variant="contained" fullWidth >Sign in</Button><br />
                                        <Typography>
                                            New to ShopIT? <Link to="/SignUp">Sign up!</Link>
                                        </Typography>
                                    </Paper>
                                    : <Paper style={{ padding: "10px 50px", height: "100%" }}>
                                        <Typography variant="h6">Welcome back {user.name}!</Typography><br />
                                        <Grid container spacing = {2} alignItems="stretch" justifyContent="center">
                                            <Grid item>
                                                <Button component={Link} to="/profile" variant="contained"  >Visit your profile</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button component={Link} to="/userOrders" variant="contained"  >View your orders</Button>
                                            </Grid>
                                            {user.accessLevel === ADMIN_LEVEL
                                            ? <Grid item>
                                                <Button component={Link} to="/admin" variant="contained" color="error"  >
                                                    Go to admin panel
                                                </Button>
                                                </Grid>
                                            : ""}
                                        </Grid>
                                    </Paper>}
                            </Grid>
                            <Grid item xs>
                                <Paper style={{ padding: "10px 50px", height: "100%" }}>
                                    <Typography variant="h6">Categories you might be interested in</Typography><br />
                                    <Grid container direction="row" spacing={3} >
                                        {chosenCategories.map((category, index) => (
                                            <Grid item xs>
                                                <Avatar src={category.img}
                                                    sx={{ width: 100, height: 100, margin: "auto", border: '1px solid lightgrey' }}
                                                    component={Link}
                                                    to={category.link} />
                                                <Typography>{category.label}</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>

                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Homepage;