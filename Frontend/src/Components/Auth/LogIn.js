import { useState,useEffect } from "react";
import { Fragment } from "react";
import { Link,useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch,useSelector } from "react-redux";
import Loader from "../../Layouts/Loader.js";
import {login,clearErrors } from "../../Action/UserActions.js";
import Footer from '../Footer.js';

const LogIn = () => {

    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch();
    const [Username,setUserName] = useState('');
    const [Password,setPassword] = useState('');
    const {user,isAuthenticated,error,loading:isPending} = useSelector(state =>state.user);

    useEffect(()=>{
        if(isAuthenticated) {
            history.push('/');
            alert.success('You have been logged in successfully')
            // if(user.Message !=='')
            // {
            //     alert.show(user.Message)
            // }
        }
        if(error && error!='(intermediate value).catch is not a function')
        {   
            alert.error(error);
            dispatch(clearErrors());
        }
    },[dispatch,alert,isAuthenticated,error])

    const handleLogIn = (e) => {
        e.preventDefault();
        dispatch(login(Username, Password));
        // localStorage.setItem("user",JSON.stringify({Username, Password,isAuthenticated:true}))
    }

    return ( 
        <Fragment>
            { isPending? <Loader /> :(
            <section className="LogIn">
                <h2> Login </h2>
                <form onSubmit={handleLogIn}>
                    <label htmlFor="username">Username:</label>
                    <input 
                    type="text" 
                    required 
                    id = "username"
                    value={Username}
                    autoComplete="off"
                    onChange={(e) => setUserName(e.target.value)}
                    />
                    <label htmlFor="password">Password :</label>
                    <input
                    type ="password"
                    required
                    id = "password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    {!isPending? <button>Login</button>:<button disabled>Signing In...</button>}
                    <p>
                        Need an Account?
                        <br></br>
                        <span className="Login Signup">
                            <Link to="../SignUp">
                                Sign up
                            </Link>
                        </span>
                    </p>
                </form>
            </section>)}
            <Footer />
        </Fragment>
    // )}
        // </>         
     );
}
 
export default LogIn