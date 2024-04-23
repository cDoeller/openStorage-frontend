import { Link } from "react-router-dom";
import { useContext } from "react";
import "../styles/ArtworksScrollbar.css";
import ArtworkScrollbarCard from "./ArtworkScrollbarCard";
import { AuthContext } from "../context/auth.context";

function ArtworksScrollbar(props) {
  const { user, isLoggedIn } = useContext(AuthContext);

  const { userInfo, heading, contents } = props;

  return (
    <div className="artworks-scrollbar-container">
      <div className="artworks-scrollbar-heading">
        <p className="scrollbar-heading">{heading}</p>
        {heading === "Artworks" && isLoggedIn && (
          <Link className="create-artwork-link" to={`/artworks/create-artwork`}>
            <div className="create-artwork-button">
            <p>+</p>
            </div>
          </Link>
        )}
      </div>
      <div className="profile-artworks-scrollbar">
        {contents &&
          contents.map((oneRental, index) => {
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
    </div>
  );
}

export default ArtworksScrollbar;
