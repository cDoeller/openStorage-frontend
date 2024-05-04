import React from "react";
import "../styles/ArtworkCard.css";

function ArtworkCard(props) {
  const { name, title, dimensions, year, img, medium } = props;

  let medium_img = "";

  switch (medium) {
    case "Painting":
      medium_img = "/img/painting-icon.png";
      break;
    case "Photography":
      medium_img = "/img/photo-icon.png";
      break;
    case "Drawing":
      medium_img = "/img/drawing-icon.png";
      break;
    case "Sculpture":
      medium_img = "/img/sculpture-icon.png";
      break;
    case "Object":
      medium_img = "/img/object-icon.png";
      break;
    case "Installation":
      medium_img = "/img/installation-icon.png";
      break;
    case "Print":
      medium_img = "/img/print-icon.png";
      break;
    case "Collage":
      medium_img = "/img/collage-icon.png";
      break;
    case "Mixed Media":
      medium_img = "/img/mixedmedia-icon.png";
      break;
    default:
      medium_img = "/img/media.png";
  }

  return (
    <div className="artwork-card-wrapper">
      <div className="artwork-card-image-wrapper">
        <img src={img} alt="" />
      </div>
      <div className="artwork-card-info-wrapper">
        <div className="artwork-card-info-text-wrapper">
          <p className="artwork-card-info-text-text">
            {name}, {title}
          </p>
          <p className="artwork-card-info-text-text">
            {dimensions}, {year}
          </p>
        </div>
        <div className="artwork-card-icon-wrapper">
          <img src={medium_img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ArtworkCard;
