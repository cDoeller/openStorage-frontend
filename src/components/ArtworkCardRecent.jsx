import React from "react";
import "../styles/styles-components/ArtworkCardRecent.css";

function ArtworkCardRecent(props) {
  const { img, name, title, year, medium } = props;

  return (
    <div>
      <div className="recent-card">
        <div className="recent-card-image-wrapper">
          <img src={img} alt="" className="recent-card-image-img" />
        </div>
        <div className="recent-card-caption-info-wrapper">
          <p className="recent-card-caption-text">{name}</p>
          <p className="recent-card-caption-text">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default ArtworkCardRecent;
