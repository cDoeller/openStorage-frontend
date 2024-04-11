import React from "react";
import "../styles/ArtworkCard.css";

function ArtworkCard(props) {
  const { name, title, dimensions, year, img, medium } = props;

  let medium_img = "";

  switch (medium) {
    case "Painting":
      medium_img = "../../public/img/painting-icon.png";
      break;
    case "Photography":
      medium_img = "../../public/img/photo-icon.png";
      break;
      default:
        medium_img = "../../public/img/photo-icon.png";
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
