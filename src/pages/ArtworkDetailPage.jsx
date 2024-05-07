import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/styles-pages/ArtworkDetails.css";
import artworksService from "../services/artworks.services";
import userService from "../services/user.services";

function ArtworkDetailPage() {
  const [currentImage, setCurrentImage] = useState(
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
  );
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRentals, setUserRentals] = useState(null);

  const { id } = useParams();
  const [artwork, setArtwork] = useState();
  const { user, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    artworksService
      .getArtwork(id)
      .then((response) => {
        const oneArtwork = response.data;
        setArtwork(oneArtwork);
        setCurrentImage(oneArtwork.images_url[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (user) {
      userService
        .getAllRentalsUser(user._id)
        .then((response) => {
          console.log(id);
          // console.log(response.data.rentals.rentals_receiving);
          // setUserRentals(response.data.rentals.rentals_receiving);
          return response.data.rentals.rentals_receiving;
        })
        .then((response) => {
          const rentalArtworksIds = response.map((oneRental) => {
            return { artwork_id: oneRental.artwork, state: oneRental.state };
          });
          console.log(rentalArtworksIds);
          setUserRentals(rentalArtworksIds);
        })
        .catch((err) => console.log(err));
    }
  }, [user, id]);

  // * REQUEST BUTTON RENDER
  function handleRequestButtonRender() {
    if (user && artwork && userRentals) {
      if (user._id === artwork.artist._id) return editButtonElement;
      if (checkIdMatching()) {
        if (artwork.is_borrowed) return rentingWorkElement;
        return requestedWorkElement;
      }
      if (artwork.is_borrowed) return notAvailableElement;
      return requestButtonElement;
    }
  }

  function checkIdMatching() {
    let matching = false;
    userRentals.forEach((rental) => {
      if (rental.artwork_id === id) {
        matching = true;
      }
    });
    return matching;
  }

  const signUpButtonElement = (
    <p className="artwork-details-request-message">
      {" "}
      <Link to="/signup">Sign up</Link> / <Link to="/login">log in</Link> for more functionality.
    </p>
  );

  const notAvailableElement = (
    <p className="artwork-details-request-message">Currently Not Available</p>
  );

  const requestedWorkElement = (
    <p className="artwork-details-request-message">Currently Requested</p>
  );

  const rentingWorkElement = (
    <p className="artwork-details-request-message">Currently Renting</p>
  );

  let requestButtonElement = <></>;
  if (artwork) {
    requestButtonElement = (
      <Link to={`/artworks/${artwork._id}/request`}>
        <button className="artwork-details-request-button button">
          Request
        </button>
      </Link>
    );
  }

  let editButtonElement = <></>;
  if (artwork) {
    editButtonElement = (
      <Link to={`/profile/edit-artwork/${artwork._id}`}>
        <button className="artwork-details-request-button button">Edit</button>
      </Link>
    );
  }

  // * FAVORITES
  useEffect(() => {
    if (user) {
      userService
        .getFavorites(user._id)
        .then((response) => {
          const favoritesArtworkIds = response.data.favorites.map((artwork) => {
            return artwork._id;
          });
          setFavorites(favoritesArtworkIds);
          return favoritesArtworkIds;
        })
        .then((response) => {
          if (!artwork) return;
          if (response.includes(artwork._id)) {
            setIsFavorite(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user, artwork]);

  function handleFavorite() {
    setIsFavorite(!isFavorite);
  }

  // check if clicked and inside & add or remove (using patch)
  useEffect(() => {
    if (!favorites || !artwork || !user) return;
    if (isFavorite && !favorites.includes(artwork._id)) {
      // add artwork to favorites
      const updateAddFav = [...favorites, artwork._id];
      userService
        .updateFavorites(user._id, updateAddFav)
        .then((response) => {
          setFavorites(response.data.favorites);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!isFavorite && favorites.includes(artwork._id)) {
      // remove artwork from fav
      const updateRemoveFav = favorites.filter((fav) => {
        return fav !== artwork._id;
      });
      userService
        .updateFavorites(user._id, updateRemoveFav)
        .then((response) => {
          setFavorites(response.data.favorites);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFavorite]);

  // * IMAGE GALLERY
  function handleImageClick(imageUrl) {
    setCurrentImage(imageUrl);
  }

  return (
    <div className="page-wrapper mobile-dvh-general flex-column">
      {artwork && (
        <div className="artwork-details-buttons-wrapper">
          <div className="artwork-details-wrapper">
            {/* BACK BUTTON */}
            {/* <div className="artwork-details-back-wrapper">
            <button
              className="back-button"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              {"< Back"}
            </button>
          </div> */}
            {/* ARTWORK IMAGES */}
            <div className="artwork-details-images-wrapper">
              <div className="artwork-details-images-main">
                <img
                  src={currentImage}
                  alt={artwork.title}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="artwork-details-thumbnail-wrapper">
                {artwork.images_url.map((oneArtwork, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        handleImageClick(oneArtwork);
                        // console.log(oneArtwork)
                      }}
                      className="artwork-details-thumbnail"
                    >
                      <img src={oneArtwork} alt={artwork.title} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ARTWORK INFO */}

            <div className="artwork-details-info-wrapper">
              <div className="artwork-details-info-wrapper-top">
                <h3 className="artwork-details-title">{artwork.title}</h3>
                {isLoggedIn && (
                  <p
                    className="artwork-details-info-favorite"
                    onClick={handleFavorite}
                  >
                    {isFavorite ? "★" : "☆"}
                  </p>
                )}
                <p className="artwork-details-info-text">
                  {artwork.artist.real_name}
                </p>
              </div>
              <div className="artwork-details-info-wrapper-bottom">
                <p className="artwork-details-info-text">
                  {artwork.medium}, {artwork.genre}
                </p>
                {artwork.dimensions.z ? (
                  <p className="artwork-details-info-text">
                    {artwork.dimensions.x} x {artwork.dimensions.y} x{" "}
                    {artwork.dimensions.z} cm, {artwork.year}
                  </p>
                ) : (
                  <p className="artwork-details-info-text">
                    {artwork.dimensions.x} x {artwork.dimensions.y} cm,{" "}
                    {artwork.year}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* ARTWORK BUTTON BOTTOM */}
          {isLoggedIn && handleRequestButtonRender()}
          {!isLoggedIn && signUpButtonElement}
        </div>
      )}
    </div>
  );
}

export default ArtworkDetailPage;
