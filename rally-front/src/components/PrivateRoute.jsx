import { useContext } from "react"
import { UserContext } from "../context/user.context"
import { Navigate, useLocation } from "react-router";


function PrivateRoute({children}) {
    const {user} = useContext(UserContext);
    const location = useLocation();

    if (!user.isLoggedIn) {
        return <Navigate to='/login' state={{from: location}} replace />
    }
  return children;
}

export default PrivateRoute