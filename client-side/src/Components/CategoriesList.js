import React from 'react'
import { List, ListSubheader, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'

const categories = [,
{
    label: 'Laptops',
    url: '/category/Laptop' 
},
{
    label: 'PC Hardware',
    url: '/category/PC%20Hardware' 
},
{
    label: 'Monitors',
    url: '/category/Monitor' 
},
{
    label: 'Keyboards',
    url: '/category/Keyboard' 
},
{
    label: 'Mice',
    url: '/category/Mouse' 
},
{
    label: 'Headphones',
    url: '/category/Headphones' 
},
{
    label: 'GPUs',
    url: '/category/GPU' 
},
{
    label: 'CPUs',
    url: '/category/CPU' 
},
{
    label: 'RAM',
    url: '/category/RAM' 
},
{
    label: 'Motherboards',
    url: '/category/motherboard' 
},]

const CategoriesList = () => {
    return (
        <div className="CategoriesList" >
            <List subheader={
                <ListSubheader component="div">
                    Product categories.
                </ListSubheader>
            }>
                {categories.map((category, index)=>(
                    <ListItemButton key={index} component={Link} to={category.url}>{category.label}</ListItemButton>
                ))}

            </List>
        </div>
    );
}

export default CategoriesList;