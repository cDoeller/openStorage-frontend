import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../styles/Profile.css";
import userService from "../services/user.services";
import ArtworksScrollbar from "../components/ArtworksScrollbar";
import UserProfileCard from "../components/UserProfileCard";

function PublicProfilePage() {
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
    <div id="ProfilePage page-wrapper">
      <h1>Your Profile</h1>

      {isLoggedIn && userInfo && (
        <div className="profile-wrapper">
          <UserProfileCard
            name={userInfo.real_name}
            img={userInfo.profile_img_url}
            isArtist={userInfo.isArtist}
            city={userInfo.city}
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
                  artworks={userInfo.artworks}
                  heading={"Artworks"}
                ></ArtworksScrollbar>
              </div>
            </div>
          )}

          <div className="loans-section-profile">
            <ArtworksScrollbar
              userInfo={userInfo}
              artworks={userInfo.artworks}
              heading={"Current Loans"}
            />
            <div className="loans-thumbs-wrapper"></div>
          </div>
          <div className="requests-section-profile">
            <ArtworksScrollbar
              userInfo={userInfo}
              artworks={userInfo.artworks}
              heading={"Pending Requests"}
            />
            <div className="loans-thumbs-wrapper"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicProfilePage;
