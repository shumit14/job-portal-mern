import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function ProtectedRoutes ({children,role}){
const {user} = useSelector((state)=>state.auth)

// NOT LOGGED IN
if(!user){
    return <Navigate to='/login' replace />
}

//ROLE RESTRICTED ROUTE
if(role && user.role !== role){
    return <Navigate to='/jobs' replace />
}
return children
}