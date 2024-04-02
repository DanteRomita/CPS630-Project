function UserProfile({ user }) {
    return (
      <div className="user-profile">
        <img src={user.picture} alt={`${user.given_name}'s profile pic`} className="profile-pic" />
        <div className="user-name">{user.given_name} {user.family_name}</div>
      </div>
    );
  }

export default UserProfile;