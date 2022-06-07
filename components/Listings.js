import { useEffect, useState } from "react";
import Link from "next/link";

export default function Listings() {
  //
  const [listings, setListings] = useState([]);
  useEffect(() => {
    getLatestListings(listings, setListings, 0);
  }, []);
  useEffect(() => {}, [listings]);

  return <Lisiting listings={listings} />;
}

async function getLatestListings(listings, setListings, number) {
  //
  const res = await fetch(`http://localhost:4000/listings`, {
    method: "get",
    credentials: "include",
  });
  const result = await res.json();
  console.log(result);
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
              <img
                src={e.image || "/unsplash.jpg"}
                alt={e.title || ""}
                style={{ width: "100%" }}
              />
              <div className="card-body">
                <h3 className="card-title">{e.title || ""}</h3>
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
