/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  isMembershipValid,
  isAdmin,
}) => {
  if (isLoggedIn) {
    if (isAdmin) {
      return <Component />;
    } else {
      if (!isMembershipValid) {
        return <Navigate to="/payment" />;
      } else {
        return <Component />;
      }
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
