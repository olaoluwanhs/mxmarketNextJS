export default async function checkUser() {
  //
  const res = await fetch("http://localhost:4000/checkUser", {
    method: "get",
    credentials: "include",
  });
  const result = await res.json();
  // console.log(result);
  if (result.id == undefined) {
    return {
      loggedIn: false,
      user: {},
    };
  }
  return {
    loggedIn: true,
    user: result,
  };
}
