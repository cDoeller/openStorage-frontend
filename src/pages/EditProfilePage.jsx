import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { AuthContext } from "../context/auth.context";
import "../styles/styles-pages/EditProfile.css";
import userService from "../services/user.services";
import uploadService from "../services/file-upload.services";
import "../styles/styles-templates/Forms.css";
import germanCities from "../data/cities-germany.json";

function EditProfilePage() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const [userInfo, setUserInfo] = useState({});
  const [cityOptions, setCityOptions] = useState([]);

  const [realName, setRealName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [imageData, setImageData] = useState("");
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
  const [addressPostcode, setAddressPostcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  let countryOptions = [{ value: "Germany", label: "Germany" }];

  function handleCitiesSelectChange(selectedOption) {
    setCity(selectedOption.value);
  }

  function handleCountrySelectChange(selectedOption) {
    setAddressCountry(selectedOption.value);
  }

  // REACT SELECT STYLING
  // https://react-select.com/styles#inner-components
  const selectStles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: "0",
      outline: "red",
      borderRadius: "10px",
      boxShadow: '0 0 1rem var(--greydark)',
      padding: "0.2rem"
    }),
    container: (baseStyles, state) => ({
      ...baseStyles,
      outline: "red",
      border: "none",
      borderRadius: "0",
      // padding: "1rem"
      // borderBottom: "2px solid black",
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      border: "none",
      outline: "none",
      color: "black",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      margin: "0",
      borderRadius: "0",
      maxHeight: "7rem",
      overflow: "scroll",
    }),
  };

  useEffect(() => {
    let formattedOptions = germanCities.map((oneCity) => {
      return { value: oneCity.city, label: oneCity.city };
    });
    setCityOptions(formattedOptions);
  }, []);

  useEffect(() => {
    if (user) {
      userService
        .getUser(user._id)
        .then((response) => {
          const initialData = response.data;
          const address = initialData.contact.address;
          setUserInfo(initialData);
          if (initialData.profile_img_url) {
            setProfileImg(initialData.profile_img_url);
          }
          if (initialData.real_name) {
            setRealName(initialData.real_name);
          }
          if (initialData.artist_statement) {
            setArtistStatement(initialData.artist_statement);
          }
          if (initialData.contact.website) {
            setWebsite(initialData.contact.website);
          }
          if (initialData.contact.instagram) {
            setInstagram(initialData.contact.instagram);
          }
          if (address.street) {
            setAddressStreet(address.street);
          }
          if (address.city) {
            setAddressCity(address.city);
          }
          if (address.country) {
            setAddressCountry(address.country);
          }
          if (address.postal_code) {
            setAddressPostcode(address.postal_code);
          }
          if (address.phone_number) {
            setPhoneNumber(address.phone_number);
          }
          if (initialData.tagline) {
            setTagline(initialData.tagline);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, storedToken]);

  function handleProfileImg(e) {
    let imageToUpload = new FormData();
    imageToUpload.append("images", e.target.files[0]);

    const preview = URL.createObjectURL(e.target.files[0]);
    console.log(preview);
    setProfileImg(preview);

    setImageData(imageToUpload);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      let updatedUser = {
        real_name: realName,
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

      if (imageData.length > 0) {
        const cloudinaryResponse = await uploadService.uploadImage(imageData);

        let imageUrl = cloudinaryResponse.data.fileUrls[0];
        updatedUser.profile_img_url = imageUrl;
      }

      const updateResponse = await userService.updateUser(
        userInfo._id,
        updatedUser
      );

      console.log(updateResponse);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {userInfo && (
        <div id="EditProfilePage" className="page-wrapper mobile-dvh">
          <div className="heading-wrapper">
            <h1 className="highlight">Edit Profile</h1>
            <button
              className="back-button"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              {" "}
              {"< Back"}
            </button>
          </div>

          {isLoggedIn && userInfo && (
            <form
              className="profile edit-form edit-profile-form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="edit-profile-general-info-wrapper">
                <div className="edit-profile-img-container">
                  <div className="edit-profile-img-wrapper">
                    <img src={profileImg} alt="profile image" />
                  </div>

                  <input
                    name="profile-img"
                    className="file-input edit-profile-image-file-input"
                    type="file"
                    accept=".jpg, .png"
                    onChange={(e) => {
                      handleProfileImg(e);
                    }}
                  />
                </div>
                <div className="edit-profile-text-wrapper">
                  <label htmlFor="">Name</label>
                  <input
                    minLength={2}
                    maxLength={50}
                    className="edit-profile input"
                    name="name"
                    type="text"
                    value={realName}
                    onChange={(e) => {
                      setRealName(e.target.value);
                    }}
                  />
                  <label htmlFor="">Tagline</label>
                  <input
                    className="edit-profile input"
                    type="text"
                    value={tagline}
                    onChange={(e) => {
                      setTagline(e.target.value);
                    }}
                  />
                </div>
              </div>

              {userInfo.isArtist && (
                <div className="edit-profile-artist-info-wrapper">
                  <div className="artist-statement-wrapper">
                    <label htmlFor="" className="edit-profile-label">
                      Artist Statement:
                      <textarea
                        required
                        minLength={20}
                        maxLength={300}
                        className="edit-profile input edit-profile-textarea"
                        value={artistStatement}
                        placeholder="Write a short description of your artistic practice"
                        onChange={(e) => {
                          setArtistStatement(e.target.value);
                        }}
                      />
                    </label>
                  </div>

                  <div className="edit-profile-contact-info-wrapper">
                    <div className="edit-profile-contact-info-web-wrapper">
                      <h3 className="edit-profile-contact-info-headline">
                        Contact Information:
                      </h3>
                      <label htmlFor="">Website</label>
                      <input
                        className="edit-profile input"
                        type="url"
                        value={website}
                        onChange={(e) => {
                          setWebsite(e.target.value);
                        }}
                      />
                      <label htmlFor="">Instagram</label>
                      <input
                        className="edit-profile input"
                        type="text"
                        value={instagram}
                        onChange={(e) => {
                          setInstagram(e.target.value);
                        }}
                      />
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        className="edit-profile input"
                        minLength={6}
                        pattern="(\+49|0)[1-9][0-9]*$"
                        title="Please enter a valid German phone number"
                        name="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />
                    </div>
                    <div className="edit-profile-contact-info-address-wrapper">
                      <h3 className="edit-profile-adress-info-headline">
                        Address:
                      </h3>
                      <label htmlFor="street">Street Name / No.</label>
                      <input
                        name="street"
                        className="edit-profile input"
                        type="text"
                        minLength={5}
                        maxLength={100}
                        autoComplete="street-address"
                        value={addressStreet}
                        onChange={(e) => {
                          setAddressStreet(e.target.value);
                        }}
                      />
                      <label htmlFor="city">City</label>
                      <Select
                        name="city"
                        required
                        autoComplete="address-level2"
                        options={cityOptions}
                        onChange={handleCitiesSelectChange}
                        value={{ label: addressCity }}
                        styles={selectStles}
                      />
                      <label htmlFor="country">Country</label>
                      <Select
                        required
                        autoComplete="country"
                        options={countryOptions}
                        onChange={handleCountrySelectChange}
                        value={{ label: addressCountry }}
                        styles={selectStles}
                      />
                      <label htmlFor="postcode">Postal Code</label>
                      <input
                        className="edit-profile input"
                        type="text"
                        autoComplete="postal-code"
                        minLength={4}
                        maxLength={5}
                        value={addressPostcode}
                        onChange={(e) => {
                          setAddressPostcode(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <button className="button submit-button">
                Update
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

export default EditProfilePage;
