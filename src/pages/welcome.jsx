import React from 'react';

// MUI components
import { Box, Button, Container, Paper, Typography } from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';


// Custom Styles
const styles = {
    paperStyles: {
        borderRadius: '10px',
        width: '70%',
        height: 'auto',
        padding: "5%",
        mx:'auto',
        backgroundColor: "rgba(255, 255, 255, 0.97)" //set opacity of paper without affecting child components
    },
    gridStyle: {
        margin: '1rem',
        padding: '0.5rem'
    },
    buttonStyle: {
        width: '100%',
        mx: 'auto'
    },
}

/**Welcome component */
function Welcome() {
    const navigate = useNavigate();
    return (
        <Container maxWidth='lg' disableGutters >
            
            <Box>
                <Paper elevation={10} sx={styles.paperStyles}>
                    <Typography variant='h3' fontWeight={'medium'} fontFamily={'sans-serif'} gutterBottom>Hi,Welcome to Dr.Perry's Office </Typography>
                    <Typography variant='h4' fontWeight={'medium'} fontFamily={'sans-serif'} gutterBottom>Book your appointment with Dr.Perry!</Typography>
                    <Typography variant='body1' fontSize='1.2rem' fontFamily={'sans-serif'} paragraph gutterBottom>
                    The running of a medical clinic or health centre has the health and wellbeing of its patients at its core. However, the nature of the medical profession requires intense scrutiny, detailed reporting, and strict security. 
                    Doctors dedicate most of their time to the care of patients.Now it's easier. you can safely use our booking and scheduling system for the appointments with Dr. Perry.
                    </Typography>

                    <Button size='large' variant='contained' color='success' sx={{marginRight:'2%'}} 
                    onClick={()=>navigate('/signup')}>Signup</Button>
                    <Typography variant='h6' component='span' fontFamily={'sans-serif'} paragraph>
                        or
                    </Typography>
                    <Button size='large' variant='contained' color='primary' sx={{marginLeft:'2%'}}
                     onClick={()=>navigate('/login')}>Login</Button>
                </Paper>
            </Box >
        </Container>

    );
}

export default Welcome;