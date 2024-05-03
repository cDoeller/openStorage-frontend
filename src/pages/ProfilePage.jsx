import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/Profile.css";
import userService from "../services/user.services";
import ArtworksScrollbar from "../components/ArtworksScrollbar";
import UserProfileCard from "../components/UserProfileCard";

function ProfilePage() {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (user) {
      userService
        .getUser(user._id)
        .then((fetchedData) => {
          setUserInfo(fetchedData.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, storedToken]);

  return (
    <div id="ProfilePage" className="page-wrapper mobile-dvh">
      <h1>Your Profile</h1>

      {isLoggedIn && userInfo && (
        <div className="profile-wrapper">
          <div className="edit-link">
            <Link to="/profile/edit-profile">Edit</Link>
          </div>
          <UserProfileCard
            name={userInfo.real_name? userInfo.real_name : userInfo.user_name}
            img={userInfo.profile_img_url}
            isArtist={userInfo.isArtist}
            city={userInfo.contact.address.city}
            tagline={userInfo.tagline}
          />

          {userInfo.isArtist && (
            <div>
              <div className="artist-statement-wrapper">
                <h5>Artist Statement:</h5>
                <p>{userInfo.artist_statement}</p>
              </div>

              <div className="artworks-wrapper">

                <ArtworksScrollbar
                  userInfo={userInfo}
                  contents={userInfo.artworks}
                  heading={"Artworks"}
                ></ArtworksScrollbar>
              </div>
            </div>
          )}

          <div className="loans-section-profile">
          {console.log("user info rentals: ", userInfo.rentals)}
            <ArtworksScrollbar
              userInfo={userInfo}
              contents={userInfo.rentals.rentals_receiving}
              heading={"Current Rentals"}
            />
          </div>
          <div className="requests-section-profile">
            <ArtworksScrollbar
              userInfo={userInfo}
              contents={userInfo.rentals.rentals_receiving}
              heading={"Pending Requests"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
