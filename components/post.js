import Link from "next/link";
import Image from "next/image";

export default function Post({ post }) {
  const { title, slug, image, createdAt, id } = post;
  //
  const style = {
    image: {
      height: "150px",
      width: "100%",
      objectFit: "cover",
      marginRight: "2rem",
    },
    div: {
      display: "flex",
      // flexDirection: "row",
      alignItems: "center",
      width: "18rem",
      height: "fit-content",
      borderRadius: "10px",
      overflow: "hidden",
    },
    title: {},
    date: {
      color: "grey",
    },
  };
  //
  return (
    <>
      <Link href={`/post/${slug}`}>
        <div
          className={`shadow-lg my-2 mx-auto card col-md-4 col-sm-6 p-2`}
          style={style.div}
        >
          {(() => {
            if (image) {
              return (
                <img
                  src={`${image}`}
                  alt={`${slug}`}
                  // style={style.image}
                  className={"card-img-top"}
                />
              );
            }
          })()}
          <div className="card-body" style={{ height: "fit-content" }}>
            <h3 style={style.title} className={"card-title"}>
              {title}
            </h3>
            <h5 style={style.date}>
              {(() => {
                const date = new Date(createdAt);
                return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
              })()}
            </h5>
            <a className="btn btn-purple">Read More</a>
          </div>
        </div>
      </Link>
    </>
  );
}
