import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../styles/Profile.css";
import userService from "../services/user.services";

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
                <span className="username-bold">{userInfo.user_name}</span> |{" "}
                {userInfo.city}
              </p>
              <p>Tagline?</p>
            </div>
          </div>

          {userInfo.isArtist && (
            <div>
              <div className="artist-statement-wrapper">
                <h5>Artist Statement:</h5>
                <p>{userInfo.artist_statement}</p>
              </div>
              <div className="artworks-section-profile">
                <h5>Artworks</h5>
                <div className="profile-artworks-scrollbar">
                {userInfo.artworks &&
                  userInfo.artworks.map((oneArtwork, index) => {
                    return (
                      <div key={index} className="profile-artwork-card-wrapper">
                        <div className="profile-artwork-card-image-wrapper">
                          <img
                            src={oneArtwork.images_url[0]}
                            alt={oneArtwork.title}
                          />
                        </div>
                        <div className="profile-artwork-card-info-wrapper">
                          <div className="profile-artwork-card-info-text-wrapper">
                            <p className="profile-artwork-card-info-text-text">
                              {oneArtwork.title}
                            </p>
                          </div>
                          <div className="artwork-card-icon-wrapper">
                            <img src="" alt="" />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>
          )}

          <div className="loans-section-profile">
            <h5>Current Loans</h5>
            <div className="loans-thumbs-wrapper"></div>
          </div>
          <div className="requests-section-profile">
            <h5>Pending Requests</h5>
            <div className="loans-thumbs-wrapper"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
