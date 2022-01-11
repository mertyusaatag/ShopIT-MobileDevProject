import React from 'react'
import TopAppBar from './AppBar';
import { useParams } from 'react-router';


const CategoryPage = () => {
    const {category} = useParams()

    return (
        <div className="CategoryPage" >
            <TopAppBar/>
            <h1>Category {category}</h1>
        </div>
    );
}

export default CategoryPage;