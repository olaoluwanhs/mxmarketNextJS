import Link from "next/link";
import { Fragment } from "react";

export default function Affiliate({ affiliate }) {
  return (
    <div className="d-flex flex-row overflow-scroll mx-4 shadow-lg">
      {affiliate.map((e) => {
        //
        return (
          <Fragment key={e.id}>
            <Product e={e} />
          </Fragment>
        );
        //
      })}
    </div>
  );
}

export function Product({ e }) {
  return (
    <div
      className="card shadow-lg rounded overflow-hidden mx-2"
      style={{ minWidth: "15rem" }}
    >
      <img src={JSON.parse(e.pictures)[0]} alt="" className="card-image" />
      <div className="card-body" style={{ height: "fit-content" }}>
        <h3>{e.title}</h3>
        <h5>
          <strike>N</strike>
          {e.price}
        </h5>
        <Link href={`/affiliate/${e.id}`}>
          <button className="btn btn-orange">Details</button>
        </Link>
      </div>
    </div>
  );
}

export async function getAffiliateProducts(setAffiliate) {
  //
  const res = await fetch("http://localhost:4000/affiliate", {
    method: "get",
    credentials: "include",
  });
  const result = await res.json();
  // console.log(result);
  setAffiliate(result);
  //
}
