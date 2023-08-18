// Firebase functions
import { getAuth, signOut } from "firebase/auth";

// React router
import { Navigate } from "react-router-dom";

const  PublicRoute = ({children}) => {
    const auth = getAuth();
    //const navigate = useNavigate()

    if (auth.currentUser == null || auth.currentUser === null){
         // If there NO current user, render child components
        return children;
    }else if (auth.currentUser !== null){
        
        signOut(auth).then(() => {
            // Sign-out successful.
                console.log("Signed out successfully");
                return(<Navigate to="/dashboard" />);
            }).catch((error) => {
            // An error happened.
            console.log("Error in signout");
            console.log(error.message);
    
            });
    }

    //return();
}

export default PublicRoute;