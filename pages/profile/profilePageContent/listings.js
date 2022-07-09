import { Pagination } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { ProfileProductListing } from "../../../components/ProductListing";
import { LoggedInContext } from "../../../context/loggedInContext";

export default function ProfileListings({ profilePageSate, profile }) {
  //
  const { loggedInState } = useContext(LoggedInContext);
  const [createdListingsArray, setCreatedListingsArray] = useState({
    result: [],
  });
  const [paginationCount, setPaginationCount] = useState(1);
  const [reRenderState, setReRenderState] = useState({ state: "state" });
  //
  useEffect(async () => {
    const result = await (
      await fetch(
        `http://localhost:4000/userListings/?user=${profile.user_name}`,
        { method: "get", credentials: "include" }
      )
    ).json();
    setCreatedListingsArray(result);
  }, [loggedInState, reRenderState]);
  useEffect(() => {}, [createdListingsArray]);

  return (
    <>
      <div>
        <ProfileProductListing
          productArray={createdListingsArray}
          setReRenderState={setReRenderState}
        />
        <Pagination
          count={paginationCount}
          boundaryCount={2}
          color={"secondary"}
        />
      </div>
    </>
  );
}
