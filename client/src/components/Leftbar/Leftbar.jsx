import "./Leftbar.scss";

export default function Leftbar({ profile }) {
    const HomeLeftbar = () => {
      return (
        <>
          <div className="birthdayContainer">
            <img className="birthdayImg" src="assets/gift.png" alt="" />
            <span className="birthdayText">
              <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
            </span>
          </div>
          <img className="leftbarAd" src="assets/ad.png" alt="" />
          <h4 className="leftbarTitle">Online Friends</h4>
          <ul className="leftbarFriendList">
           {/*  {Users.map((u) => (
              <Online key={u.id} user={u} />
            ))} */}
          </ul>
        </>
      );
    };
  
    const ProfileLeftbar = () => {
      return (
        <>
          
          
        </>
      );
    };
    return (
      <div className="leftbar">
        <div className="leftbarWrapper">
          {profile ? <ProfileLeftbar /> : <HomeLeftbar />}
        </div>
      </div>
    );
  }