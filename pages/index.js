import { Fragment, useState} from "react"
import Link from "next/link"
import Navbar from "../components/navBar"
import Footer from "../components/footer"
// 
export default function Home() {
  const [loggedInState, setLoggedInState] = useState(true);
  return (
    <Fragment>
      <Navbar loggedInState={loggedInState} setLoggedInState={setLoggedInState}/>
      {/*  */}
      {/*  */}
      <Footer/>
    </Fragment>
  )
}
