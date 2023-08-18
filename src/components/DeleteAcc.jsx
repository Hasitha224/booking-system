import PropTypes from 'prop-types';
import * as React from 'react';

// MUI material
import { Button, Dialog, DialogTitle } from '@mui/material';

// React router
import { useNavigate } from 'react-router-dom';

//Firebase functions
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

DeleteAcc.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function DeleteAcc(props) {

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid.toString();

  const db = getFirestore();

  const navigate = useNavigate();

  const { onClose, open } = props;

  
  const deleteUserFromFirestore = async () => {
    await deleteDoc(doc(db, "users", uid));
  };

  const deleteUserFromAuth = async () => {
    await user.delete();
  };

  

  return (
    // <Dialog onClose={onClose} open={open}> use onclose prop to close dialog when user clicks away
    <Dialog open={open}>
      <DialogTitle>Delete this account?</DialogTitle>

    <span sx={{ mx: 'auto', width: '100%' }}>
      <Button color='error'
      onClick={async () => {
        try {
          await deleteUserFromFirestore(); // Delete user data from Firestore
          await deleteUserFromAuth(); // Delete user from Firebase authentication
        
        // User deleted.
        navigate("/");
        } catch (error) {
        //When error occurred
        console.error("Error deleting user:", error);
      }
      
      onClose(); // Close the dialog
    }}>
      Yes
      </Button>

      <Button 
      onClick={() => {
        onClose(); // Close the dialog
    }}>
    No
      </Button>
    </span>

    </Dialog>
  );
}

export default DeleteAcc;