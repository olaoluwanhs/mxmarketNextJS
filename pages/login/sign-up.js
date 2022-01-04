import Link from "next/link"


export default function SignUp(){
    // 
    return(
        <div className="bodyDiv patternBg">

        <div className="d-flex container flex-column rounded py-3 align-items-center">
            <img src="/logo.png" alt="" className="form-logo"/>
            <form className="d-flex flex-column my-5">
                <input type="text" name="firstname" placeholder="First Name" className=" form-control my-1" />
                <input type="text" name="lastname" placeholder="Last Name" className=" form-control my-1"/>
                <input type="text" name="email" placeholder="Email" className="form-control my-1"/>
                <input type="text" name="phone-number" placeholder="Mobile phone number" className=" form-control my-1"/>
                <input type="text" name="whatsapp-number" placeholder="Whatsapp number" className=" form-control my-1"/>
                <input type="password" name="password" className=" form-control my-1" placeholder="Password"/>
                <input type="password" name="confirm" className=" form-control my-1" placeholder="Confirm your password"/>
                <button className="btn-orange btn btn-lg text-light my-2">Login</button>
                <Link href="./" >
                 <button className="btn-purple btn btn-lg text-light my-2">I already have an account</button>
                </Link>
            </form>
                <Link href="/">
                    <span className="h4 plain-link align-center py-3">Go to homepage </span>
                </Link>
        </div>
        </div>
    )
    // 
}