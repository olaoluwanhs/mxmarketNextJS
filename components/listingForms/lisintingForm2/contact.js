import { useEffect } from "react";
import { useContext } from "react/cjs/react.development"
import { LoggedInContext } from "../../../context/loggedInContext"

export default function Contact(){
    let userInfo = useContext(LoggedInContext);
    // console.log(userInfo)

    useEffect(()=>{

    },[])


    return(
        <>
        <label htmlFor="phone">Phone Number </label>
        <small> +234</small><input className="form-control" type="number" name="phone"/>
        <label htmlFor="whatsapp">Whatsapp Number </label>
        <small> +234</small><input className="form-control" type="number" name="whatsapp"/>
        <label htmlFor="email">Email</label>
        <input className="form-control" type="email" name="email"/>
        </>
    )
}