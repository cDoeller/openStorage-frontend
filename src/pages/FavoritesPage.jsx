import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/styles-pages/FavoritesPage.css";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.services";
import ArtworkCardFavorites from "../components/ArtworkCardFavorites";

function FavoritesPage() {
  const [favorites, setFavorites] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    userService
      .getFavorites(user._id)
      .then((response) => {
        console.log(response.data.favorites);
        setFavorites(response.data.favorites);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const noFavoritesElement = (
    <>
      <div className="favorites-none-wrapper">
        <div className="favorites-none-inner">
          <div className="favorites-none-icon-wrapper">
            <img src="/img/star-icon.png" alt="" />
          </div>
          <h3 className="favorites-none-text">No Favorites Selected</h3>
        </div>
      </div>
    </>
  );

  return (
    <div className="page-wrapper mobile-dvh">
      {favorites && favorites.length === 0 && noFavoritesElement}
      {favorites && favorites.length > 0 && (
        <div className="favorites-wrapper">
          {favorites.map((artwork) => {
            return (
              <Link to={`/artworks/${artwork._id}`} key={artwork._id}>
                <ArtworkCardFavorites
                  img={artwork.images_url[0]}
                  name={artwork.artist.real_name}
                  title={artwork.title}
                  year={artwork.year}
                  medium={artwork.medium}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
