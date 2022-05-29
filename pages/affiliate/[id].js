export default function AfiiliateProduct({ result }) {
  return (
    <div>
      <h1>{JSON.stringify(result)}</h1>
    </div>
  );
}

export async function getServerSideProps({ req, params }) {
  //
  const res = await fetch("http://localhost:4000/affiliate/?id=" + params.id, {
    method: "get",
    credentials: "include",
  });
  const result = await res.json();
  //   console.log(result``);
  //
  return {
    props: { result },
  };
  //
}
