import "../styles/ArtworksScrollbar.css"
import { Link } from "react-router-dom";

function ArtworksScrollbar(props) {

    const {userInfo, heading} = props



  return (
    <div className="artworks-section-profile">
    <h5>{heading}</h5>
    <div className="profile-artworks-scrollbar">
    {userInfo &&
      userInfo.artworks.map((oneArtwork, index) => {
        if(heading==="Artworks"){
          return (<div key={index} className="profile-artwork-card-wrapper">
          <Link to={`/profile/edit-artwork/${oneArtwork._id}`}>
            <div className="profile-artwork-card-image-wrapper">
              <img
                src={oneArtwork.images_url[0]}
                alt={oneArtwork.title}
              />
            </div>
            <div className="profile-artwork-card-info-wrapper">
              <div className="profile-artwork-card-info-text-wrapper">
                <p className="profile-artwork-card-info-text-text">
                  {oneArtwork.title}
                </p>
              </div>
              <div className="artwork-card-icon-wrapper">
                <img src="" alt="" />
              </div>
            </div>
                  </Link>
                  </div>)
        }
        else {return (
          <div key={index} className="profile-artwork-card-wrapper">
            <div className="profile-artwork-card-image-wrapper">
              <img
                src={oneArtwork.images_url[0]}
                alt={oneArtwork.title}
              />
            </div>
            <div className="profile-artwork-card-info-wrapper">
              <div className="profile-artwork-card-info-text-wrapper">
                <p className="profile-artwork-card-info-text-text">
                  {oneArtwork.title}
                </p>
              </div>
              <div className="artwork-card-icon-wrapper">
                <img src="" alt="" />
              </div>
            </div>
          </div>
                  
        )}
      })}

    </div>
  </div>
  )
}

export default ArtworksScrollbar