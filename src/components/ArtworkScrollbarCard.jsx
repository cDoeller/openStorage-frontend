import { Link } from "react-router-dom";
import "../styles/styles-components/ArtworksScrollbarCard.css";
import { useState, useEffect } from "react";

function ArtworkScrollbarCard(props) {
  const { title, img, heading, id } = props;

  const [linkName, setLinkName] = useState("");

  useEffect(() => {
    if (heading === "Artworks") {
      setLinkName(`/artworks/${id}`);
    } else {
      setLinkName(`/request/${id}/details`);
    }
  }, [heading, id]);

  return (
    <Link to={linkName}>
      <div className="box-shadow scrollbar-artwork-card-wrapper">
        <div className="scrollbar-artwork-card-image-wrapper">
          <img src={img[0] ? img[0] : "#"} alt={title ? title : "No Title"} />
        </div>
        <div className="scrollbar-artwork-card-info-wrapper">
          <div className="scrollbar-artwork-card-info-text-wrapper">
            <p className="scrollbar-artwork-card-info-text-text">
              {title ? title : "No Title"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArtworkScrollbarCard;
