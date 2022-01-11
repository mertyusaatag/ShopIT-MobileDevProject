import React from 'react'
import { List, ListSubheader, ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'

const categories = ['All products','Laptops', 'PC Hardware', 'Monitors', 'Keyboards', 'Mice', 'Headphones', 'GPUs', 'CPUs', 'RAM', 'Motherboards']

const CategoriesList = () => {
    return (
        <div className="CategoriesList" >
            <List subheader={
                <ListSubheader component="div">
                    Product categories.
                </ListSubheader>
            }>
                {categories.map(category=>(
                    <ListItemButton key={category} component={Link} to={`/category/${category}`}>{category}</ListItemButton>
                ))}
            </List>
        </div>
    );
}

export default CategoriesList;