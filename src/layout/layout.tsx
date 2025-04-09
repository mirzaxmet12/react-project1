import  { ReactNode } from 'react';
import Navbar from '../pages/Navbar';
import { Box } from '@mui/material';

interface LayoutProps {
    children: ReactNode; 
}

function Layout({ children }: LayoutProps) {
    return (
        <Box sx={{
            display:'flex',
        }}>
            <Navbar/>
            {children}
            
        </Box>
    );
}

export default Layout;
