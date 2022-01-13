import React from 'react'
import { List, ListSubheader, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'

const categories = [{
    label: 'All products',
    url: '/category/all' // what ever will work for you here
},
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
    url: '/category/Gpu' 
},
{
    label: 'CPUs',
    url: '/category/Cpu' 
},
{
    label: 'RAM',
    url: '/category/ram' 
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