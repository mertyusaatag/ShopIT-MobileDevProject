import React from 'react';
import TopAppBar from './AppBar';
import {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import {Grid, Paper, Avatar, Button} from '@mui/material';
import ChangePasswordDialog from './ChangePasswordDialog';
import ChangeProfilePicDialog from './ChangeProfilePicDialog';

function UserProfile() {

    const paperStyle = {
        padding:"50px 20px",
        width: 500,
        margin: "20px auto",
    }

    const[isUserLogged, setUserLogged] = useState(false)
    const[user, setUser] = useState()

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        if(loggedUser.accessLevel !== 0){
            setUserLogged(true)
            setUser(loggedUser)
        }else{
            setUserLogged(false)
        }
    }, [])

    return (
        <div className="UserProfile">
            <TopAppBar />
            {isUserLogged 
            ?   <Paper elevation={3} style={paperStyle}>
                    <Grid container direction="column" >
                        <Typography item variant="h4"><b>User profile.</b></Typography><br/>
                        <Avatar  alt="Profile picture" src={user.img === "" ? "/broken-image.jpg" : `data:;base64,${user.img}`} sx={{ width: 200, height: 200, margin : "auto" }}/><br/>
                        <Paper item elevation = {6} style={{padding:"10px 10px"}} >
                            <Typography variant="h5" align='left'>Name: {user.name}</Typography>
                        </Paper><br/>
                        <Paper item elevation = {6} style={{padding:"10px 10px"}}>
                            <Typography variant="h5" align='left'>Email: {user.email}</Typography>
                        </Paper><br/>
                    </Grid>
                    <ChangePasswordDialog /><br/>
                    <ChangeProfilePicDialog/>
                </Paper>
            : <Typography>Log in first to see you profile.</Typography>}
        </div>
    );
}

export default UserProfile;