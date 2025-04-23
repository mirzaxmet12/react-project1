import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import {  Box, Typography } from '@mui/material'
import Auth from './auth'


function Categories() {
    const { data, isLoading, isError } = useQuery<string[]>({
        queryKey: ['categories'],
        queryFn: () => axios.get("https://dummyjson.com/products/category-list").then((res) => res.data)
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading categories</div>


    return (
        <Box component='ul' sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            pt: '50px',
            width: '300px',


        }}>
            <Auth/>
            <Typography variant='h4' mb={2} ml={3}>Categeory</Typography>
            <Link to="/all-products" >
                <Typography variant='h6' component='li' sx={{
                    p: '20px 30px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    },
                }}>
                    All Products
                </Typography>
            </Link>
                {data?.map((category) => (
                    <Link to={`/products/category/${category}`} key={category}>
                        <Typography variant='h6' component='li' key={category} sx={{
                            textTransform: 'capitalize',
                            p: '20px 30px',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            },
    
                        }}>
                            {category}
                        </Typography>
                    </Link>
    
                ))}
        </Box >
        
    )
}
export default Categories
