import PostBlog from "./profilePageContent/blog";
import ProfileListings from "./profilePageContent/listings";
import ProfileOrders from "./profilePageContent/orders";
import Affiliate from "./profilePageContent/affiliate";

export default function ProfileContent({ profilePageState }) {
  return (
    <>
      {profilePageState == "Listings" && (
        <ProfileListings profilePageState={profilePageState} />
      )}
      {profilePageState == "Orders" && (
        <ProfileOrders profilePageState={profilePageState} />
      )}
      {profilePageState == "Blog" && (
        <PostBlog profilePageState={profilePageState} />
      )}
      {profilePageState == "Affiliate" && (
        <Affiliate profilePageState={profilePageState} />
      )}
    </>
  );
}
