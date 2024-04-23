import { Link } from "react-router-dom";
import "../styles/ArtworksScrollbar.css"

function ArtworkScrollbarCard(props) {

    const {title, img, heading, id} = props

  return (
    <div>
        <Link to={`/artworks/${id}`}>
            <div className="profile-artwork-card-image-wrapper">
              <img
                src={img}
                alt={title}
              />
            </div>
            <div className="profile-artwork-card-info-wrapper">
              <div className="profile-artwork-card-info-text-wrapper">
                <p className="profile-artwork-card-info-text-text">
                  {title}
                </p>
              </div>
              <div className="artwork-card-icon-wrapper">
                <img src="" alt="" />
              </div>
            </div>
                  </Link>
    </div>
  )
}

export default ArtworkScrollbarCard