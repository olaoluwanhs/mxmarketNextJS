import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navBar";
import checkUser from "../../context/checkUser";
import { LoggedInContext } from "../../context/loggedInContext";
import ProfileContent from "./profileContent";

export function checkLocation(input) {
  switch (input) {
    case "GK":
      return "Gidankwano";
      break;
    case "BS":
      return "Bosso";
      break;
    case "within-minna":
      return "Other places within Minna";
      break;
    case "outside-minna":
      return "Other places outside Minna";
      break;

    default:
      break;
  }
}

export default function profile({ message, profile }) {
  //Check if there is a logged In user
  // Logged in context
  let { setLoggedInState, loggedInState } = useContext(LoggedInContext);
  // Profile page state management
  let [profilePageState, setProfilePageState] = useState("Listings");
  //
  function handleSetState(state, e) {
    setProfilePageState(state);
    document
      .querySelectorAll("[class='btn-orange btn btn-md']")
      .forEach((el) => {
        el.className = "btn-purple btn btn-md";
      });
    e.target.className = "btn-orange btn btn-md";
  }
  //
  useEffect(async () => {
    //This is where you are. you need to send cookies with useeffect
    // console.log(profile);
    setLoggedInState(await checkUser());
  }, []);

  // Develop Profile page
  return (
    <>
      <Navbar />
      {/* Profile header content */}
      <div className="patternBg profile-header mt-2">
        <div className="bg-dark-overlay full-width-container d-flex align-items-center justify-content-evenly px-2">
          {/* Profile picture */}
          <div className="profile-image shadow-lg">
            {/* {console.log(typeof profile)} */}
            <img
              src={`${profile.image ? `${profile.image}` : "/unsplash.jpg"}`}
              alt="profile-img"
            />
          </div>
          {/* Profile details */}
          <div className="profile-details d-flex flex-column justify-content-center">
            <div className="text-light">
              <h2>
                {profile.first_name} {profile.last_name}
              </h2>
            </div>
            <div className="text-light">
              <i className="fa fa-solid fa-user mx-3"></i>
              <span>{profile.user_name}</span>
            </div>
            <div className="text-light">
              <i className="fa fa-solid fa-envelope mx-3"></i>
              <span>{profile.email}</span>
            </div>
            <div className="text-light">
              <i className="fa fa-solid fa-phone mx-3"></i>
              <a href="" className="text-light">
                {profile.phone_number}
              </a>
              <br />
              <i className="fab fa-whatsapp fa-lg mx-3"></i>
              <a href="" className="text-light">
                {profile.whatsapp}
              </a>
            </div>
            <div className="text-light">
              <i className="fa fa-lg fa-map-marker-alt mx-3"></i>
              <span>{checkLocation(profile.location)}</span>
            </div>
            {message == "request-owns-profile" && (
              <div className="text-light">
                <i className="fas fa-lg fa-money-bill-wave mx-3"></i>
                <span>
                  <strike>N</strike>
                  {profile.wallet}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Profile section buttons*/}
      {/*  */}

      <div className="bg-light p-2 sticky-header d-flex align-items-center justify-content-evenly shadow-lg">
        <span
          onClick={(e) => handleSetState("Listings", e)}
          className="btn-orange btn btn-md"
        >
          Listings
        </span>
        {/* {console.log(message)} */}
        {message == "request-owns-profile" && (
          <span
            onClick={(e) => handleSetState("Orders", e)}
            className="btn-purple btn btn-md"
          >
            Orders
          </span>
        )}
        {loggedInState.loggedIn == true &&
          loggedInState.user.userType == "admin" &&
          loggedInState.user.id == profile.id && (
            <>
              <span
                onClick={(e) => handleSetState("Blog", e)}
                className="btn-purple btn btn-md"
              >
                Blog
              </span>
              <span
                onClick={(e) => handleSetState("Affiliate", e)}
                className="btn-purple btn btn-md"
              >
                Affiliate
              </span>
            </>
          )}
      </div>

      {/*  */}
      {/* Profile Section */}
      <ProfileContent profilePageState={profilePageState} profile={profile} />
    </>
  );
}

// Get server side information used to render the profile page
export async function getServerSideProps({ params, req }) {
  // console.log(req.headers.cookie);
  let res = await fetch(
    "http://localhost:4000/profile/?" +
      new URLSearchParams({ user_name: params.username }),
    {
      method: "get",
      credentials: "include",
      headers: {
        Cookie: req.headers.cookie,
      },
    }
  );
  let userInfo = await res.json();

  // console.log(userInfo);
  return { props: userInfo };
}
