import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { loginFunction } from "../../context/loggedInContext";

export default function Login(){
    // 
    let loginForm =useRef();
    let router = useRouter();
    let [credentialsState, setCredentialState] = useState("empty")
    // 
    useEffect(()=>{},[credentialsState])
    function login(e){
        // 
        e.preventDefault();
        let userInfo = new FormData(loginForm.current),
            userObj = {
                name:userInfo.get("user-id"),
                password:userInfo.get("password")
            };
            loginFunction(userObj).then((result)=>{
                if(result !="invalid-credentials"){
                    router.replace("./profile")
                }else{
                    setCredentialState(null);
                }
                console.log(result);
            })
        // 
    }
    // 
    return(
        <div className="bodyDiv patternBg">
            {/* Bootstrap error */}
            {credentialsState == null  &&
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <span>Login credentials aren't correct.</span>
            </div>}
            {/*  */}
            <div className="d-flex container flex-column rounded py-3 align-items-center">
                <img src="./logo.png" alt="" className="form-logo"/>
                <form ref={loginForm} className="d-flex flex-column my-5">
                    <input type="text" name="user-id"  className=" form-control my-1" placeholder="Username or Email"/>
                    <input type="text" name="password" className=" form-control my-1" placeholder="Password"/>
                    <button onClick={(e)=>{login(e)}} className="btn-purple btn btn-lg my-1 text-light">Login</button>
                    {/* <input type="button" value="Login"  className="btn-purple btn btn-lg my-1 text-light"/> */}
                </form>
                <Link href="/login/sign-up">
                    <button className="btn-orange btn-lg text-light mb-2">Create an account</button>
                </Link>
                <Link href="/">
                    <span className="h4 plain-link align-center py-3">Go to homepage </span>
                </Link>
            </div>
        </div>
    )
}