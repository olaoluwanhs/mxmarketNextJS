import { useState, useRef, useEffect } from "react";
import Router from "next/router";

// SUBCATEGORY INPUT
function Subcategory({ category, setSubCategory }) {
  // this is temporary
  let subcategoryObjectList = {
    fashion: [
      "Mens shoes",
      "Womens shoes",
      "Native wears",
      "Accessories",
      "Unisex clothes",
      "Men's wears",
      "Ladies wears",
      "Sneakers",
    ],
    technology: [
      "Phones",
      "Laptops",
      "Accessories",
      "Desktop",
      "Other Devices",
    ],
    food: ["Raw food", "Proccessed food", "Snacks", "Pastries"],
    furniture: ["wooden", "plastic", "others"],
    housing: ["Apartment", "Room mate"],
    academics: ["Technical Drawing Equipments", "Stationaries"],
    books: ["Gospel", "Islamic", "Novels", "Scientific", "Academic"],
    services: [
      "Digital Services",
      "Repair Services",
      "Teaching Services",
      "Cleaning Services",
      "Laundry Services",
      "Others",
    ],
  };
  //
  let subCat = useRef();
  //
  function handleSubCateChange() {
    setSubCategory(subCat.current.value);
  }

  //
  if (category) {
    //
    switch (category) {
      case "fashion":
        return (
          <select
            onChange={handleSubCateChange}
            ref={subCat}
            name="listing-subcategory"
            id=""
            className="form-control my-1"
          >
            <option value="" selected disabled>
              Choose subcategory
            </option>
            {/*  */}
            {subcategoryObjectList.fashion.map((sub) => {
              return (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              );
            })}
            {/*  */}
          </select>
        );
        break;
      case "services":
        return (
          <select
            onChange={handleSubCateChange}
            ref={subCat}
            name="listing-subcategory"
            id=""
            className="form-control my-1"
          >
            <option value="">Choose subcategory</option>
            {/*  */}
            {subcategoryObjectList.services.map((sub) => {
              return (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              );
            })}
            {/*  */}
          </select>
        );
        break;
      case "technology":
        return (
          <select
            name="listing-subcategory"
            id=""
            onChange={handleSubCateChange}
            ref={subCat}
            className="form-control my-1"
          >
            <option value="">Choose subcategory</option>
            {/*  */}
            {subcategoryObjectList.technology.map((sub) => {
              return (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              );
            })}
            {/*  */}
          </select>
        );
        break;
      case "food":
        return (
          <select
            onChange={handleSubCateChange}
            ref={subCat}
            name="listing-subcategory"
            id=""
            className="form-control my-1"
          >
            <option value="">Choose subcategory</option>
            {/*  */}
            {subcategoryObjectList.food.map((sub) => {
              return (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              );
            })}
            {/*  */}
          </select>
        );
        break;
      case "furniture":
        return (
          <select
            name="listing-subcategory"
            id=""
            onChange={handleSubCateChange}
            ref={subCat}
            className="form-control my-1"
          >
            <option value="">Choose subcategory</option>
            {/*  */}
            {subcategoryObjectList.furniture.map((sub) => {
              return (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              );
            })}
            {/*  */}
          </select>
        );
        break;
      case "housing":
        return (
          <select
            name="listing-subcategory"
            id=""
            className="form-control my-1"
            onChange={handleSubCateChange}
            ref={subCat}
          >
            <option value="">Choose subcategory</option>
            {/*  */}
            {subcategoryObjectList.housing.map((sub) => {
              return (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              );
            })}
            {/*  */}
          </select>
        );
        break;
      case "books":
        return (
          <select
            name="listing-subcategory"
            onChange={handleSubCateChange}
            ref={subCat}
            id=""
            className="form-control my-1"
          >
            <option value="">Choose subcategory</option>
            {/*  */}
            {subcategoryObjectList.books.map((sub) => {
              return (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              );
            })}
            {/*  */}
          </select>
        );
        break;
      case "academics":
        return (
          <select
            name="listing-subcategory"
            id=""
            className="form-control my-1"
            onChange={handleSubCateChange}
            ref={subCat}
          >
            <option value="">Choose subcategory</option>
            {/*  */}
            {subcategoryObjectList.academics.map((sub) => {
              return (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              );
            })}
            {/*  */}
          </select>
        );
        break;

      default:
        return <div></div>;
        break;
    }
    //
  } else {
    return <div></div>;
  }
}

export default function SearchBar() {
  //
  let categoryRef = useRef();
  let form = useRef();
  let [category, setCategory] = useState(""),
    [filterState, setFilterState] = useState(false),
    [subCategory, setSubCategory] = useState("");
  //
  useEffect(() => {}, [filterState]);
  //
  function handleCategoryChange() {
    setCategory(categoryRef.current.value);
    setSubCategory("");
  }
  //
  function handleSearch(e) {
    //
    e.preventDefault();
    const formData = new FormData(form.current);
    const formObj = {
      term: formData.get("term"),
      category: formData.get("listing-category"),
      subcategory: formData.get("listing-subcategory"),
      location: formData.get("location"),
      min: formData.get("min"),
      max: formData.get("max"),
    };
    // console.log(formObj);
    Router.push({
      pathname: "/search",
      query: formObj,
    });
    //
  }
  //
  return (
    <>
      <div className="container bg-light p-3 mt-3">
        <center>
          <h3>Search options</h3>
        </center>
        <form action="#" ref={form}>
          <input
            name="term"
            type="text"
            className="form-control my-1"
            placeholder="Insert search term"
          />
          {/*  */}
          {filterState && (
            <>
              <select
                ref={categoryRef}
                name="listing-category"
                className="form-control my-1"
                id=""
                onChange={handleCategoryChange}
              >
                <option selected value="">
                  Select Listing Category
                </option>
                <option value="fashion">Fashion</option>
                <option value="technology">Technology</option>
                <option value="food">Foods</option>
                <option value="furniture">Furniture</option>
                <option value="housing">Housing</option>
                <option value="books">Books</option>
                <option value="services">Services</option>
                <option value="academics">Academic Materials</option>
              </select>
              <Subcategory
                category={category}
                setSubCategory={setSubCategory}
              />
              {/* Category and subcategory done */}
              <div className="d-flex align-items-center justify-content-between">
                <input
                  name="min"
                  type="number"
                  className="form-control"
                  placeholder="min price"
                />
                <input
                  name="max"
                  type="number"
                  className="form-control"
                  placeholder="max price"
                />
              </div>
            </>
          )}
          {/*  Add filters button */}
          <div className="form-check form-switch d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input my-2"
              id="flexSwitchCheckDefault"
              onChange={(e) => {
                setFilterState(e.target.checked);
              }}
            />
            <label htmlFor="flexSwitchCheckDefault" className="mx-2">
              Add filters
            </label>
          </div>
          {/* Filters done */}
          <button
            className="btn btn-purple"
            onClick={(e) => {
              handleSearch(e);
            }}
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
}
