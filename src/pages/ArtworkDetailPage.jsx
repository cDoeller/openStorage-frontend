import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/ArtworkDetails.css";
import artworksService from "../services/artworks.services";
import userService from "../services/user.services";

function ArtworkDetailPage() {
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();
  const [artwork, setArtwork] = useState();
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    artworksService
      .getArtwork(id)
      .then((response) => {
        const oneArtwork = response.data;
        setArtwork(oneArtwork);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // * FAVORITES
  useEffect(() => {
    if (user) {
      userService
        .getFavorites(user._id)
        .then((response) => {
          setFavorites(response.data.favorites);
          return response.data.favorites;
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
          console.log(response.data.favorites);
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
          console.log(response.data.favorites);
          setFavorites(response.data.favorites);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFavorite]);

  return (
    <div className="ArtworkDetailsPage page-wrapper">
      {artwork && (
        <div className="artwork-details-wrapper">
          <h1>{artwork.title}</h1>

          <div className="artwork-details-img">
            <img
              src={artwork.images_url[0]}
              alt={artwork.title}
              style={{ width: "100%" }}
            />
            <div className="artwork-thumbnail-wrapper">
              {artwork.images_url.map((oneArtwork, index) => {
                if (index !== 0) {
                  return (
                    <div key={index} className="artwork-thumbnail">
                      <img src={oneArtwork} alt={artwork.title} />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="artwork-info">
            <p className="artwork-info-favorite" onClick={handleFavorite}>
              {isFavorite ? "★" : "☆"}
            </p>
            <div className="artwork-info-text">
              <p>{artwork.artist.real_name}</p>
              <p>{artwork.medium}</p>
              {artwork.dimensions.z ? (
                <p>
                  {artwork.dimensions.x} x {artwork.dimensions.y} x{" "}
                  {artwork.dimensions.z} cm, {artwork.year}
                </p>
              ) : (
                <p>
                  {artwork.dimensions.x} x {artwork.dimensions.y} cm,{" "}
                  {artwork.year}
                </p>
              )}
            </div>
          </div>
          {isLoggedIn && (
            <Link to={`/request/${artwork._id}`}>
              <button className="artwork-request-button">Request</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default ArtworkDetailPage;
