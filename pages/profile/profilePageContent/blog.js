import Router from "next/router";
import { useRef, useState, useEffect } from "react";

export default function PostBlog({ profilePageState }) {
  //
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [attemptState, setAttemptState] = useState("none");
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  //
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, [attemptState]);
  //
  const form = useRef();
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formObj = new FormData(form.current);
      //use image name to
      const post = {
        title: formObj.get("title").replace(/\s+/g, " "),
        image: formObj.get("image"),
        content: data,
        slug: formObj
          .get("title")
          .toLocaleLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w\s\-']|_/g, ""),
      };
      //
      // console.log(post);
      //
      const res = await fetch("http://localhost:4000/post", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(post),
      });
      const response = await res.json();
      console.log(response);
      if (response.error) {
        throw response.error;
      }
      //
      Router.replace(`http://localhost:3000/post/${response.slug}`);
    } catch (error) {
      // console.log(error.errors[0].message);
      setAttemptState(error.errors[0].message);
    }
  }

  //
  return (
    <div className="container mt-3">
      <form ref={form} action="" method="post">
        <h3>Create new blog post</h3>
        <input
          type="text"
          name="title"
          className="form-control my-1"
          placeholder="Title"
          id=""
        />
        <label htmlFor="image" className="mt-1">
          Select featured image
        </label>
        <a
          href="http://localhost:4000/images"
          target="_blank"
          className="btn btn-primary btn-lg col-12 text-light shadow my-2"
        >
          Select from uploaded images
        </a>
        <input
          type="text"
          name="image"
          className="form-control"
          placeholder="Insert image link"
        />
        <label htmlFor="content" className="mt-1">
          Post content
        </label>
        {/*  */}
        <>
          {editorLoaded ? (
            <CKEditor
              editor={ClassicEditor}
              data={data}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!");
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setData(data);
              }}
            />
          ) : (
            <p>Loading...</p>
          )}
        </>
        {/*  */}
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          className="btn btn-success btn-lg col-12 my-2"
        >
          Submit Post
        </button>
        {/*  */}
        {/*  */}
        {/* Bootstrap error */}
        {attemptState !== "none" && attemptState !== "Success" && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <span>{attemptState}</span>
          </div>
        )}
        {attemptState == "Success" && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <span>{attemptState}</span>
          </div>
        )}
        {/*  */}
      </form>
    </div>
  );
}
