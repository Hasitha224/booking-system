import React from 'react';
import app from '../firebase/firebaseconfig';
// React hooks
import { useEffect, useState } from 'react';

// React router
import { useNavigate } from 'react-router-dom';

// Firebase function
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

// MUI components
import { AppBar, Avatar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';

// Custom componets
import UserMenu from './MenuUser';

/**ApplicationBar component */
function NavBar() {
    //constants
    const auth = getAuth(app);
    const navigate = useNavigate();
    const db = getFirestore(app);

    // states
    const [userName, setUserName] = useState('');

    // useEffect hook
    useEffect(() => {
        const uid = (auth.currentUser !== null) ? auth.currentUser.uid : null;
        if (uid !== null) {
            const fetchData = async () => {
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists) {
                    setUserName(docSnap.data().fName + ' ' + docSnap.data().lName);
                    console.log("Document data:", docSnap.data());
                    console.log("Fname:", docSnap.data().fName);

                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            };
            fetchData();
        }
    }, [auth.currentUser, db]);

    const [isLoggedIN, setIsLoggedIN] = useState(true);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null); //Anchor element for usermenu
    const isMenuOpen = Boolean(menuAnchorEl);
    const handleProfileClick = (event) => {
        if (auth.currentUser === null) {
            navigate("/login");
        } else {
            setMenuAnchorEl(event.currentTarget);
        }
    }
    const handleProfileClose = () => {
        setMenuAnchorEl(null);
    };
    const handleLogout = async () => {
        await setIsLoggedIN(false);
        await setMenuAnchorEl(null);
        navigate("/");
    }


    return (
        <Box sx={{ flexGrow: 1, display: 'flex', width: "100%", zIndex: 'modal', position: 'fixed', top: 0, marginX: 0 }}>

            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>

                    <Stack spacing={0.1} sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="div" fontFamily={'sans-serif'}>
                            Dr.Perry's Dispensary
                        </Typography>
                        {}
                    </Stack>

                    <Button color="inherit" onClick={handleProfileClick}>
                        {auth.currentUser !== null ? <Avatar>
                            <img alt='person'
                                src={`https://avatars.dicebear.com/api/initials/${userName}.svg`} />
                        </Avatar> : "Login"}
                    </Button>
                </Toolbar>
            </AppBar>
            <UserMenu userName={userName} menuAnchorEl={menuAnchorEl} handleProfileClose={handleProfileClose} isMenuOpen={isMenuOpen} handleLogout={handleLogout} />
        </Box>

    );
}

export default NavBar;