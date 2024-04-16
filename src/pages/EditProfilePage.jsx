import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/EditProfile.css";
import userService from "../services/user.services";
import ArtworksScrollbar from "../components/ArtworksScrollbar";


function EditProfilePage() {

    const navigate = useNavigate()
  const { isLoggedIn, user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const [userInfo, setUserInfo] = useState(null);

  const [realName, setRealName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [city, setCity] = useState("");
  const [artistStatement, setArtistStatement] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const updatedUser = {
        user_name: userInfo.user_name,
        real_name: realName,
        profile_img_url: profileImg,
        artist_statement: artistStatement,
        city: city,
        artworks:userInfo.artworks, 
        isArtist:userInfo.isArtist
    }

    userService.updateUser(userInfo._id, updatedUser)
    .then((response)=>{
        console.log(response.data)
        navigate("/profile")
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  useEffect(() => {
    if (user) {
      userService
        .getUser(user._id)
        .then((response) => {
          const initialData = response.data;
          setProfileImg(initialData.profile_img_url);
          setUserInfo(initialData);
          setRealName(initialData.real_name);
          setCity(initialData.city);
          setArtistStatement(initialData.artist_statement);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, storedToken]);

  return (
    <div id="ProfilePage" className="page-wrapper">
      <h1>Edit Profile</h1>

      {isLoggedIn && userInfo && (
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="edit-profile-info-wrapper">
            <div className="edit-profile-img-wrapper">
              <img src={profileImg} alt="profile image" />
            </div>
            <div className="edit-profile-text-wrapper">
              {userInfo.isArtist ? (
                <p className="profile-type">Artist</p>
              ) : (
                <p className="profile-type">Art-Lover</p>
              )}
              <input
                className="edit-profile-input"
                name="name"
                type="text"
                value={realName}
                onChange={(e)=>{setRealName(e.target.value)}}
              />
              <select className="edit-profile-input" id="city" value={city} onChange={(e)=>{setCity(e.target.value)}}>
                <option value="Leipzig">Leipzig</option>
              </select>
            </div>
          </div>

          {userInfo.isArtist && (
            <div>
              <div className="artist-statement-wrapper">
                <h5>Artist Statement:</h5>
                <textarea
                  className="edit-profile-input edit-profile-textarea"
                  value={artistStatement}
                  onChange={(e)=>{setArtistStatement(e.target.value)}}
                />
              </div>

              <div className="artworks-wrapper">
                <h5>Change order</h5>

                
              </div>
            </div>
          )}
          <button>Update</button>
          
        </form>
      )}
    </div>
  );
}

export default EditProfilePage;
