import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/EditProfile.css";
import userService from "../services/user.services";
import ArtworksScrollbar from "../components/ArtworksScrollbar";

function EditProfilePage() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const [userInfo, setUserInfo] = useState(null);

  const [realName, setRealName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [tagline, setTagline] = useState("");
  const [city, setCity] = useState("");
  const [artistStatement, setArtistStatement] = useState("");

  // CONTACT
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");

  // ADDRESS
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [addressPostcode, setAddressPostcode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const updatedUser = {
      real_name: realName,
      profile_img_url: profileImg,
      artist_statement: artistStatement,
      city: city,
      contact: {
        website: website,
        instagram: instagram,
        address: {
          street: addressStreet,
          city: addressCity,
          country: addressCountry,
          postal_code: addressPostcode,
          phone_number: phoneNumber,
        },
      },
      tagline: tagline,
    };

    userService
      .updateUser(userInfo._id, updatedUser)
      .then((response) => {
        console.log(response.data);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
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
          setWebsite(initialData.contact.website);
          setInstagram(initialData.contact.instagram);
          setAddressStreet(initialData.contact.address.street);
          setAddressCity(initialData.contact.address.city);
          setAddressCountry(initialData.contact.address.country);
          setAddressPostcode(initialData.contact.address.postal_code);
          setPhoneNumber(initialData.contact.address.phone_number);
          setTagline(initialData.tagline);
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
                onChange={(e) => {
                  setRealName(e.target.value);
                }}
              />
              <input
                className="edit-profile-input"
                type="text"
                value={tagline}
                onChange={(e) => {
                  setTagline(e.target.value);
                }}
              />
              <select
                className="edit-profile-input"
                id="city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
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
                  onChange={(e) => {
                    setArtistStatement(e.target.value);
                  }}
                />
              </div>
              <p>Private Information</p>
              <label htmlFor="">Contact Information</label>
              <input
                className="edit-profile-input"
                type="text"
                value={website}
                placeholder="website"
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
              />
              <input
                className="edit-profile-input"
                type="text"
                value={instagram}
                placeholder="instagram handle"
                onChange={(e) => {
                  setInstagram(e.target.value);
                }}
              />
              <label htmlFor="">Address</label>
              <input
                className="edit-profile-input"
                type="text"
                value={addressStreet}
                placeholder="street name and number"
                onChange={(e) => {
                  setAddressStreet(e.target.value);
                }}
              />
              <input
                className="edit-profile-input"
                type="text"
                value={addressCity}
                placeholder="city"
                onChange={(e) => {
                  setAddressCity(e.target.value);
                }}
              />
              <input
                className="edit-profile-input"
                type="text"
                value={addressCountry}
                placeholder="country"
                onChange={(e) => {
                  setAddressCountry(e.target.value);
                }}
              />
              <input
                className="edit-profile-input"
                type="text"
                value={addressPostcode}
                placeholder="postcode"
                onChange={(e) => {
                  setAddressPostcode(e.target.value);
                }}
              />
            </div>
          )}
          <button>Update</button>
        </form>
      )}
    </div>
  );
}

export default EditProfilePage;
