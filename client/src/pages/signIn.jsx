import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { verifyUser}  from "../feature/login/loginSlice";

function SignIn(){
    const dispatch = useDispatch();
    dispatch(verifyUser());

    return(
        <div className="container">
            <h1>Signin</h1>
        </div>
    )

}export default SignIn