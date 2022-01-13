import React from 'react'
import { List, ListSubheader, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'

const categories = [{
    label: 'All products',
    url: '/category/all' // what ever will work for you here
<<<<<<< HEAD
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

=======
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
    url: '/category/Headphone'
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
    url: '/category/Ram'
    },
    {
    label: 'Motherboards',
    url: '/category/Motherboard'
    },]
>>>>>>> Sprint
const CategoriesList = () => {
    return (
        <div className="CategoriesList" >
            <List subheader={
                <ListSubheader component="div">
                    Product categories.
                </ListSubheader>
            }>
                {categories.map((category, index)=>(
<<<<<<< HEAD
                    <ListItemButton key={index} component={Link} to={category.url}>{category.label}</ListItemButton>
                ))}
=======
<ListItemButton key={index} component={Link} to={category.url}>{category.label}</ListItemButton>
))}
>>>>>>> Sprint
            </List>
        </div>
    );
}

export default CategoriesList;