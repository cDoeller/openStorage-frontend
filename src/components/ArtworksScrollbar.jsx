import { useEffect, useState } from "react";
import "../styles/ArtworksScrollbar.css";
import ArtworkScrollbarCard from "./ArtworkScrollbarCard";
import rentalsService from "../services/rentals.services";
import artworksService from "../services/artworks.services";

function ArtworksScrollbar(props) {
  const { userInfo, heading, contents } = props;

  const [rentedArtworks, setRentedArtworks] = useState();

  useEffect(() => {
    if (heading === "Artworks") {
      console.log("Artwork contents", contents);
    }
    if (heading !== "Artworks") {
      console.log("Contents", contents);


    }
  }, [contents, heading]);

  if (heading === "Artworks") {
    return (
      <div className="artworks-section-rpofile">
        <h5>{heading}</h5>
        <div className="profile-artworks-scrollbar"></div>
        {contents.map((oneArtwork, index) => {
          <div key={index} className="profile-artwork-card-wrapper">
            <ArtworkScrollbarCard
              title={oneArtwork.title}
              id={oneArtwork._id}
              img={oneArtwork.images_url[0]}
            />
          </div>;
        })}
      </div>
    );
  } else {
    return (
      <div className="artworks-section-rpofile">
        <h5>{heading}</h5>
        <div className="profile-artworks-scrollbar"></div>
        {contents && contents.map((oneRental, index) => {
          {
            console.log(oneRental);
          }
          return (
            <div key={index} className="profile-artwork-card-wrapper">
              <ArtworkScrollbarCard
                title={oneRental.title}
                id={oneRental._id}
                img={oneRental.images_url[0]}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArtworksScrollbar;
