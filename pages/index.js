import { Fragment, useState} from "react"
import Link from "next/link"
import Navbar from "../components/navBar"
import Footer from "../components/footer"
import { loggedIn, loggedInContext, LoggedInContextProvider } from "../context/loggedInContext"
// 

export default function Home() {
// 

  return (
    <Fragment>
      <LoggedInContextProvider> 
      <Navbar />
      {/*  */}
      {/*  */}
      <Footer/>
      </LoggedInContextProvider>

    </Fragment>
  )
}
