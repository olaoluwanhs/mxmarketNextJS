import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";


export default function AccountMenu({accountMenuState, setAccountMenuState, loggedInState}){
    let accountMenu = useRef()
    useEffect(()=>{
        // console.log(accountMenu);
        if(accountMenuState == "hidden"){
            accountMenu.current.style.display ="none";
        }else if(accountMenuState == "shown"){
            accountMenu.current.style.display = "flex";
        }
        // console.log(loggedInState)
    },[accountMenuState, loggedInState])
    
    switch (loggedInState) {
        case false:
            return(
                <div className="shadow account-menu py-2" ref={accountMenu}>
                        <Link href="/login">
                            <span className="btn-hover-orange pointer account-menu-link">Login</span>
                        </Link>
                        <Link href="/login/sign-up">
                            <span className="btn-hover-orange pointer account-menu-link">Sign Up</span>
                        </Link>
                </div>
                )
                break;
                case true:
                    return(
                        <div className="shadow account-menu py-2" ref={accountMenu}>
                        <Link href="/">
                            <span className="btn-hover-orange pointer account-menu-link">Overview</span>
                        </Link>
                        <Link href="/">
                            <span className="btn-hover-orange pointer account-menu-link">Listing</span>
                        </Link>
                        <Link href="/profile/createListing">
                            <span className="btn-hover-orange pointer account-menu-link">Create Listing</span>
                        </Link>
                        <Link href="/">
                            <span className="btn-hover-orange pointer account-menu-link">Account Details</span>
                        </Link>
                        <Link href="/">
                            <span className="btn-hover-orange pointer account-menu-link">Log out</span>
                        </Link>
                </div>
                    )
            break;
    
            default:
            return(
                <div className="shadow account-menu py-2" ref={accountMenu}>
                    <h5>An error has occured</h5>
                </div>
            )
            break;
        }
}