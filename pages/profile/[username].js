export default function profile(props){
    
    //gewt serverside props
    // getServerSideProps(){

    // } 
    // 
    return(
        <>
        <h1>profile page</h1>
        <h2>
            {props.user_name}
        </h2>
        </>
    )
}
export async function getServerSideProps({params}){
// 
    let res = await fetch("http://localhost:4000/profile/?"+new URLSearchParams({username:params.username}));
    let userInfo = await res.json()
    
// 
// console.log(userInfo)
    return {props:userInfo}
// 
}