import { Fragment, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navBar";
import Footer from "../components/footer";
//

export default function Home() {
  //

  return (
    <Fragment>
      {/* <LoggedInContextProvider>  */}
      <Navbar />
      {/*  */}
      {/*  */}
      <Footer />
      {/* </LoggedInContextProvider> */}
    </Fragment>
  );
}
