import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { userSchema } from "../../Validation/UserValidation";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import axios from "axios";

const AddUser = () => {
    const [userName,setUserName] = useState('');
    const alert = useAlert();
    const history = useHistory();
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
    
    const handleLogIn = (e) => {
        e.preventDefault();
        const RandomNumber = Math.floor(1000+9000*Math.random());
        const short = values.Type==="UnderGraduate"? 'UG':values.Type==="PostGraduate"? 'PG':values.Type==="ResearchScolar"? 'RS':values.Type ==="FacultyMember"? 'FM':'AD';
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
        axios.post('http://localhost:4000/api/v1/register',data);
        alert.success('User Created Successfully With User Name: ' + generatedUserName);
        history.push('/');
    }

    return ( 
        <>
        <div style={{display:'flex', justifyContent:'center',marginBottom:'10px',marginTop:'-25px',backgroundColor:'#02001990'}}>
            <Button variant="contained" component={Link} to='/admin/Users/New'>Add User</Button>
            <Button variant="outlined" component={Link} to='/admin/AllUsers'>All Users</Button>
            <Button variant="outlined" component={Link} to='/admin/Books'>All Books</Button>
            <Button variant="outlined" component={Link} to='/admin/Books/New'>New Book</Button>
            <Button variant="outlined" component={Link} to='/admin/issue'>Issue Book</Button>
            <Button variant="outlined" component={Link} to='/admin/returnbooks'>Return Book</Button>
            <Button variant="outlined" component={Link} to='/admin/overdue'>Over Due</Button>
            <Button variant="outlined" component={Link} to='/admin/stats'>Stats</Button>

        </div>
            <div className="SignUp">
                <h2> Create User </h2>
                <form onSubmit={handleLogIn} className="myForm">
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
                    <label>Add user as a :</label>
                    <select
                    onChange={handleChange} 
                    name="Type"
                    value={values.Type}
                    >
                        <option  className="ABC" value="UnderGraduate">Under Graduate</option>
                        <option  className="ABC" value="PostGraduate">Post Graduate</option>
                        <option  className="ABC" value="ResearchScolar">Research Scholar</option>
                        <option  className="ABC" value="FacultyMember">Faculty Member</option>
                        <option  className="ABC" value="Admin">Admin</option>
                        
                    </select>
                    <button>Create User</button>
                </form>
            </div>
        </>
     );
}
 
export default AddUser;
