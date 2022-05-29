export default function Post({ post }) {
  return <h1>{JSON.stringify(post)}</h1>;
}

//
export async function getServerSideProps({ params, req }) {
  //
  let res = await fetch(`http://localhost:4000/post?slug=${params.slug}`, {
    method: "get",
    credentials: "include",
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  const post = await res.json();
  //
  return { props: { post } };
}
