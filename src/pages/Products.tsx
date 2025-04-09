import { useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Chip, Grid,  TextField } from '@mui/material';

interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string

}

function Products() {
    const { name } = useParams()
    const [searchTerm, setSearchTerm] = useState('')


    const { data, isLoading, isError } = useQuery<Product[]>({
        queryKey: ['products', name],
        queryFn: () => {
            const url = name
                ? `https://fakestoreapi.com/products/category/${name}`
                : `https://fakestoreapi.com/products`
            return axios.get(url).then(res => res.data)
        },
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading products</div>

    const filteredProducts = data?.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log(data);

    return (
        <Box ml={'300px'} sx={{
            pt: 4,
            borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
        }}>
            <TextField
                label="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                    width: 400,
                    mb: 3,
                    ml:'140px',
                    backgroundColor: '#fff',
                    borderRadius: 1,
                    input: { color: 'black' },
                }}
            />


            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {filteredProducts?.map((product) => (
                    <li key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    image={product.image}
                                    title="" sx={{
                                        width: '100%',
                                        height: 300, 
                                        backgroundSize: 'contain'

                                    }}
                                />
                                <CardContent>
                                    <Typography noWrap sx={{ mb: 1 }}>
                                        {product.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            mb: 2

                                        }}
                                    >
                                        {product.description}
                                    </Typography>
                                    <Chip label={product.category} variant="outlined" />
                                </CardContent>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    mb: 3

                                }}>
                                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                        ${product.price}
                                    </Typography>
                                    <CardActions>
                                        <Button variant='contained' size="small" sx={{ textTransform: 'capitalize', fontSize: 15 }}>Add to card</Button>
                                    </CardActions>
                                </Box>
                            </Card>
                        </Link>
                    </li>
                ))}
            </Grid>
        </Box>
    )
}
export default Products
