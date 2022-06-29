import { useEffect } from "react";

export default function Pricing({ priceTypeState, DefaultValue }) {
  useEffect(() => {}, [priceTypeState]);

  switch (priceTypeState) {
    case "price":
      return (
        <>
          <label htmlFor="">
            Price (<strike>N</strike>)
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="form-control"
            defaultValue={DefaultValue || ""}
          />
        </>
      );
      break;
    case "on-call":
      return (
        <>
          <p>
            When contacted you can select the prize to sell it on the listing
            options page.
          </p>
        </>
      );
      break;

    default:
      break;
  }
}
