import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Chip, Grid, Pagination, TextField } from '@mui/material';
import Categories from './Categories';
import { useUpdateCartItem } from '../api/api';
import { useAppDispatch, useAppSelector } from '../store';
import { addCart, incQuantity } from '../store/cartSlice';
import { useAddToCart } from '../addCart';

interface Product {
    id: number,
    title: string,
    category: string,
    description: string,
    price: number,
    rating: number,
    stock: number,
    tags: [string],
    brand: string,
    dimensions: {
        width: number,
        height: number,
        depth: number
    },
    images: [string]

}


function Products() {
    const { name } = useParams()
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const limit = 3
    const incCartItem = useUpdateCartItem()
    const dispatch = useAppDispatch()
    const cartItem = useAppSelector((state) => state.cart.items)
    const isLogged = useAppSelector((state) => state.auth.id);
    const navigate = useNavigate()

    const handleAddToCart = (product: Product) => {
        if (isLogged) {
            const item = cartItem.find(i => i.id === product.id)
            if (item) {
                incCartItem.mutate({ id: product.id, quantity: item.quantity + 1 });
                dispatch(incQuantity(item.id))
            }
            else {
                dispatch(addCart(product))
                incCartItem.mutate({ id: product.id, quantity: 1 })
            };
        } else navigate('/login')
    };

    const { data, isLoading, isError } = useQuery<Product[]>({
        queryKey: ['products', name],
        queryFn: () => {
            const url = name
                ? `https://dummyjson.com/products/category/${name}`
                : 'https://dummyjson.com/products'
            return axios.get(url).then(res => res.data.products)
        },
    });

    useEffect(() => {
        setPage(1);
    }, [name]);
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading products</div>

    const filteredProducts = data?.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPage = Math.ceil((filteredProducts?.length || 0) / limit);
    const startIndex = (page - 1) * limit;
    const paginatedProducts = filteredProducts?.slice(startIndex, startIndex + limit)
    return (
        <Box>
            <Categories />
            <Box ml={'300px'} sx={{
                pt: 4,
                borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
            }}>
                <TextField
                    label="Search..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value), setPage(1) }}
                    variant="outlined"
                    size="small"

                    sx={{
                        width: 400,
                        mb: 3,
                        ml: '140px',
                        backgroundColor: '#fff',
                        borderRadius: 1,
                        input: { color: 'black' },
                    }}
                />


                <Grid container ml={'30px'} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {paginatedProducts?.map((product) => (
                        <li key={product.id}>
                            <Link to={`/product/${product.id}`}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component='img'
                                        image={product.images[0]}
                                        loading="lazy"
                                        title={product.title}
                                        sx={{
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
                                            <Button
                                                variant='contained'
                                                size="small"
                                                sx={{ textTransform: 'capitalize', fontSize: 15 }}
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Add to cart
                                            </Button>
                                        </CardActions>

                                    </Box>
                                </Card>
                            </Link>
                        </li>
                    ))}
                </Grid>
                <Box mt={4} display='flex' justifyContent='center'>
                    <Pagination count={totalPage} page={page} onChange={(_, value) => setPage(value)} />
                </Box>
            </Box>
        </Box>
    )
}

export default Products
