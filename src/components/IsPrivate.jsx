import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

// ** is private
// everything wrapped in this component:
// only show children if * logged in *
// --> users should only be able to reach privtae pages when logged in.

function IsPrivate(props) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <Loading />;

  // if logged in, show the content
  if (isLoggedIn) {
    return props.children;
    // if not logged in, navigate to login page
  } else {
    return <Navigate to="/login" />;
  }
}

export default IsPrivate;
