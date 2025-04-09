import Categories from './Categories'
import { Box, Typography } from '@mui/material'


function Navbar() {

    return (

            <Box component='ul' sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                pt:'50px',
                width:'300px',


            }}>
                <Typography variant='h4' mb={2} ml={3}>Categeory</Typography>
                <Categories />
        </Box >
    )
}

export default Navbar
