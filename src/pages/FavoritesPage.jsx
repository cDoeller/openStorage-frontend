import React, { useState, useContext, useEffect } from "react";
import {Link} from "react-router-dom"
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

  return (
    <div className="page-wrapper mobile-dvh">
      <div className="favorites-wrapper">
        {favorites &&
          favorites.map((artwork) => {
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
    </div>
  );
}

export default FavoritesPage;
