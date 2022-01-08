import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Paper, Grid, Typography, Button } from '@mui/material'
import { SERVER_HOST, ADMIN_LEVEL } from '../config/global_constants';
import TopAppBar from './AppBar';
import UsersTable from './UsersTable'
import axios from 'axios'

const paperStyle = {
    padding: "50px 20px",
    width: 1500,
    margin: "20px 20px auto",
}

const paperStyleSmall = {
    padding: "50px 20px",
    width: 600,
    margin: "20px 20px auto",
}

const AdminPanel = () => {

    const [adminFlag, setAdminFlag] = useState(false)
    const [admin, setAdmin] = useState(null)

    const productsHandleOnClick = (e) => {
        e.preventDefault()
    }

    const usersHandleOnClick = (e) => {
        e.preventDefault()
        axios.delete(`${SERVER_HOST}/users/deleteAll`, { headers: { 'authorization': admin.token }})
        .then(res => {
            console.log(res.data)
            window.location.reload()
        })
        .catch(err => {
            console.log(err.response.data.message)
        })
    }


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user.accessLevel < ADMIN_LEVEL) {
            setAdminFlag(false)
        }else{
            setAdminFlag(true)
            setAdmin(user)
        }
    }, [])

    return (
        <div className="Adminpanel">
            <TopAppBar />
            {adminFlag
                ? <Grid container spacing={2} sx={{ m: 'auto' }} alignItems="stretch" justifyContent="center">
                    <Paper elevation={3} style={paperStyle}>
                        <Typography item variant="h4">Admin Panel.</Typography><br />
                        <Grid container spacing={2} sx={{ m: 'auto' }} alignItems="stretch" justifyContent="center" direction="row">
                            <Paper elevation={6} style={paperStyleSmall}>
                                <Typography item variant="h5">Products.</Typography><br />
                                <Button variant="contained" component={Link} to="/addcocktail">
                                    Add product
                                </Button> 
                                <Button variant="contained" color="error" onClick={productsHandleOnClick}> 
                                    Clear data
                                </Button>
                            </Paper>
                            <Paper elevation={6} style={paperStyleSmall}>
                                <Typography item variant="h5">Users.</Typography><br />
                                <UsersTable /><br/>
                                <Button variant="contained" color="error" onClick={usersHandleOnClick}> 
                                    Clear data
                                </Button>
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
                : <h1>You don't have access to this feature</h1>}
        </div>
    );
}

export default AdminPanel;