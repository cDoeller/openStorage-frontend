import React, { useEffect, useState } from "react";
import "../styles/ArtworksPage.css";
import axios from "axios";
import ArtworkCard from "../components/ArtworkCard";

function ArtworksPage() {
  const [artworks, setArtworks] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/artworks`)
      .then((response) => {
        console.log(response.data);
        setArtworks(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="artworks-artwork-cards">
      {artworks &&
        artworks.map((artwork) => {
          return (
            <ArtworkCard
              key={artwork._id}
              name={artwork.artist.user_name}
              title={artwork.title}
              dimensions={
                artwork.dimensions.x +
                " x " +
                artwork.dimensions.y +
                (artwork.dimensions.z ? " x " + artwork.dimensions.z : "")
              }
              year={artwork.year}
              img={artwork.images_url[0]}
              medium={artwork.medium}
            />
          );
        })}
    </div>
  );
}

export default ArtworksPage;
