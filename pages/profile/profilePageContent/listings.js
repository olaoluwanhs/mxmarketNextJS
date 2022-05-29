import { useState } from "react";
import { ProfileProductListing } from "../../../components/ProductListing";

export default function ProfileListings({ profilePageState }) {
  //
  const [createdListingsArray, setCreatedListingsArray] = useState([]);
  return (
    <>
      <div style={{ height: "200vh" }}>
        <h1>{profilePageState}</h1>
        <ProfileProductListing />
      </div>
    </>
  );
}
