import React from "react";

function RecentArtworks(props) {
  const { artwork } = props;
  return (
    <div className="landing-artworks-section-gallery-card"> 
      <div className="landing-artworks-section-gallery-image-wrapper">
        <img
          src={artwork.images_url[0]}
          alt=""
          className="landing-artworks-section-gallery-image-img"
        />
      </div>
      <div className="landing-artworks-section-gallery-caption-wrapper">
        <p className="landing-artworks-section-gallery-caption-left">{`<`}</p>
        <div className="landing-artworks-section-gallery-caption-data-wrapper">
          <p className="landing-artworks-section-gallery-caption-text">
            {artwork.artist.user_name + ", " + artwork.medium}
          </p>
          <p className="landing-artworks-section-gallery-caption-text">
            {artwork.dimensions.x +
              " x " +
              artwork.dimensions.y +
              (artwork.dimensions.z ? " x " + artwork.dimensions.z : "") +
              " cm" +
              ", " +
              artwork.year}
          </p>
        </div>
        <p className="landing-artworks-section-gallery-caption-right">{`>`}</p>
      </div>
    </div>
  );
}

export default RecentArtworks;
