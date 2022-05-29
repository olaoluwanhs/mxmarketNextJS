import { createContext, Fragment, useState } from "react";
import ListingForm1 from "../../components/listingForms/listingForm1";
import ListingForm2 from "../../components/listingForms/listingForm2";
import Navbar from "../../components/navBar";
import NewListing from "../../components/newListing";
// import { LoggedInContextProvider } from "../../context/loggedInContext";

export let lisitingFormParams = createContext();

export default function () {
  let [listingPostObj, setListingPostObj] = useState({}),
    [formState, setFormState] = useState(1);

  return (
    <lisitingFormParams.Provider
      value={{ listingPostObj, setListingPostObj, formState, setFormState }}
    >
      {/* <LoggedInContextProvider> */}
      <Fragment>
        <Navbar />
        <NewListing />
      </Fragment>
      {/* </LoggedInContextProvider> */}
    </lisitingFormParams.Provider>
  );
}
