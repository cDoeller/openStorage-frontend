import "../styles/ArtworksScrollbar.css"
import ArtworkScrollbarCard from "./ArtworkScrollbarCard";

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
          <ArtworkScrollbarCard
          title = {oneArtwork.title}
          id={oneArtwork._id}
          img = {oneArtwork.images_url[0]}
           />
                  </div>)
        }
        if(heading==="Current Rentals") {
          return (
          <div key={index} className="profile-artwork-card-wrapper">
           <ArtworkScrollbarCard 
            title= {oneArtwork.title}
            id = {oneArtwork.id}
            img = {oneArtwork.images_url[0]}
           />
          </div>
                  
        )}
      })}

    </div>
  </div>
  )
}

export default ArtworksScrollbar