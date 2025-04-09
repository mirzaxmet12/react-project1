import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import {  Typography } from '@mui/material'


function Categories() {
    const { data, isLoading, isError } = useQuery<string[]>({
        queryKey: ['categories'],
        queryFn: () => axios.get("https://fakestoreapi.com/products/categories").then((res) => res.data)
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading categories</div>

    return (
        <><Link to="/all-products" >
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
                <Link to={`/products/category/${category}`}>
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
        </>
    )
}
export default Categories
