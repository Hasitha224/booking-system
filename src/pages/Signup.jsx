import React, { useState } from 'react';
import UserProfilePic from '../utils/DpUpload';
//React router
import { useNavigate } from 'react-router-dom';

// MUI components
import { Box, Button, Container, Grid, Input, InputLabel, Paper, TextField, Typography } from '@mui/material';

// Firebase functions
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebaseApp from '../firebase/firebaseconfig';

// Custom styles
const styles = {
    paperStyles: {
        // margin: "32px",
        marginTop: "5rem",
        width: "100%",
        borderRadius: '10px',
        // height: "600px",
        padding: "5%",
        backgroundColor: "rgb(255,255,255,0.97)"
    },
    gridStyle: {
        margin: '10px',
        padding: '5px'
    },
    textFieldStyle: {
        width: "100%",
        mx: 'auto'
    },

    buttonStyle: {
        width: '100%',
        mx: 'auto'
    }
}

/**Signup component */
function Signup() {

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(firebaseApp);

    const auth = getAuth(firebaseApp);
    const navigate = useNavigate();

    //Form data
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [profilePic, setProfilePic] = useState(null);

    async function addUser(uid) {
        
        try {
            await setDoc(doc(db, "users", uid), {
                user_id: uid,
                fName: fName,
                lName: lName,
                full_name: fName+" "+ lName,
                mobile: phone,
                email: email,
                profile_pic_url: "",
              });
            console.log("Document written");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
          
    }


    function handleSignup() {
        if(password ==='' || passwordConf==='' || fName ==='' || lName ==='' || phone ==='' || email ===''){
            alert('Please fill the required fields');
            return;
        }
        if (password.length < 6) {
            alert('Password should have minimum 6 characters');
            return;
        }
        if (passwordConf !== password) {
            alert("Password doesn't match");
            return;
        }
        //console.log(`${email} \n${password}`);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                // Upload profile picture if selected
                if (profilePic) {
                // Call the UserProfilePic function with user UID and profilePic
                UserProfilePic(user.uid, profilePic);
                }

                //try to add user to firestore database
                addUser(user.uid);

                //try updating display name
                updateProfile(auth.currentUser, {
                    displayName: fName + " " + lName
                  }).then(() => {
                    // Profile updated!
                    console.log("Display name updated");
                  }).catch((error) => {
                    // An error occurred
                    console.log("Error in updating display name");
                  });

                //Navigate to the dashboard of the user
                navigate("/dashboard");
            })
            .catch((error) => {
                // eslint-disable-next-line 
                const errorCode = error.code;
                // eslint-disable-next-line 
                const errorMessage = error.message;
                // ..
                console.log(error.message);
            });
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={styles.paperStyles}>
                <Typography variant='h4' textAlign={'center'} fontWeight="medium" sx={{ my: '10px' }}>Signup</Typography>

                <Box sx={styles.gridStyle}>
                    <Grid container={true} spacing={4} >
                        <Grid item xs={6}>
                            <TextField sx={styles.textFieldStyle} label="First Name" variant="outlined" required
                                onChange={(event) => { setfName(event.target.value) }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={styles.textFieldStyle} label="Last Name" variant="outlined" required
                                onChange={(event) => { setlName(event.target.value) }} />
                        </Grid>
                        {/* <Grid item xs={8}>
                            <TextField label="Username" variant="outlined" />
                        </Grid> */}
                        <Grid item xs={7}>
                            <TextField sx={styles.textFieldStyle} label="Email" variant="outlined" required
                                onChange={(event) => { setEmail(event.target.value) }} />
                        </Grid>
                        <Grid item xs={7}>
                            <TextField sx={styles.textFieldStyle} label="Mobile" variant="outlined" placeholder='+94771234567' required
                                onChange={(event) => { setPhone(event.target.value) }} />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField sx={styles.textFieldStyle} type={'password'} label="Password" variant="outlined" required
                                onChange={(event) => { setPassword(event.target.value) }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField sx={styles.textFieldStyle} type={'password'} label="Confirm Password" variant="outlined" required
                                onChange={(event) => { setPasswordConf(event.target.value) }} />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="profile-pic-upload">Upload your profile picture (jpg/png)</InputLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(event) => setProfilePic(event.target.files[0])}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button size={'large'} sx={styles.buttonStyle} variant="outlined" color='error'
                                onClick={() => navigate("/")}>Cancel</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size={'large'} sx={styles.buttonStyle} variant="contained" color='success'
                                onClick={handleSignup}>Signup</Button>
                        </Grid>
                    </Grid>


                </Box>

            </Paper>

        </Container>

    );
}

export default Signup;