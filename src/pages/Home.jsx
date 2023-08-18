import React from 'react';
// MUI components
import { Box, Container } from '@mui/material';

// React router
import { Outlet } from "react-router-dom";

// Custom components
import NavBar from '../components/NavBar';

// Assets
import backgroundImage from '../assets/background.jpg';


// Custom styles for <Home>
const styles = {
    paperContainer: {
      backgroundImage: `url("${backgroundImage}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  };

/* Home component */
function Home() {
    return (
        <Container maxWidth="xl" disableGutters>
                <Box>
                  <NavBar/>
                </Box>
                <Box style={styles.paperContainer}>
                    <Box>
                      <Outlet/>
                    </Box>
                </Box>
    
        </Container>
    );
}

export default Home;
