import { Fragment, useRef, useState } from "react";


// SUBCATEGORY INPUT
function Subcategory({category, setSubCategory}){
    // this is temporary
    let subcategoryObjectList = {
        fashion:["Men's shoes","Women's shoes", "Native wears", "Accessories","Unisex clothes", "Men's wears", "Ladies wears", "Sneakers"],
        technology:["Phones","Laptops","Accessories", "Desktop","Other Devices"],
        food:["Raw food", "Proccessed food", "Snacks","Pastries"],
        furniture:["wooden","plastic", "others"],
        housing:["Apartment", "Room mate"],
        academics:["Technical Drawing Equipments", "Stationaries"],
        books:["Gospel","Islamic","Novels","Scientific","Academic"],
    }
    // 
    let subCat = useRef();
    // 
    function handleSubCateChange(){
        setSubCategory(subCat.current.value)
    }
 
    // 
    if(category){
        // 
        switch (category) {
            case "fashion":
                return(
                    <select onChange={handleSubCateChange} ref={subCat} name="listing-subcategory" id="" className="form-control my-1">
                        <option value="">Choose subcategory</option>
                        {/*  */}
                        {subcategoryObjectList.fashion.map((sub)=>{
                        return <option key={sub} value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "technology":
                return(
                    <select name="listing-subcategory" id="" onChange={handleSubCateChange} ref={subCat} className="form-control my-1">
                        <option value="">Choose subcategory</option>
                        {/*  */}
                        {subcategoryObjectList.technology.map((sub)=>{
                        return <option key={sub} value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "food":
                return(
                    <select onChange={handleSubCateChange} ref={subCat} name="listing-subcategory" id="" className="form-control my-1">
                        <option value="">Choose subcategory</option>
                        {/*  */}
                        {subcategoryObjectList.food.map((sub)=>{
                        return <option key={sub} value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "furniture":
                return(
                    <select name="listing-subcategory" id="" onChange={handleSubCateChange} ref={subCat} className="form-control my-1">
                        <option value="">Choose subcategory</option>
                        {/*  */}
                        {subcategoryObjectList.furniture.map((sub)=>{
                        return <option key={sub} value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "housing":
                return(
                    <select name="listing-subcategory" id="" className="form-control my-1" onChange={handleSubCateChange} ref={subCat}>
                        <option value="">Choose subcategory</option>
                        {/*  */}
                        {subcategoryObjectList.housing.map((sub)=>{
                        return <option key={sub} value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "books":
                return(
                    <select name="listing-subcategory" onChange={handleSubCateChange} ref={subCat} id="" className="form-control my-1">
                        <option value="" >Choose subcategory</option>
                        {/*  */}
                        {subcategoryObjectList.books.map((sub)=>{
                        return <option key={sub} value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "academics":
                return(
                    <select name="listing-subcategory" id="" className="form-control my-1" onChange={handleSubCateChange} ref={subCat}>
                        <option value="" >Choose subcategory</option>
                        {/*  */}
                        {subcategoryObjectList.academics.map((sub)=>{
                        return <option key={sub} value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
        
            default:
                return(
                    <div></div>
                )
                break;
        }
        // 
} else{
    return(
        <div></div>
    )
}
}





export default function ListingForm1({setFormState, setListingPostObj}){

    let categoryRef = useRef();
    let submitCategoryBtn = useRef();
    // 
    let [category, setCategory] = useState(""),
        [subCategory, setSubCategory] = useState("");
    function handleCategoryChange(){
        setCategory(categoryRef.current.value);
        setSubCategory("");
    }
    function submitCategoryfunction(e){
        e.preventDefault();
        // 
        if(categoryRef.current.value !== "" && subCategory !== ""){
            let tempObj = {
                category :categoryRef.current.value,
                subCategory: subCategory
            }
            setListingPostObj(tempObj)
            // console.log(listingPostObj)
            setFormState(2);
        }
        
    }

    return(
        <Fragment>
            {/* Create Listing Form */}
            <div className="d-flex flex-column align-items-center justify-content-evenly mt-5 px-3">
            <h1 className="h1 my-4">Create a new Listing</h1>
                {/*  */}
                <form action="/" method="get">
                    {/* Select the category */}
                    <select ref={categoryRef} name="listing-category" className="form-control my-1" id="" onChange={handleCategoryChange}>
                        <option selected value="" disabled>Select Listing Category</option>
                        <option value="fashion">Fashion</option>
                        <option value="technology">Technology</option>
                        <option value="food">Foods</option>
                        <option value="furniture">Furniture</option>
                        <option value="housing">Housing</option>
                        <option value="books">Books</option>
                        <option value="academics">Academic Materials</option>
                    </select>
                    {/* select subcategory */}
                    <Subcategory category={category} setSubCategory={setSubCategory}/>
                    <button onClick={(e)=>{
                        submitCategoryfunction(e)
                    }} ref={submitCategoryBtn} className=" btn btn-lg btn-purple">Continue...</button>
                </form> 
                {/*  */}
            </div>           
        </Fragment>
    )
}