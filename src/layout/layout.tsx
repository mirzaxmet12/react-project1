import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import AddToCartForm from '../addCart';
import { Link } from 'react-router-dom';
import Categories from '../pages/Categories';
import Auth from '../pages/auth';
import Cart from '../pages/cart';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <Box>
            <Cart/>
            {children}

        </Box>
    );
}

export default Layout;
