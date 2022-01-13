import React from 'react'
import { List, ListSubheader, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'

const categories = [{
    label: 'All products',
    url: '/category/all' // what ever will work for you here
},
{
    label: 'Laptops',
    url: '/category/laptop' 
},
{
    label: 'PC Hardware',
    url: '/category/PC%20Hardware' 
},
{
    label: 'Monitors',
    url: '/category/monitor' 
},
{
    label: 'Keyboards',
    url: '/category/keyboard' 
},
{
    label: 'Mice',
    url: '/category/mouse' 
},
{
    label: 'Headphones',
    url: '/category/headphones' 
},
{
    label: 'GPUs',
    url: '/category/gpu' 
},
{
    label: 'CPUs',
    url: '/category/cpu' 
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