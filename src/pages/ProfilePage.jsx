import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/styles-pages/Profile.css";
import userService from "../services/user.services";
import ArtworksScrollbar from "../components/ArtworksScrollbar";
import UserProfileCard from "../components/UserProfileCard";

function ProfilePage() {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);
  const [isOfferingRental, setIsOfferingRental] = useState(false);
  const [isReceivingRequest, setIsReceivingRequest] = useState(false);
  const [isRequestingRental, setIsRequestingRental] = useState(false);
  const [isReceivingRental, setIsReceivingRental] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (user) {
      userService
        .getUser(user._id)
        .then((fetchedData) => {
          // console.log(userInfo);
          setUserInfo(fetchedData.data);
          return fetchedData.data.rentals;
        })
        .then((result) => {
          // console.log(result);
          renderScrollbars(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, storedToken]);

  // set the scrollbar conditional rendering
  function renderScrollbars(result) {
    if (result.rentals_offering.length > 0) {
      result.rentals_offering.forEach((offeredRental) => {
        switch (offeredRental.state) {
          case "accepted":
            setIsOfferingRental(true);
            break;
          case "pending":
            setIsReceivingRequest(true);
            break;
        }
      });
    }
    if (result.rentals_receiving.length > 0) {
      result.rentals_receiving.forEach((requestedRental) => {
        switch (requestedRental.state) {
          case "accepted":
            setIsReceivingRental(true);
            break;
          case "pending":
            setIsRequestingRental(true);
            break;
        }
      });
    }
  }

  return (
    <div className="page-wrapper mobile-dvh">
      {userInfo && (
        <div className="profile-wrapper">
          <h1 className="highlight">Your Profile</h1>
          {/* PROFILE CARD */}
          <div className="profile-profilecard-wrapper">
            <div className="profile-edit-link">
              <Link to="/profile/edit-profile">Edit</Link>
            </div>
            <UserProfileCard
              name={
                userInfo.real_name ? userInfo.real_name : userInfo.user_name
              }
              img={userInfo.profile_img_url}
              isArtist={userInfo.isArtist}
              city={userInfo.contact.address.city ? userInfo.contact.address.city : ""}
              tagline={userInfo.tagline ? userInfo.tagline : ""}
            />
          </div>

          {/* ARTIST DASHBOARD */}
          {userInfo.isArtist && (
            <>
              <div className="profile-artist-wrapper">
                <div className="profile-artist-statement-wrapper">
                  <h3 className="profile-artist-statement-statement-headline">
                    Artist Statement
                  </h3>
                  <p className="profile-artist-statement-statement-statement">
                    {userInfo.artist_statement}
                  </p>
                </div>

                {/* ARTWORKS */}
                <ArtworksScrollbar
                  userInfo={userInfo}
                  contents={userInfo.artworks}
                  heading={"Artworks"}
                ></ArtworksScrollbar>
              </div>

              {/* MANAGE PORTFOLIO */}

              {(isReceivingRequest || isOfferingRental) && (
                <>
                  <div className="profile-outgoing-wrapper">
                    <h3 className="profile-section-headline">Manage Rentals</h3>
                    {/* incoming pending requests */}
                    {isReceivingRequest && (
                      <>
                        <ArtworksScrollbar
                          userInfo={userInfo}
                          contents={userInfo.rentals.rentals_offering}
                          heading={"Pending Requests"}
                        />
                      </>
                    )}
                    {/* offered rentals */}
                    {isOfferingRental && (
                      <>
                        <ArtworksScrollbar
                          userInfo={userInfo}
                          contents={userInfo.rentals.rentals_offering}
                          heading={"Current Rentals"}
                        />
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {/* NORMAL USER DASHBOARD */}
          {(isRequestingRental || isReceivingRental) && (
            <div className="profile-incoming-wrapper">
              <h3 className="profile-section-headline">Your Activities</h3>
              {/* outgoing pending requests */}
              {isRequestingRental && (
                <>
                  <ArtworksScrollbar
                    userInfo={userInfo}
                    contents={userInfo.rentals.rentals_receiving}
                    heading={"Pending Requests"}
                  />
                </>
              )}
              {/* receiving rentals */}
              {isReceivingRental && (
                <>
                  {/* {console.log("user info rentals: ", userInfo.rentals)} */}
                  <ArtworksScrollbar
                    userInfo={userInfo}
                    contents={userInfo.rentals.rentals_receiving}
                    heading={"Current Rentals"}
                  />
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
