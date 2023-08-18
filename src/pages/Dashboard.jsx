import React from "react";
import NavBar from "../components/NavBar";

// React hooks
import { useEffect, useState } from "react";

// MUI components
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";

// Firebase functions
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
//import { storage } from "../firebase/firebaseconfig";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

// Custom components and utility files
import DeleteAcc from "../components/DeleteAcc";

const styles = {
    paperStyles: {
        // margin: "32px",
        marginTop: "5rem",
        width: "100%",
        borderRadius: '10px',
        // height: "600px",
        padding: "5%",
        backgroundColor: "rgb(255,255,255,0.97)"
    }
}

/**Edit profile component */
function Dashboard() {
    //variables
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const db = getFirestore();
    const storage = getStorage();


    //state hooks
    const [profilePicURL, setProfilePicURL] = useState('');
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    //run when component loads
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "users", uid); //get a reference to relevant user document
            const docSnap = await getDoc(docRef); //get a snapshot of the user document


            if (docSnap.exists) { //if the snapshot exists: update user data
                // console.log(docSnap.data());
                setfName(docSnap.data().fName);
                setlName(docSnap.data().lName);
                setMobile(docSnap.data().mobile);
                setEmail(docSnap.data().email);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        };
        fetchData(); //run the anonymous function
        // eslint-disable-next-line
    }, []); // [] sets dependancies

    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                if (uid) {console.log(storage);
                    const profilePicRef = ref(storage, `users/${uid}/ProfilePic`);
                    console.log(storage);
                    const url = await getDownloadURL(profilePicRef);
                    setProfilePicURL(url);
                }
            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };
    
        fetchProfilePic();
        // eslint-disable-next-line
    }, [uid]);

    /**
     * Handles submission of user data
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        // update authentication displayName
        if (fName !== null || fName !== "") {
            updateProfile(user, {
                displayName: fName
            }).then(() => {
                // After profile is updated,
                console.log("Profile updated");
            }).catch((error) => {
                // If an error occurred
                console.log(error.message);
            });
        }

        //update authentication email & email in the firestore DB
        if (email !== null || email !== "") {
            if (email !== auth.currentUser.email) {
                updateEmail(user, email).then(() => {
                    // Email updated!
                    console.log("Authentication email updated");
                }).catch((error) => {
                    // An error occurred
                    console.log(error.message);
                });
            }
        }

        const userRef = doc(db, 'users', uid); //get a reference for the user from DB

        async function update() { //Update the user information
            await updateDoc(userRef, { fName: fName, lName: lName, email: email, mobile: mobile });
        }
        update();


    };


    return (
       
        <Container maxWidth="sm" disableGutters>
             <NavBar></NavBar>
            {/* <Paper elevation={0} sx={{ mt: '120px', width: '100%', mx: 'auto' }}> */}
            <Paper elevation={12} sx={styles.paperStyles} >
                <Typography variant='h5' textAlign='center' fontWeight="medium" sx={{ my: '10px' }}>Dashboard</Typography>
                
                <form onSubmit={handleSubmit}>

                    { (
                        <img src={profilePicURL} alt="Profile" style={{ maxWidth: '100%', height: '300px',width: 'auto',  margin: '10px auto', display: 'block',border: '2px solid #d3d3d3' }} />
                    )}
                    <Grid container spacing={3}>
                        {}

                        <Grid item xs={6}>
                            <TextField fullWidth defaultValue={fName} value={fName} variant="outlined" label="First Name" type="text"
                                onChange={(event) => setfName(event.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth defaultValue={lName} value={lName} variant="outlined" label="Last Name" type="text"
                                onChange={(event) => setlName(event.target.value)} />
                        </Grid>

                        <Grid item xs={8}>
                            <TextField fullWidth defaultValue={email} value={email} variant="outlined" label="Email Address" type="email"
                                onChange={(event) => setEmail(event.target.value)} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField defaultValue={mobile} value={mobile} variant="outlined" label="Phone" type="phone"
                                onChange={(event) => setMobile(event.target.value)} />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" >
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="error"
                                onClick={() => {
                                    if (!deleteDialogOpen) setDeleteDialogOpen(true);
                                }}>
                                Delete Account
                                <DeleteAcc
                                    open={deleteDialogOpen}
                                    onClose={() => { setDeleteDialogOpen(false) }} />
                            </Button>
                        </Grid>
                    </Grid>
                    { }
                    {/* </Grid> */}

                </form>
            </Paper>
        </Container >
    );
}

export default Dashboard;