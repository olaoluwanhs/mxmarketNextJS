import { Fragment } from "react/cjs/react.production.min";
import Link from "next/link";
import { useRef, useState, useContext } from "react";
import { loggedInContext } from "../context/loggedInContext";
import AccountMenu from "./accountMenu";

// Footer
export default function Navbar({
}) {
    // 
    const [hamburgerState, setHamburgerState] =useState("")
    const [accountMenuState, setAccountMenuState] = useState("hidden");

    // 
    let hamburgerMenu = useRef();
    let smNav =useRef();
    let accountMenuBtn =useRef();
    let {loggedInState, setLoggedInstate} = useContext(loggedInContext)

    // 
    let onClickHamburger = ()=>{
        // 
        switch (hamburgerState) {
            case "":
                smNav.current.style.transform ="translateY(107vh)"
                // 
                hamburgerMenu.current.childNodes.forEach((el)=>{
                    el.className = "hamburger-icon clicked-hamburger-icon"
                })
                // 
                setHamburgerState("dropped");
                break;

            case "dropped":
                smNav.current.style.transform ="translateY(0px)"
                // 
                hamburgerMenu.current.childNodes.forEach((el)=>{
                    el.className = "hamburger-icon"
                })
                // 
                setHamburgerState("");
                break;
        
            default:
                smNav.current.style.transform ="translateY(107vh)"
                setHamburgerState("dropped");
                break;
        }
    }
    
    // Show Account Menu
    let showAccountMenu =()=>{
        switch (accountMenuState) {
            case "hidden":
                setAccountMenuState("shown")
                break;
            case "shown":
                setAccountMenuState("hidden")
                break;
        
            default:
                setAccountMenuState("hidden")
                break;
        }
    }
    
    // Returned jsx
    return(
        <Fragment>
            <nav className="bg-light shadow-lg px-3 d-flex flex-row align-items-center justify-content-between" >
        {/* Nav links trigger for small screens  */}
        <div className="hamburger" ref={hamburgerMenu} onClick={onClickHamburger}>
            <div className="hamburger-icon"></div>
            <div className="hamburger-icon"></div>
            <div className="hamburger-icon"></div>
        </div>
        {/*Logo*/}
            <Link href="/">
                <img src="/logo.png" height="90%" alt="" />
            </Link>
        {/* Navigation links large screen */}
        <div className="d-dlex flex-row align-items-center justify-content-center lg-nav">
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
        </div>
        {/* Profile links */}
                <div className="d-flex flex-row align-items-center justify-content-between profile-link">
                    {/* Profile Icon link */}
                    <Link href="/profile">
                        <img src="/icons/account.svg" alt="account" className="Accout-nav-logo pointer" title="my account"/>
                    </Link>
                    <span className="btn-hover-orange btn-purple btn btn-sm text-light" title="Acount menu" ref={accountMenuBtn} onClick={showAccountMenu}> V </span>
                </div>
            </nav>

        {/* Account Menus */}
        <AccountMenu accountMenuState={accountMenuState} setAccountMenuState={setAccountMenuState} loggedInState={loggedInState}/>
        {/* Navigation links small screen */}
        <div className="sm-nav flex-column align-items-center bg-light shadow" ref={smNav}>
        <ul className="d-flex flex-column justify-content-evenly nav-list">
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
        </div>
  </Fragment>
    )
}