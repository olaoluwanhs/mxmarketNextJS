import { Fragment, useContext, useEffect } from "react";
import checkUser from "../context/checkUser";
import { LoggedInContext } from "../context/loggedInContext";
import { lisitingFormParams } from "../pages/profile/createListing";
import ListingForm1 from "./listingForms/listingForm1";
import ListingForm2 from "./listingForms/listingForm2";
import Router from "next/router";

export default function NewListing() {
  let { listingPostObj, setListingPostObj, formState, setFormState } =
    useContext(lisitingFormParams);
  let ListingFormValues = useContext(lisitingFormParams);
  let { loggedInState, setLoggedInState } = useContext(LoggedInContext);
  //
  useEffect(() => {
    setLoggedInState(checkUser());
    // console.log(loggedInState);
    if (loggedInState.user.user_id == undefined) {
      Router.replace("/");
    }
  }, [formState]);
  //

  switch (formState) {
    case 1:
      return (
        <ListingForm1
          listingPostObj={listingPostObj}
          setFormState={setFormState}
          setListingPostObj={setListingPostObj}
        />
      );
      break;
    case 2:
      return (
        <ListingForm2
          listingPostObj={listingPostObj}
          setFormState={setFormState}
          setListingPostObj={setListingPostObj}
        />
      );
      break;

    default:
      return (
        <ListingForm1
          listingPostObj={listingPostObj}
          setFormState={setFormState}
          setListingPostObj={setListingPostObj}
        />
      );
      break;
  }
}
