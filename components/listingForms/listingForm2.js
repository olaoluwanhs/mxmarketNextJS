import Router  from "next/router";
import { Fragment, useRef, useState } from "react";
import { LoggedInContextProvider } from "../../context/loggedInContext";
import Contact from "./lisintingForm2/contact";
import Pricing from "./lisintingForm2/pricing";
import ProductImages from "./lisintingForm2/uploadImages";

export default function ListingForm2({
    setFormState, setListingPostObj,listingPostObj
}){

    let priceType = useRef();
    let form2 = useRef();
    let [priceTypeState, setPriceTypeState] =useState("price");
    let [imageError, setImageError] =useState(false);


    function returnToChangeCategory(){
        setFormState(1);
    }
    function handlePriceTypeChange(){
        setPriceTypeState(priceType.current.value);
    }
    function handleListingCreation(e){
        e.preventDefault();
        // 
        let formData = new FormData(form2.current);
        setListingPostObj({
            category:listingPostObj.category,
            subCategory: listingPostObj.subCategory,
            title: formData.get("title"),
            priceType: formData.get("pricingType"),
            price:formData.get("price"),
            description: formData.get("description"),
            images:formData.get("images"),
            phone:formData.get("phone"),
            whatsapp:formData.get("whatsapp"),
            email:formData.get("email"),
        })      
        if(submitFormData(listingPostObj)){
            Router.push("/")
        }
    }

    function submitFormData(obj){
        // Post request to submit form
        return "success";
    }

    return(
        <Fragment>
            <div className="d-flex flex-column align-items-center justify-content-evenly">
                <span className="plain-link pointer text-orange my-4" onClick={returnToChangeCategory}> Change Selected Category</span>
                {/* Listing details form */}
                    <form className="listing-form-2" action="" ref={form2}>
                        {/*  */}
                        <input type="text" name="title" className="form-control" placeholder="Listing Title" maxLength="60"/>
                        <small>Limit to 60 Characters</small>
                        <hr />
                        <label htmlFor="pricingType">Pricing Type</label>
                        <select name="pricingType" className="form-control" ref={priceType} onChange={handlePriceTypeChange}>
                            <option value="price">Price</option>
                            <option value="on-call">On call</option>
                        </select>
                        {/*  */}
                        <Pricing priceTypeState={priceTypeState}/>
                        {/*  */}
                        <label htmlFor="description">Listing description</label>
                        <textarea name="description" cols="30" rows="10" className="form-control" placeholder="Add relevant descriptions of your product or service here"></textarea>
                        {/*  */}
                        <hr />
                        <ProductImages imageError={imageError} setImageError={setImageError}/>
                        <hr />
                        {/*  */}
                        <LoggedInContextProvider>
                            <Contact />
                        </LoggedInContextProvider>
                        {/*  */}
                        <button onClick={(e)=>{handleListingCreation(e)}} className="btn-purple px-3 py-2 rounded my-4">Submit</button>
                    </form>
                {/*  */}
            </div>
        </Fragment>
    )
}