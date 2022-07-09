import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Router from "next/dist/client/router";
import ListingForm1 from "../../components/listingForms/listingForm1";
import ListingForm2 from "../../components/listingForms/listingForm2";
import Navbar from "../../components/navBar";
import NewListing from "../../components/newListing";
import checkUser from "../../context/checkUser";
import { LoggedInContext } from "../../context/loggedInContext";
// import { LoggedInContextProvider } from "../../context/loggedInContext";

export let lisitingFormParams = createContext();

export default function () {
  let { loggedInState, setLoggedInState } = useContext(LoggedInContext);
  let [listingPostObj, setListingPostObj] = useState({}),
    [formState, setFormState] = useState(1);

  //
  let i = useRef(0);
  useEffect(checkUserLoggedIn, []);
  useEffect(() => {
    if (i.current >= 1) {
      // console.log(loggedInState);
      //
      if (loggedInState.loggedIn != true) {
        Router.replace("/login");
      }
    }
    i.current = i.current + 1;
  }, [loggedInState]);

  async function checkUserLoggedIn() {
    const state = await checkUser();
    setLoggedInState(state);
  }
  //
  //
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
