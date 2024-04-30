import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "../styles/ArtworksScrollbar.css";
import ArtworkScrollbarCard from "./ArtworkScrollbarCard";
import { AuthContext } from "../context/auth.context";

function ArtworksScrollbar(props) {
  const { user, isLoggedIn } = useContext(AuthContext);

  const { userInfo, heading, contents } = props;

  const [artworksArray, setArtworksArray] = useState([])

  useEffect(()=>{
    let filteredContents = contents.filter((element)=>{
      if(heading==="Artworks"){
        console.log(element)
        return element
      }
      if(heading==="Current Rentals" || heading === "Pending Requests"){
        console.log("rentals", element)
        if(element.status === "accepted"){
          console.log("rented: ", element)
          return element.artwork
        }
        if(element.status === "pending"){
          console.log("pending: ", element)
          return element.artwork
        }
      }

    })
    console.log(heading, filteredContents)
    setArtworksArray(filteredContents)


  }, [heading, contents])

  return (
    <div className="artworks-scrollbar-container">
      <div className="artworks-scrollbar-heading">
        <p className="scrollbar-heading">{heading}</p>
        {heading === "Artworks" && isLoggedIn &&  (
          <Link className="create-artwork-link" to={`/artworks/create-artwork`}>
            <div className="create-artwork-button">
            <p>+</p>
            </div>
          </Link>
        )}
      </div>
      <div className="profile-artworks-scrollbar">
        {artworksArray &&
          artworksArray.map((oneArtwork, index) => {
            return (
              <div key={index} className="profile-artwork-card-wrapper">
                <ArtworkScrollbarCard
                heading = {heading}
                  title={oneArtwork.title}
                  id={oneArtwork._id}
                  img={oneArtwork.images_url[0]}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ArtworksScrollbar;
