import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useUpdateCartItem } from '../api/api';
import { useAppDispatch, useAppSelector } from '../store';
import { addCart, incQuantity } from '../store/cartSlice';

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
function ProductDetails() {
  const { id } = useParams()
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

  const { data, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => axios.get(`https://dummyjson.com/products/${id}`).then(res => res.data),
  })

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Product not found</div>;

  return (
    <Box sx={{
      padding: '20px',
      margin:'auto',
      mt: '100px',
      width:'900px'
    }}>
      <Card sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 5
      }}>
        <CardMedia
          component="img"
          height="300"
          image={data.images[0]}
          alt={data.title}
          sx={{
            width: 'auto',
            height: 300,
            backgroundSize: 'contain'
          }}
        />
        <CardContent sx={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            {data.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            ${data.price}
          </Typography>
          <Typography variant="body1" sx={{ mb: 8 }}>
            {data.description}
          </Typography>
          <Button onClick={() => handleAddToCart(data)} variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>

  )
}

export default ProductDetails

