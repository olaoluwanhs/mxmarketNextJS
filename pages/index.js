import { Fragment } from "react/cjs/react.development"
import Link from "next/link"
import Navbar from "./components/navBar"
import Footer from "./components/footer"
// 
export default function Home() {
  return (
    <Fragment>
      <Navbar/>
      {/*  */}
      <h1>Home page</h1>
      <Link href="./login">
        <button>Login</button>
      </Link>
      {/*  */}
      <Footer/>
    </Fragment>
  )
}
