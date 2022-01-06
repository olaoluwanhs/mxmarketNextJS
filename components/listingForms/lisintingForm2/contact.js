import { useEffect } from "react";
import { useContext } from "react/cjs/react.development"
import { loggedInContext } from "../../../context/loggedInContext"

export default function Contact(){
    let userInfo = useContext(loggedInContext);
    console.log(userInfo)

    useEffect(()=>{

    },[])


    return(
        <>
        <label htmlFor="phone">Phone Number</label>
        <small>+234</small><input className="form-control" type="number" name="phone"/>
        <label htmlFor="phone">Whatsapp Number</label>
        <small>+234</small><input className="form-control" type="number" name="whatsapp"/>
        <label htmlFor="phone">Email</label>
        <input className="form-control" type="email" name="email"/>
        </>
    )
}