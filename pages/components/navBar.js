import { Fragment } from "react/cjs/react.production.min";
import Link from "next/link";

// Footer
export default function Navbar() {
    // 
    return(
        <Fragment>
            <nav className="bg-light shadow-lg px-3 d-flex flex-row align-items-center justify-content-between" >
        {/*Logo*/}
            <Link href="/">
                <img src="/logo.png" height="90%" alt="" />
            </Link>
        {/* Navigation links */}
                <ul className="d-flex flex-row align-items-center justify-content-between nav-list">
                    <li>
                        <Link href="/">
                            <span className="nav-links pointer">
                                Home
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Categories">
                            <span className="nav-links pointer">
                                Categories
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Blog">
                            <span className="nav-links pointer">
                               Blog
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/delivery">
                            <span className="nav-links pointer">
                               Mx Delivery
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/FAQ">
                            <span className="nav-links pointer">
                               FAQ
                            </span>
                        </Link>
                    </li>
                </ul>
        {/* Profile links */}
        <Link href="/profile">
            <div className="">
                <img src="/icons/account.svg" alt="account" className="Accout-nav-logo pointer" />
                {/* <object data="/icons/account.svg" type="image/svg+xml" className="Account-nav-logo pointer">Account</object> */}
            </div>
        </Link>
            </nav>
        </Fragment>
    )
}