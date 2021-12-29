import React from 'react';
import {
    Button, Paper, Container, Box,
    TextField, MenuItem, InputLabel, Select,
    OutlinedInput, Chip, InputAdornment, Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import axios from 'axios'
import { SERVER_HOST, GUEST_LEVEL, ADMIN_LEVEL } from '../config/global_constants';

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

const categories = ['Laptop', 'PC Hardware', 'Monitor', 'Keyboard', 'Mouse', 'Headphones', 'GPU', 'CPU', 'RAM', 'Motherboard']
const colors = ['white', 'black', 'red', 'blue', 'green', 'yellow', 'purple', 'orange']

const AddProductForm = () => {
    const paperStyle = {
        padding: "50px 20px",
        width: 600,
        margin: "20px auto",
    }

    const theme = useTheme()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [productCategory, setCategory] = useState([])
    const [productColor, setColor] = useState([])
    const [price, setPrice] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [files, setFiles] = useState(null)
    const [inStock, setInStock] = useState(false)
    const [user, setUser] = useState(null)
    const [userLogged, setUserLogged] = useState(false)
    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successFlag, setSuccessFlag] = useState(false)

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

    const clearInputs = () => {
        setName("")
        setCategory([])
        setColor([])
        setPrice(0)
        setQuantity(0)
        setDescription('')
    }

    const handleOnClick = (e) => {
        e.preventDefault()
        setErrorFlag(false)
        setSuccessFlag(false)
        setErrorMessage('')
        if (user.accessLevel < ADMIN_LEVEL) {
            setErrorFlag(true)
            setErrorMessage("You don't have permission to use this feature")
        } else {
            if (quantity > 0) {
                setInStock(true)
            } else {
                setInStock(false)
            }
            const product = {
                name: name,
                desc: description,
                categories: productCategory,
                color: productColor,
                price: price,
                quantity: quantity,
                inStock: inStock
            }
            axios.post(`${SERVER_HOST}/products/addProduct`, product, { headers: { "authorization": user.token } })
                .then(res => {
                    let formData = new FormData()
                    for (const key of Object.keys(files)) {
                        formData.append('img', files[key])
                    }
                    formData.append('name', name)
                    axios.put(`${SERVER_HOST}/products/addImages`, formData, { headers: { "Content-type": "multipart/form-data", "authorization": user.token } })
                        .then(res => {
                            setSuccessFlag(true)
                            clearInputs()
                        })
                        .catch(err => {
                            setErrorFlag(true)
                            setErrorMessage(err.response.data.message)
                        })
                })
                .catch(err => {
                    setErrorFlag(true)
                    setErrorMessage(err.response.data.message)
                })
        }
    }

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        if (loggedUser.accessLevel > GUEST_LEVEL) {
            setUserLogged(true)
            setUser(loggedUser)
        } else {
            setUserLogged(false)
        }
    }, [])

    return (
        <div className="addProductForm">
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <h1>Add new product.</h1>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 'auto', mt: 1, width: '40ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField label="Product name" variant="outlined"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }} /><br />
                        <InputLabel id="multiple-category-label">Categories</InputLabel>
                        <Select
                            labelId="multiple-category-label"
                            id="multiple-category"
                            multiple
                            value={productCategory}
                            onChange={(e) => {
                                setCategory(
                                    typeof e.target.value === "string" ? e.target.value.split(',') : e.target.value,
                                )
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
                                    style={getStyles(cat, productCategory, theme)}
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
                            value={productColor}
                            onChange={(e) => {
                                setColor(
                                    typeof e.target.value === "string" ? e.target.value.split(',') : e.target.value,
                                )
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
                                    style={getStyles(color, productColor, theme)}
                                >
                                    {color}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField label="Price" variant="outlined"
                            value={price}
                            type="number"
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }} /><br />
                        <TextField label="Quantity" variant="outlined"
                            value={quantity}
                            type="number"
                            onChange={(e) => {
                                setQuantity(e.target.value)
                            }} /><br />
                        <TextField label="Description" variant="outlined"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }} /><br />
                        <InputLabel id="multiple-category-label">Images</InputLabel>
                        <input accept="image/*" id="file-upload" type="file" onChange={handleOnFileChange} multiple /><br />
                        {errorFlag ? <Typography color="red">{errorMessage}</Typography> : ""}
                        <Button variant="contained" onClick={handleOnClick}>Add product</Button><br />
                        {successFlag ? <Typography color="green">Product successfully added.</Typography> : ""}
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}

export default AddProductForm;