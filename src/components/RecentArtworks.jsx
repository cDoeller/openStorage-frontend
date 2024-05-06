import React from "react";
import "../styles/styles-components/RecentArtworks.css";
import ArtworkCardRecent from "./ArtworkCardRecent";
import { Link } from "react-router-dom";

function RecentArtworks(props) {
  const { artworks } = props;

  return (
    <div className="recent-section-gallery-wrapper">
      {artworks &&
        artworks.map((artwork) => {
          return (
            <Link to={`/artworks/${artwork._id}`} key={artwork._id}>
              <ArtworkCardRecent
                img={artwork.images_url[0]}
                name={artwork.artist.real_name}
                title={artwork.title}
                year={artwork.year}
                medium={artwork.medium}
              ></ArtworkCardRecent>
            </Link>
          );
        })}
    </div>
  );
}

export default RecentArtworks;
