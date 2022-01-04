import Link from "next/link"

export default function Login(){
    // 

    // 
    return(
        <div className="bodyDiv patternBg">
            <div className="d-flex container flex-column rounded py-3 align-items-center">
                <img src="./logo.png" alt="" className="form-logo"/>
                <form className="d-flex flex-column my-5">
                    <input type="text" name="user-id"  className=" form-control my-1" placeholder="Username or Email"/>
                    <input type="text" name="password" className=" form-control my-1" placeholder="Password"/>
                    <input type="button" value="Login"  className="btn-purple btn btn-lg my-1 text-light"/>
                </form>
                <Link href="/login/sign-up">
                    <button className="btn-orange btn-lg text-light mb-2">Create an account</button>
                </Link>
                <Link href="/">
                    <span className="h4 plain-link align-center py-3">Go to homepage </span>
                </Link>
            </div>
        </div>
    )
}