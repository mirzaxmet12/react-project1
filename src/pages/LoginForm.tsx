import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { setData } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useLogin } from '../api/api';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const login = useLogin()
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    login.mutate(
      { username, password },
      {
        onSuccess: (data) => {
          dispatch(setData(data))
          navigate('/')
          console.log(data);
          
        },
        onError: () => {
          alert('Login failed')
          console.log();

        }
      }
    )
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Paper elevation={3} sx={{ p: 4, w: 400 }}>
        <Typography variant='h5' component='h1' gutterBottom align='center'>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField placeholder='Username' value={username} margin='normal' fullWidth required onChange={(e) => setUsername(e.target.value)} />
          <TextField type="password" placeholder='Password' value={password} margin='normal' required fullWidth onChange={(e) => setPassword(e.target.value)} />
          <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
      </Paper>
    </Box>
  )
}

export default LoginForm
