import { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navBar";
import Footer from "../components/footer";
import { LoggedInContext } from "../context/loggedInContext";
import checkUser from "../context/checkUser";
import { ProductListing } from "../components/ProductListing";
//

export default function Home() {
  //
  let { setLoggedInState } = useContext(LoggedInContext);
  useEffect(async () => {
    setLoggedInState(await checkUser());
  }, []);

  return (
    <Fragment>
      <Navbar />
      {/*  */}
      {/* <ProductListing /> */}
      {/*  */}
      <Footer />
    </Fragment>
  );
}
