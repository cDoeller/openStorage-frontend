import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

// ** is anonymous
// everything wrapped in this component:
// only show children if * not logged in *
// --> users should not be able to reach login page when logged in.

function IsAnon(props) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <Loading />;

  //    navigate to home if logged in
  if (isLoggedIn) {
    return <Navigate to="/" />;
    // return children if anonymous
  } else {
    return props.children;
  }
}

export default IsAnon;
