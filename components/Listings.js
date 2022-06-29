import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import Link from "next/link";

export default function Listings() {
  //
  const getPaginationCount = async () => {
    const res = await fetch(`http://localhost:4000/listingCount`);
    const result = await res.json();
    // console.log(Math.ceil(result / 10));
    setPaginationCount(result);
  };

  const handlePaginationChange = async (e, page) => {
    //
    const res = await fetch(
      `http://localhost:4000/listings/?start=${page * 10 - 10}&limit=20`
    );
    const result = await res.json();
    setListings(result);
    //
  };
  const [PaginationCount, setPaginationCount] = useState(1);
  const [listings, setListings] = useState([]);
  useEffect(() => {
    getPaginationCount();
    getLatestListings(listings, setListings, 0);
  }, []);
  useEffect(() => {}, [listings]);

  return (
    <>
      <Lisiting listings={listings} />
      <div className="container mt-3 d-flex align-items-center justify-content-center">
        <Pagination
          count={Math.ceil(PaginationCount / 10)}
          color={"secondary"}
          onChange={handlePaginationChange}
        />
      </div>
      {/*  */}
    </>
  );
}

async function getLatestListings(listings, setListings, number) {
  //
  const res = await fetch(`http://localhost:4000/listings`, {
    method: "get",
    credentials: "include",
  });
  const result = await res.json();
  // console.log(result);
  const list = listings;
  result.forEach((element) => {
    list.push(element);
  });
  setListings(list);
}

export function Lisiting({ listings }) {
  return (
    <div className="container">
      <div className="row d-flex align-items-center justify-content-center">
        {listings.map((e) => {
          //
          return (
            <div
              key={e.id}
              className="card col-lg-3 col-md-6 col-sm-12 mx-2 my-3 p-2"
              style={{ width: "17rem" }}
            >
              {/* {console.log(JSON.parse(e.images)[0])} */}
              <img
                src={
                  JSON.parse(e.images)[0]
                    ? `http://localhost:4000/uploads/${JSON.parse(e.images)[0]}`
                    : "/unsplash.jpg"
                }
                alt={e.title || ""}
                style={{ width: "100%" }}
              />
              <div className="card-body">
                <h3 className="card-title">{e.title || ""}</h3>
                <h4>
                  {e.category} ({e.sub_category})
                </h4>
              </div>
              <Link href={`/listing/${e.slug}`}>
                <button className="btn btn-purple">
                  <small>Offer starting at </small>
                  <strike>N</strike>
                  {e.price}
                </button>
              </Link>
            </div>
          );
          //
        })}
      </div>
    </div>
  );
}
