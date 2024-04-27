import React from "react";
import "../styles/ArtworkCardFavorites.css";

function ArtworkCardFavorites(props) {
  const { img, name, title, year, medium } = props;
  return (
    <div className="favorites-card-wrapper">
      <div className="favorites-card-img-wrapper">
        <img src={img} alt="" />
      </div>
      <div className="favorites-card-info-wrapper">
        <div className="favorites-card-info-text-wrapper">
          <p className="favorites-card-info-text-text">{name}</p>
          <p className="favorites-card-info-text-text">{title}, {year}</p>
          <p className="favorites-card-info-text-text">{medium}</p>
        </div>
      </div>
    </div>
  );
}

export default ArtworkCardFavorites;
