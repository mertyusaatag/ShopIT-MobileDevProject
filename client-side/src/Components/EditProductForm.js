import React from 'react';
import {
    Button, Paper, Container, Box,
    TextField, MenuItem, InputLabel, Select,
    OutlinedInput, Chip, InputAdornment, Typography,
    ImageList
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import axios from 'axios'
import { SERVER_HOST, ADMIN_LEVEL } from '../config/global_constants';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const imageStyle = {
    display: 'block',
    margin: 'auto',
    width: 150,
    height: 150,
}

const categories = ['Laptop', 'PC Hardware', 'Monitor', 'Keyboard', 'Mouse', 'Headphones', 'GPU', 'CPU', 'RAM', 'Motherboard']
const colors = ['white', 'black', 'red', 'blue', 'green', 'yellow', 'purple', 'orange']

const EditProductForm = () => {
    const paperStyle = {
        padding: "50px 20px",
        width: 600,
        margin: "20px auto",
    }

    const { id } = useParams()
    const theme = useTheme()
    const [files, setFiles] = useState([])
    const [user, setUser] = useState(null)
    const [adminLogged, setAdminLogged] = useState(false)
    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successFlag, setSuccessFlag] = useState(false)
    const [product, setProduct] = useState(null)

    const getStyles = (cat, category, theme) => {
        return {
            fontWeight:
                category.indexOf(cat) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleOnFileChange = (e) => {
        e.preventDefault()
        setFiles(e.target.files)
    }


    const handleOnClick = (e) => {
        e.preventDefault()
        setErrorFlag(false)
        setSuccessFlag(false)
        setErrorMessage('')
        if (user.accessLevel < ADMIN_LEVEL) {
            setErrorFlag(true)
            setErrorMessage("You don't have permission to use this feature")
        } else if (files.length <= 0 && product.img.length === 0) {
            setErrorFlag(true)
            setErrorMessage("No files were selected")
        } else if (files.length >= 4) {
            setErrorFlag(true)
            setErrorMessage("Too many files. Choose a maximum of 4 files")
        } else if (files.length > 0 && product.img.length !== 0) {
            setErrorFlag(true)
            setErrorMessage("Clear previous images before adding new ones.")
        } else {
            if (product.quantity > 0) {
                setProduct(prevState => ({
                    ...prevState,
                    inStock: true
                }))
            } else {
                setProduct(prevState => ({
                    ...prevState,
                    inStock: true
                }))
            }
            axios.put(`${SERVER_HOST}/products/update`, product, { headers: { "authorization": user.token } })
                .then(res => {
                    if (files.length > 0) {
                        let formData = new FormData()
                        for (const key of Object.keys(files)) {
                            formData.append('img', files[key])
                        }
                        formData.append('name', product.name)
                        axios.put(`${SERVER_HOST}/products/addImages`, formData, { headers: { "Content-type": "multipart/form-data", "authorization": user.token } })
                            .then(res => {
                                setSuccessFlag(true)
                                window.location.reload()
                            })
                            .catch(err => {
                                setErrorFlag(true)
                                setErrorMessage(err.response.data.message)
                            })
                    } else {
                        setSuccessFlag(true)
                        window.location.reload()
                    }
                })
                .catch(err => {
                    setErrorFlag(true)
                    setErrorMessage(err.response.data.message)
                })
        }
    }
    const handleImageClear = (e) => {
        e.preventDefault()
        axios.delete(`${SERVER_HOST}/products/clearImages/${id}`, { headers: { "authorization": user.token } })
            .then(res => {
                console.log(res.data)
                setProduct(prevState => ({
                    ...prevState,
                    img: []
                }))
            })
            .catch(err => {
                setErrorFlag(true)
                setErrorMessage(err.response.data.message)
            })
    }

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        if (loggedUser.accessLevel >= ADMIN_LEVEL) {
            setAdminLogged(true)
            setUser(loggedUser)
            axios.get(`${SERVER_HOST}/products/getProduct/${id}`, { headers: { "authorization": loggedUser.token } })
                .then(res => {
                    setProduct(res.data)
                })
                .catch(err => {
                    setErrorFlag(true)
                    setErrorMessage(err.response.data.message)
                })
        } else {
            setAdminLogged(false)
        }
    }, [id])

    return (
        <div className="editProductForm">
            {adminLogged
                ? <Container>
                    <Paper elevation={3} style={paperStyle}>
                        <h1>Edit product: {id}</h1>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 'auto', mt: 1, width: '40ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField label="Product name" variant="outlined"
                                value={product ? product.name : ""}
                                onChange={(e) => {
                                    setProduct(prevState => ({
                                        ...prevState,
                                        name: e.target.value
                                    }))
                                }} /><br />
                            <InputLabel id="multiple-category-label">Categories</InputLabel>
                            <Select
                                labelId="multiple-category-label"
                                id="multiple-category"
                                multiple
                                value={product ? product.categories : []}
                                onChange={(e) => {
                                    setProduct(prevState => ({
                                        ...prevState,
                                        categories: typeof e.target.value === "string" ? e.target.value.split(',') : e.target.value
                                    }))
                                }}
                                input={<OutlinedInput value="" id="select-multiple" label="Categories" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}>
                                {categories.map((cat) => (
                                    <MenuItem
                                        key={cat}
                                        value={cat}
                                        style={getStyles(cat, product ? product.categories : [], theme)}
                                    >
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>
                            <InputLabel id="multiple-colors-label">Colors</InputLabel>
                            <Select
                                labelId="multiple-colors-label"
                                id="multiple-colors"
                                multiple
                                value={product ? product.color : []}
                                onChange={(e) => {
                                    setProduct(prevState => ({
                                        ...prevState,
                                        color: typeof e.target.value === "string" ? e.target.value.split(',') : e.target.value
                                    }))
                                }}
                                input={<OutlinedInput id="select-multiple" label="Colors" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}>
                                {colors.map((color) => (
                                    <MenuItem
                                        key={color}
                                        value={color}
                                        style={getStyles(color, product ? product.color : [], theme)}
                                    >
                                        {color}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TextField label="Price" variant="outlined"
                                value={product ? product.price : ""}
                                type="number"
                                onChange={(e) => {
                                    setProduct(prevState => ({
                                        ...prevState,
                                        price: e.target.value
                                    }))
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }} /><br />
                            <TextField label="Quantity" variant="outlined"
                                value={product ? product.quantity : ""}
                                type="number"
                                onChange={(e) => {
                                    setProduct(prevState => ({
                                        ...prevState,
                                        quantity: e.target.value
                                    }))
                                }} /><br />
                            <TextField label="Description" variant="outlined"
                                multiline
                                rows={4}
                                value={product ? product.desc : ""}
                                onChange={(e) => {
                                    setProduct(prevState => ({
                                        ...prevState,
                                        desc: e.target.value
                                    }))
                                }} /><br />
                            <InputLabel id="multiple-category-label">Images (max 4)</InputLabel>
                            <Button disabled={product ? product.img.length === 0 ? true : false : false}
                                variant="contained" onClick={handleImageClear}>Clear images</Button><br />
                            <ImageList cols={2}>
                                {product
                                    ? product.img.map((photo) => (
                                        <img src={`data:;base64,${photo}`} alt={`product_photo`} style={imageStyle} />
                                    ))
                                    : ""}
                            </ImageList>
                            <input accept="image/*" id="file-upload" type="file" onChange={handleOnFileChange} multiple /><br />
                            {errorFlag ? <Typography color="red">{errorMessage}</Typography> : ""}
                            <Button variant="contained" onClick={handleOnClick}>Edit product</Button><br />
                            {successFlag ? <Typography color="green">Product successfully updated.</Typography> : ""}
                            <Button variant="contained" component={Link} to="/admin">Back</Button><br />
                        </Box>
                    </Paper>
                </Container>
                : <h1>You don't have access to this feature</h1>}

        </div>
    )
}

export default EditProductForm;