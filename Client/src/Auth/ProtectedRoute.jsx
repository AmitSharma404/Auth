import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({children}) => {
    // const isAuthenticated = localStorage.getItem('token');

    // if(!isAuthenticated) {
    //     return <Navigate to='/login' replace></Navigate>
    // }
    return children;
} 