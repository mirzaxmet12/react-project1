import { ReactNode } from 'react';
import { Box } from '@mui/material';

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
