import Link from "next/link"

export default function Login(){
    // 
    return(
        <div className="login-form">
            <form>
                <input type="text" className=""/>
                <input type="text" className=""/>
                <input type="button" value="Login" />
            </form>
            <Link href="/login/sign-up">
                <button>Create an account</button>
            </Link>
        </div>
    )
}