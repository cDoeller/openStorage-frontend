import { Link } from "react-router-dom";
import "../styles/ArtworksScrollbarCard.css"
import { useState, useEffect } from "react";

function ArtworkScrollbarCard(props) {

    const {title, img, heading, id} = props

    const [linkName, setLinkName] = useState("")

    useEffect(()=>{
        if(heading==="Artworks"){
            setLinkName("artworks")
        }
        else{
            setLinkName("request")
        }
    }, [heading])

  return (
    <>
        <Link to={`/${linkName}/${id}`}>
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
    </>
  )
}

export default ArtworkScrollbarCard