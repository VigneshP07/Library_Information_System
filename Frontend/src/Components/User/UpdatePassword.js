import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { userSchema } from "../../Validation/UserValidation";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useAlert } from "react-alert";
import { updatePassword,clearErrors} from "../../Action/UserActions";
import { useDispatch,useSelector } from "react-redux";
import { loadUser } from "../../Action/UserActions";
import { UPDATE_PASSWORD_RESET,CLEAR_ERRORS } from "../../constants/userConstants";

const UpdatePassword = () => {
    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch();
    const initialValues = {
        OldPassword: "",
        Password: "",
        ConfirmPassword: "",
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

    const { user } = useSelector(state=>state.user)
    const {error,isUpdated,loading} = useSelector(state=>state.profile)
    useEffect(()=>{
        if(isUpdated)
        {
            alert.success('User has been updated');
            dispatch(loadUser(user._id));
            dispatch(clearErrors());
            history.push('/me');
            dispatch({type:UPDATE_PASSWORD_RESET});
        }
        if(error) 
        {
            // alert.error(error);
            history.push('/me');
            dispatch({type:CLEAR_ERRORS});
        }
    },[dispatch,alert,error,isUpdated]);

    useEffect(()=>{
        if(error) 
        {
            alert.info('A wrong Atempt Alredy cant Change password at Present');
            history.push('/me');
        }
    },[]);

    const handleUpdate = (e) => {
        const data = {
            OldPassword : values.OldPassword,
            Password: values.Password,
        };
        try{
            dispatch(updatePassword(data,user._id));
            dispatch(clearErrors());
            dispatch(loadUser(user._id));
            dispatch({type:UPDATE_PASSWORD_RESET});
        }catch(e){
            alert.error(e);
            dispatch(clearErrors());
            history.push('/me');
        }
    }

    return ( 
        <div className="SignUp">
            <h2> Update Password </h2>
            <form onSubmit={handleUpdate}>
            <label>Old Password :</label>
                <input
                type ="password"
                required
                name="OldPassword"
                autoComplete="off"
                placeholder="Old Password"
                value={values.OldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                ></input>
                <label>New Password :</label>
                <input
                type ="password"
                required
                name="Password"
                autoComplete="off"
                placeholder="New Password"
                value={values.Password}
                onChange={handleChange}
                onBlur={handleBlur}
                ></input>
                {errors.Password && touched.Password ? (
                    <p className="form-error">{errors.Password}</p>
                ) : null}
                <label>Confirm New Password :</label>
                <input
                type ="password"
                required
                autoComplete="off"
                name="ConfirmPassword"
                value={values.ConfirmPassword}
                placeholder="Confirm New Password"
                onChange={handleChange}
                onBlur={handleBlur}
                ></input>
                {errors.ConfirmPassword && touched.ConfirmPassword ? (
                    <p className="form-error">{errors.ConfirmPassword}</p>
                ) : null}
                {!loading? <button>Update Password</button>:<button disabled>Updating...</button>}
            </form>
        </div>
     );
}
 
export default UpdatePassword;
