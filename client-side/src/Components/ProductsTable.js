import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography, ImageList } from '@mui/material';
import { useState, useEffect } from 'react';
import { SERVER_HOST } from '../config/global_constants';
import { Link } from 'react-router-dom'
import axios from 'axios';

const imageStyle = {
    display: 'block',
    margin: 'auto',
    width: 50,
    height: 50,
}

export default function ProductsTable() {
    const [rows, setRows] = useState([])
    const [admin, setAdmin] = useState(null)
    const [updateFlag, setUpdateFlag] = useState(false)

    const handleOnClick = (e) => {
        e.preventDefault()
        const id = e.target.dataset.id
        axios.delete(`${SERVER_HOST}/products/deleteProduct/${id}`, { headers: { 'authorization': admin.token } })
            .then(res => {
                console.log(res.data)
                setUpdateFlag(true)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user"))
        setAdmin(loggedUser)
        axios.get(`${SERVER_HOST}/products/getAllProducts`)
            .then(res => {
                setRows(res.data)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
        setUpdateFlag(false)
    }, [updateFlag])

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader sx={{ minWidth: 650, tableLayout: "auto" }} size="small" aria-label="cocktail table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Categories</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Photos</TableCell>
                        <TableCell>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow sx={{ height: 50 }}>
                            <TableCell>{row._id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell>{row.categories.map(category => (
                                <div><Typography variant="h8">{category}</Typography></div>
                            ))}</TableCell>
                            <TableCell>{row.color.map(clr => (
                                <div><Typography variant="h8">{clr}</Typography></div>
                            ))}</TableCell>
                            <TableCell>{`$${row.price}`}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell >
                                <ImageList cols={2}>
                                    {row.img.map((photo) => (
                                        <img src={`data:;base64,${photo}`} alt={`product_photo`} style={imageStyle} />
                                    ))}
                                </ImageList>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" component={Link} to={`/editproduct/${row._id}`}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="error" data-id={row._id} onClick={handleOnClick}>
                                    Delete
                                </Button> <br />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}