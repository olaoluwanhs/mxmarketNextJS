import { Fragment, useRef } from "react";

export default function ListingForm2({
    setFormState, setListingPostObj
}){

    function returnToChangeCategory(){
        setFormState(1);
    }

    return(
        <Fragment>
            <div className="d-flex flex-column align-items-center justify-content-evenly">
                <span className="plain-link pointer text-orange my-4" onClick={returnToChangeCategory}> Change Selected Category</span>
                {/* Listing details form */}
                    <form action="">
                        {/*  */}

                        {/*  */}
                    </form>
                {/*  */}
            </div>
        </Fragment>
    )
}