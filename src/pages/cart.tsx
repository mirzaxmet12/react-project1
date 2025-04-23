import  { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { decQuantity, incQuantity, removeItem } from '../store/cartSlice';
import { useAddToCart, useDeleteCartItem, useUpdateCartItem } from '../api/api';
import { Box, Typography, IconButton, Button, Divider, List, CardMedia, ListItemText, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  images: [string],
}

const Cart = () => {
  const dispatch = useAppDispatch();
  const [cartDisplay, setCartDisplay] = useState(false)
  const {  isLoading, isError } = useAddToCart();
  const updateItem = useUpdateCartItem();
  const deleteItem = useDeleteCartItem();
  
  const cartItem = useAppSelector((state) => state.cart.items)
  const total = cartItem.reduce((sum, item) => sum + item.price * item.quantity, 0);


  const incHandleQuantityChange = (productId: number, quantity: number) => {
    if (quantity < 1) deleteItem.mutate(productId)
    else updateItem.mutate({ id: productId, quantity })
    dispatch(incQuantity(productId))
  };
  const decHandleQuantityChange = (productId: number, quantity: number) => {
    if (quantity < 1) deleteItem.mutate(productId)
    else updateItem.mutate({ id: productId, quantity })
    dispatch(decQuantity(productId))
  };


  const handleRemove = (productId: number) => {
    deleteItem.mutate(productId);
    dispatch(removeItem(productId))
  };

  return (
    <Box sx={{
      position: 'fixed',
      top: 5,
      left: 80,
      zIndex: 5,
    }}>
      <Button onClick={() => setCartDisplay(!cartDisplay)}>Cart 🛒</Button>
      <Box
        sx={{
          position: 'fixed',
          top: 40,
          left: 0,
          width: 400,
          height: '100%',
          bgcolor: '#fff',
          boxShadow: 4,
          p: 2,
          display: cartDisplay ? 'block' : 'none',
          overflowY: 'auto',
          zIndex: 100,
        }}
      >
        <Typography variant="h6" gutterBottom>🛒 Cart</Typography>
        <Divider sx={{ mb: 2 }} />
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : isError ? (
          <Typography>Error loading cart</Typography>
        ) : (
          <List>
            {cartItem?.map((item: CartProduct) => (
              <Box key={item.id}
                sx={{
                  display: 'flex',
                  mb: 1
                }}>
                <Box sx={{
                  width: '100px',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                  <CardMedia component='img' height='100' width='auto' image={item.images[0]} alt={item.title} sx={{
                    height: '100',
                    width: 'auto'
                  }} />
                </Box>
                <Box>
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText
                      primary={item.title}
                      secondary={`Price: $${item.price} `}
                    />
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <IconButton onClick={() => handleRemove(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <Button onClick={() => decHandleQuantityChange(item.id, item.quantity - 1)}>
                      -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button onClick={() => incHandleQuantityChange(item.id, item.quantity + 1)}>
                      +
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </List>
        )}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Total: ${total}
        </Typography>
        <Button variant="outlined" fullWidth sx={{ mt: 3 }}>
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
