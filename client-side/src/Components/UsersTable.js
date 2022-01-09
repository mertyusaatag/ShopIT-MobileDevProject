import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { ADMIN_LEVEL, SERVER_HOST } from '../config/global_constants';
import axios from 'axios';


export default function UsersTable() {
    const [rows, setRows] = useState([])
    const [user, setUser] = useState(null)

    const handleOnClick = (e) => {
        e.preventDefault()
        const id = e.target.dataset.id
        axios.delete(`${SERVER_HOST}/users/delete/${id}`, { headers: { 'authorization': user.token } })
        .then(res => {
            console.log(res.data)
            window.location.reload()
        })
        .catch(err => {
            console.log(err.response.data.message)
        })
    }

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user"))
        setUser(loggedUser)
        axios.get(`${SERVER_HOST}/users/getAll`, { headers: { 'authorization': loggedUser.token } })
            .then(res => {
                setRows(res.data)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }, [])

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="cocktail table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>AccessLevel</TableCell>
                        <TableCell>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow sx={{ height: 50 }}>
                            <TableCell component="th" scope="row">
                                {row._id}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.accessLevel}</TableCell>
                            <TableCell>
                                {row.accessLevel < ADMIN_LEVEL
                                    ? <Button variant="contained" color="error" data-id={row._id} onClick={handleOnClick}>
                                        Delete
                                    </Button>
                                    : ""}

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}