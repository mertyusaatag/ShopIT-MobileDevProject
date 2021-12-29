import React from 'react'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import axios from 'axios';
import TopAppBar from './AppBar';
import Typography from '@mui/material/Typography';
import { Link, Navigate } from 'react-router-dom';
import { SERVER_HOST, GUEST_LEVEL } from '../config/global_constants';

const LogIn = () => {
    const paperStyle = {
        padding: "50px 20px",
        width: 600,
        margin: "20px auto",
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isUserLogged, setUserLogged] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorFlag, setErrorFlag] = useState(false)

    const handleOnClick = (e) => {
        e.preventDefault()
        const loggingCrudentials = {
            email,
            password
        }
        setErrorFlag(false)
        axios.post(`${SERVER_HOST}/users/loginUser`, loggingCrudentials)
            .then(res => {
                const user = {
                    name: res.data.name,
                    email: res.data.email,
                    accessLevel: res.data.accessLevel,
                    token: res.data.tokens.access_token,
                    img: res.data.img
                }
                localStorage.setItem("user", JSON.stringify(user))
                setUserLogged(true)
            })
            .catch(err => {
                setErrorFlag(true)
                setErrorMessage(err.response.data.message)
            })
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user.accessLevel > GUEST_LEVEL) {
            setUserLogged(true)
        }
    }, [])



    return (
        <div className="LogIn">
            <TopAppBar />
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <h1>Log in to your account.</h1>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 'auto', mt: 1, width: '40ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField label="E-mail" variant="outlined"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} /><br />
                        <TextField label="Password" variant="outlined" type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} /><br />
                        {errorFlag ? <Typography color="red">{errorMessage}</Typography> : ''}
                        <Button variant="outlined" color="success" onClick={handleOnClick}>Log in</Button><br />
                        Don't have an account? <Link to="/SignUp">Sign up!</Link>

                    </Box>
                </Paper>
            </Container>
            {isUserLogged ? <Navigate to="/homepage" /> : ""}
        </div>
    );
}

export default LogIn;