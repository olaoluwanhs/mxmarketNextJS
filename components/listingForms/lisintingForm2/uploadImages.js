import { useEffect, useState } from "react";
import { useRef } from "react/cjs/react.development";

export default function ProductImages({
  imageError,
  setImageError,
  setImageRef,
}) {
  let imageFiles = useRef();

  const [previews, setPreviews] = useState([]);
  useEffect(() => {
    setImageRef(imageFiles);
  }, [imageError, previews]);
  useEffect(() => {}, []);

  async function handleOnChange(e) {
    if (Array.from(e.target.files).length > 4) {
      e.target.value = "";
    }
    setPreviews(Array.from(e.target.files));
  }

  return (
    <>
      <label htmlFor="images">Upload Images</label>
      <input
        name="images"
        type="file"
        accept="image/*"
        className="form-control"
        multiple
        ref={imageFiles}
        onChange={handleOnChange}
      />
      <small>Add up to 4 Images not exceeding 8MB each.</small>
      {imageError == true && (
        <p className="alert alert-danger">
          One or more of the Images uploaded are larger than 8MB
        </p>
      )}
      <hr />
      <div
        className="d-flex align-items-center justify-content-start"
        style={{
          height: "50px",
        }}
      >
        {previews.map((e) => {
          return (
            <img
              src={URL.createObjectURL(e)}
              alt=""
              style={{ height: "100%", objectFit: "cover" }}
              className={"mx-2"}
              key={URL.createObjectURL(e)}
            />
          );
        })}
      </div>
    </>
  );
}
