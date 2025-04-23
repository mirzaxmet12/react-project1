import { Box, Button } from '@mui/material'
import React from 'react'
import { logout } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store'
import { Link, useNavigate } from 'react-router-dom'


function Auth() {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.auth.token)
    console.log(token);
    
    const handleLoguot = () => {
        dispatch(logout())
    }
    return (
        <Box sx={{
            position:'absolute',
            top:5,
            left:5
        }}>
            {!token ? <Button component={Link}  to='/login'>Login</Button>:
            <Button onClick={handleLoguot}>Logout</Button>
            }

        </Box>
    )
}
export default Auth