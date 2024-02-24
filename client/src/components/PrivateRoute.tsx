import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
  const {currentUser} = useSelector((state: RootState) => state.user);
  return currentUser.email ? <Outlet/> : <Navigate to={'/sign-in'}/>
}

export default PrivateRoute;