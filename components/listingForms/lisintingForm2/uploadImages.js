import { useEffect, useState } from "react";
import { useRef } from "react/cjs/react.development"

export default function ProductImages({imageError, setImageError}){
    
    let imageFiles = useRef();

    useEffect(()=>{},[imageError])

    function handleOnChange(){
        Array.from(imageFiles.current.files).forEach((e)=>{
            // console.log(e.size);
            if(e.size >= 8300000){

                setImageError(true)
            }else{setImageError(false)}
        })
    }

    return(
        <>
        <label htmlFor="images">Upload Images</label>
        <input name="images" type="file" accept="image/*" className="form-control" multiple ref={imageFiles} onChange={handleOnChange}/>
        <small>Add up to 4 Images not exceeding 8MB each.</small>
        {imageError == true && 
        <p className="alert alert-danger">One or more of the Images uploaded are larger than 8MB</p>
        }
        </>
    )
}