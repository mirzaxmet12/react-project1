import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

interface Product {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string

}
function ProductDetails() {
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => axios.get(`https://fakestoreapi.com/products/${id}`).then(res => res.data),
  })

  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <div>Product not found</div>

  return (
    <Box sx={{
      padding: '20px', 
      ml: '300px',
      mt:'100px'
    }}>
      <Card sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 5
      }}>
        <CardMedia
          component="img"
          height="300"
          image={data.image}
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
          <Typography variant="body1" sx={{ mb: 2 }}>
            {data.description}
          </Typography>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>

  )
}

export default ProductDetails

