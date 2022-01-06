import { Fragment, useContext, useEffect } from "react";
import { lisitingFormParams } from "../pages/profile/createListing";
import ListingForm1 from "./listingForms/listingForm1";
import ListingForm2 from "./listingForms/listingForm2";

export default function NewListing(){

    let {listingPostObj, setListingPostObj, formState, setFormState} = useContext(lisitingFormParams);
    // console.log(listingParams);

    useEffect(()=>{
    },[formState])

    let ListingFormValues = useContext(lisitingFormParams)
   

                switch (formState) {
                    case 1:
                        return (
                        <ListingForm1 setFormState={setFormState} setListingPostObj={setListingPostObj}/>
                        )
                        break;
                        case 2:
                            return (
                                <ListingForm2  setFormState={setFormState} setListingPostObj={setListingPostObj}/>
                                )
                        break;
                            
                    default:
                        return (
                            <ListingForm1  setFormState={setFormState} setListingPostObj={setListingPostObj}/>
                            )
                        break;
                }
}