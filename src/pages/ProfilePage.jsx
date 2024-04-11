import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/Profile.css";

function ProfilePage() {
  const { id } = useParams();

  const { isLoggedIn, user } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(user);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((fetchedData) => {
        setUserInfo(fetchedData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, storedToken]);

  return (
    <div id="ProfilePage">
      <h1>Your Profile</h1>

      {isLoggedIn && userInfo && (
        <div className="profile-wrapper">

          <div className="profile-card">
            <img
              src={userInfo.profile_img_url}
              alt={`${userInfo.user_name} Profile`}
            />
            <div className="profile-info">
              {userInfo.isArtist ? (
                <p className="profile-type">Artist</p>
              ) : (
                <p className="profile-type">Art-Lover</p>
              )}
              <p>
                <span className="username-bold">{userInfo.user_name}</span>{" "}|{" "}
                {userInfo.city}
              </p>
              <p>Tagline?</p>
            </div>
          </div>

          
          <div className="loans-wrapper">
            <h5>Current Loans</h5>
            <div className="loans-thumbs-wrapper"></div>
          </div>
          <div className="loans-wrapper">
            <h5>Pending Requests</h5>
            <div className="loans-thumbs-wrapper"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
