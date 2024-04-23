import "../styles/UserProfileCard.css";

function UserProfileCard(props) {
  const { img, name, isArtist, city, tagline } = props;

  return (
    <div className="profile-card">
      <div className="profile-img-wrapper">
        <img src={img} alt={`${name} Profile`} />
      </div>
      <div className="profile-info">
        {isArtist ? (
          <p className="profile-type">Artist</p>
        ) : (
          <p className="profile-type">Art-Lover</p>
        )}
        <p>
          <span className="username-bold">{name}</span> | {city}
        </p>
        <p>{tagline}</p>
      </div>
    </div>
  );
}

export default UserProfileCard;
