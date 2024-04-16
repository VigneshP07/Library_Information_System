import { useState,useEffect,Fragment } from "react";
import { Link } from "react-router-dom";
import { userSchema } from "../../Validation/UserValidation";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useAlert } from "react-alert";
import { updateProfile,clearErrors} from "../../Action/UserActions";
import { useDispatch,useSelector } from "react-redux";
import { loadUser } from "../../Action/UserActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch();
    const initialValues = {
        FirstName: "",
        LastName: "",
        EmailId:"",
    };


    const { user } = useSelector(state=>state.user)
    const {error,isUpdated,loading} = useSelector(state=>state.profile)
    const { values, handleBlur, handleChange, errors, touched } =
    useFormik({
    initialValues,
    validationSchema: userSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
        action.resetForm();
    },});
    useEffect(()=>{
        if(isUpdated)
        {
            alert.success('User has been updated');
            dispatch(loadUser(user._id));
            history.push('/me')
            dispatch({type:UPDATE_PROFILE_RESET})
        }
        if(error) 
        {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[dispatch,alert,error,isUpdated]);
    
    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            id:user.id,
            FirstName: values.FirstName,
            LastName: values.LastName,
            EmailId: values.EmailId,
        };
        try{
            dispatch(updateProfile(data,user._id));
            dispatch(loadUser(user._id));
            dispatch({type:UPDATE_PROFILE_RESET});
        }catch(e){
            alert.error(e);
            dispatch(clearErrors());
        }
    }

    return ( 
        <Fragment>
            <div className="SignUp">
                <h2> Update Profile </h2>
                <form onSubmit={handleUpdate}>
                    <label>First Name :</label>
                    <input 
                    type="text" 
                    required 
                    name="FirstName"
                    value={values.FirstName}
                    placeholder={user.FirstName}
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
                    placeholder={user.LastName}
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
                    placeholder={user.EmailId}
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.EmailId && touched.EmailId ? (
                      <p className="form-error">{errors.EmailId}</p>
                    ) : null}
                    {!loading? <button>Update Profile</button>:<button disabled>Updating...</button>}
                </form>
            </div>
            </Fragment>)
            
}

 
export default UpdateProfile;