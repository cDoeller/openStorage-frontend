import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../styles/ArtworkDetails.css";
import artworksService from "../services/artworks.services";

function ArtworkDetailPage() {
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

  function handleFavorite() {
    setIsFavorite(!isFavorite);

    if (isFavorite) {
      // PUSH TO FAVORITES
    } else {
      // CHECK IF IN FAV
      // IF YES REMOVE FROM FAV
    }
  }

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
