export default function ({ slug }) {
  return <p>{slug}</p>;
}
export async function getServerSideProps({ params }) {
  return { props: { slug: params.slug } };
}
