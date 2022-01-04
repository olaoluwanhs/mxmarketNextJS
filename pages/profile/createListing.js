import { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../../components/navBar";

// SUBCATEGORY INPUT
function Subcategory({category}){
    // this is temporary
    let subcategoryObjectList = {
        fashion:["Men's shoes","Women's shoes", "native wears", "accessories","Unisex clothes", "Men's wears", "Ladies wears", "Sneakers"],
        technology:["Phones","Laptops","Accessories", "Desktop","Other Devices"],
        food:["Raw food", "Proccessed food", "Snacks","Pastries"],
        furniture:["wooden","plastic", "others"],
        housing:["Apartment", "Room mate"],
        academics:["Technical Drawing Equipments", "Stationaries"],
        books:["Gospel","Islamic","Novels","Scientific","Academic"],
    }
    // 
    
    // 
    if(category){
        // 
        switch (category) {
            case "fashion":
                return(
                    <select name="listing-subcategory" id="" className="form-control my-1">
                        {/*  */}
                        {subcategoryObjectList.fashion.map((sub)=>{
                        return <option value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "technology":
                return(
                    <select name="listing-subcategory" id="" className="form-control my-1">
                        {/*  */}
                        {subcategoryObjectList.technology.map((sub)=>{
                        return <option value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "food":
                return(
                    <select name="listing-subcategory" id="" className="form-control my-1">
                        {/*  */}
                        {subcategoryObjectList.food.map((sub)=>{
                        return <option value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "furniture":
                return(
                    <select name="listing-subcategory" id="" className="form-control my-1">
                        {/*  */}
                        {subcategoryObjectList.furniture.map((sub)=>{
                        return <option value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "housing":
                return(
                    <select name="listing-subcategory" id="" className="form-control my-1">
                        {/*  */}
                        {subcategoryObjectList.housing.map((sub)=>{
                        return <option value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "books":
                return(
                    <select name="listing-subcategory" id="" className="form-control my-1">
                        {/*  */}
                        {subcategoryObjectList.books.map((sub)=>{
                        return <option value={sub}>{sub}</option>
                        })}
                        {/*  */}
                    </select>
                )     
                break;
            case "academics":
                return(
                    <select name="listing-subcategory" id="" className="form-control my-1">
                        {/*  */}
                        {subcategoryObjectList.academics.map((sub)=>{
                        return <option value={sub}>{sub}</option>
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



// CATEGORY FORM INPUT AND LOGIC TO SHOW SUBCATEGORY
export default function CreateListingForm(){
    // 
    let [category, setCategory] = useState()
    // 
    let categoryRef = useRef();
    let submitCategoryBtn = useRef();
    function handleCategoryChange(){
        setCategory(categoryRef.current.value);
    }
    function submitCategoryfunction(e){
        e.preventDefault();
    }
    // 
    useEffect(()=>{
    },[category])
    // 
    return(
        <Fragment>
            <Navbar/>
            {/* Create Listing Form */}
            <div className="d-flex flex-column align-items-center justify-content-evenly mt-5 px-3">
            <h1 className="h1 my-4">Create A new Listing</h1>
                {/*  */}
                <form action="/" method="get">
                    {/* Select the category */}
                    <select ref={categoryRef} name="listing-category" className="form-control my-1" id="" onChange={handleCategoryChange}>
                        <option value="" disabled selected>Select Listing Category</option>
                        <option value="fashion">Fashion</option>
                        <option value="technology">Technology</option>
                        <option value="food">Foods</option>
                        <option value="furniture">Furniture</option>
                        <option value="housing">Housing</option>
                        <option value="books">Books</option>
                        <option value="academics">Academic Materials</option>
                    </select>
                    {/* select subcategory */}
                    <Subcategory category={category}/>
                    <button onClick={(e)=>{
                        submitCategoryfunction(e)
                    }} ref={submitCategoryBtn} className=" btn btn-lg btn-purple">Continue...</button>
                </form> 
                {/*  */}
            </div>
        </Fragment>
    )
}

// We are restarting this part again from tommorow.