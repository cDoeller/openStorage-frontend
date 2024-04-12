import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ArtworksPage.css";
import axios from "axios";
import ArtworkCard from "../components/ArtworkCard";

function ArtworksPage() {
  const [artworks, setArtworks] = useState(null);
  const [filterClicked, setFilterClicked] = useState(false);

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
    <>
      {/* FILTER INTERFACE */}
      

      {/* PAYMENT INFORMATION */}
      <div className="artworks-paymentinfo-wrapper">
        <div className="artworks-paymentinfo-icon-wrapper">
          <img src="/img/handshake.png" alt="" />
        </div>
        <p className="artworks-paymentinfo-text">
          Our rental fees are fixed: no matter how famous, large or colourful,
          you pay €15 / month for each work of art!
        </p>
      </div>

      {/* FILTER INTERFACE BUTTON */}
      <div className="artworks-filterinterfacebutton-wrapper">
        <div className="artworks-filterinterfacebutton-wrapper-inner">
          <div className="artworks-filterinterfacebutton-icon-wrapper">
            <img src="/img/filter.png" alt="" />
          </div>
        </div>
      </div>

      {/* ARTWORKS CARDS */}
      <div className="artworks-artwork-cards">
        {artworks &&
          artworks.map((artwork) => {
            return (
              <Link to={`/artworks/${artwork._id}`} key={artwork._id}>
                <ArtworkCard
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
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default ArtworksPage;
