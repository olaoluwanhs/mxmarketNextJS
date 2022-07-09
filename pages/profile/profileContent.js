import PostBlog from "./profilePageContent/blog";
import ProfileListings from "./profilePageContent/listings";
import ProfileOrders from "./profilePageContent/orders";
import Affiliate from "./profilePageContent/affiliate";

export default function ProfileContent({ profilePageState, profile }) {
  return (
    <>
      {profilePageState == "Listings" && (
        <ProfileListings
          profilePageState={profilePageState}
          profile={profile}
        />
      )}
      {profilePageState == "Orders" && (
        <ProfileOrders profilePageState={profilePageState} profile={profile} />
      )}
      {profilePageState == "Blog" && (
        <PostBlog profilePageState={profilePageState} profile={profile} />
      )}
      {profilePageState == "Affiliate" && (
        <Affiliate profilePageState={profilePageState} profile={profile} />
      )}
    </>
  );
}
