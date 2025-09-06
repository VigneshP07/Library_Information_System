import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { userSchema } from "../../Validation/UserValidation";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useAlert } from "react-alert";
import { register ,clearErrors} from "../../Action/UserActions";
import { useDispatch,useSelector } from "react-redux";

const SignUp = () => {
    const [userName,setUserName] = useState('');
    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch();
    const initialValues = {
        FirstName: "",
        LastName: "",
        Password: "",
        ConfirmPassword: "",
        EmailId:"",
        Type:"UnderGraduate",
    };


    const { values, handleBlur, handleChange, errors, touched } =
    useFormik({
    initialValues,
    validationSchema: userSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
        action.resetForm();
    },});

    const {isAuthenticated,error,loading:isPending} = useSelector(state =>state.user);
  
    useEffect(()=>{
        dispatch(clearErrors());
    },[]);
    useEffect(()=>{
        if(error && error!='(intermediate value).catch is not a function') 
        {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[dispatch,alert,error]);

    useEffect(()=>{
        if(isAuthenticated) {
            history.push('/')
            alert.success('You have been logged in successfully')
        }
    },[]);
    
    const handleLogIn = (e) => {
        e.preventDefault();
        const RandomNumber = Math.floor(1000+9000*Math.random());
        const short = values.Type==="UnderGraduate"? 'UG':values.Type==="PostGraduate"? 'PG':values.Type==="ResearchScolar"? 'RS':'FM';
        console.log(short);
        const generatedUserName = short + RandomNumber;
        setUserName(generatedUserName);
        const data = {
            userName: generatedUserName,
            FirstName: values.FirstName,
            LastName: values.LastName,
            EmailId: values.EmailId,
            Password: values.Password,
            Type: values.Type
        };
        dispatch(register(data));
    }

    return ( 
        <>
            {isAuthenticated ? (
                <div className="LogIn">
                    <h2>Welcome</h2>
                    <h6>You are Signned Up Successfully!</h6>
                    <h2>
                        Your User Name is 
                        <span>    
                            {userName}
                        </span>
                    </h2>
                    <p>
                        <Link to="/">Go to Home</Link>
                    </p>
                </div>
            ) : (
            <div className="SignUp">
                <h2> Sign Up </h2>
                <form onSubmit={handleLogIn}>
                    <label>First Name :</label>
                    <input 
                    type="text" 
                    required 
                    name="FirstName"
                    value={values.FirstName}
                    placeholder="First Name"
                    onChange={handleChange}
                    autoComplete="off"
                    onBlur={handleBlur}
                    />
                    {touched.FirstName && errors.FirstName ? (
                      <p className="form-error">{errors.FirstName}</p>
                    ) : null}
                    <label>Last Name :</label>
                    <input 
                    type="text" 
                    required 
                    name = "LastName"
                    value={values.LastName}
                    placeholder="Last Name"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {touched.LastName && errors.LastName ? (
                      <p className="form-error">{errors.LastName}</p>
                    ) : null}
                    <label>E-mail Id :</label>
                    <input 
                    type="text" 
                    required 
                    name = "EmailId"
                    value={values.EmailId}
                    placeholder="Email Id"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.EmailId && touched.EmailId ? (
                      <p className="form-error">{errors.EmailId}</p>
                    ) : null}
                    <label>Password :</label>
                    <input
                    type ="password"
                    required
                    name="Password"
                    autoComplete="off"
                    placeholder="Password"
                    value={values.Password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ></input>
                    {errors.Password && touched.Password ? (
                      <p className="form-error">{errors.Password}</p>
                    ) : null}
                    <label>Confirm Password :</label>
                    <input
                    type ="password"
                    required
                    autoComplete="off"
                    name="ConfirmPassword"
                    value={values.ConfirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ></input>
                    {errors.ConfirmPassword && touched.ConfirmPassword ? (
                      <p className="form-error">{errors.ConfirmPassword}</p>
                    ) : null}
                    <label>Login As a :</label>
                    <select
                    onChange={handleChange} 
                    name="Type"
                    value={values.Type}
                    >
                        <option  className="ABC" value="UnderGraduate">Under Graduate</option>
                        <option  className="ABC" value="PostGraduate">Post Graduate</option>
                        <option  className="ABC" value="ResearchScolar">Research Scholar</option>
                        <option  className="ABC" value="FacultyMember">Faculty Member</option>
                        
                    </select>
                    {!isPending? <button>Sign Up</button>:<button disabled>Signing Up...</button>}
                </form>
                <p className="Had">
                    Have a Account?
                    <br></br>
                    <span className="Login Signup">
                        <Link to="../Login">
                            Login
                        </Link>
                    </span>
                    <br></br>
                    <br></br>
                </p>
            </div>
            )}
        </>
     );
}
 
export default SignUp;
