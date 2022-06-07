export default function ({ result }) {
  return <p>{JSON.stringify(result)}</p>;
}
export async function getServerSideProps({ req, params }) {
  //
  let res = await fetch(`http://localhost:4000/listing/?slug=${params.slug}`, {
    method: "get",
    credentials: "include",
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  const result = await res.json();
  //
  return { props: { result } };
}
