import React, { useEffect, useState } from "react";
import "../styles/styles-components/ArtworkCardFavorites.css";

function ArtworkCardFavorites(props) {
  const { img, name, title, year, medium } = props;
  const [longTitle, setLongTitle] = useState(false);

  useEffect(() => {
    if (title.length > 30) setLongTitle(true);
  }, [title]);

  return (
    <div className="favorites-card-wrapper box-shadow">
      <div className="favorites-card-img-wrapper">
        <img src={img} alt="" />
      </div>
      <div className="favorites-card-info-wrapper">
        <div className="favorites-card-info-text-wrapper">
          <p className="favorites-card-info-text-text favorites-card-info-name">
            {name}
          </p>
          <p className="favorites-card-info-text-text favorites-card-info-title">
            {" "}
            <i> {longTitle ? title.slice(0,30)+"..." : title}</i>
          </p>
          <p className="favorites-card-info-text-text">
            {medium}, {year}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArtworkCardFavorites;
