import * as yup from "yup";

export const userSchema = yup.object().shape({
    FirstName: yup.string().required('Please enter your First Name'),
    LastName: yup.string().required('Please enter your Last Name'),
    EmailId: yup.string().email('Please enter a Valid email address').required('Email is required'),
    Password: yup.string().min(8).max(12).matches(/^(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]+$/,'Password must contain at least one lowercase letter.').matches(/^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]+$/,'Password must contain at least one uppercase letter.').matches(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]+$/,'Password must contain at least one number.').matches(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,'Password must contain at least one symbol').required('Please enter your password'),
    ConfirmPassword : yup.string().oneOf([yup.ref("Password"),null],"Password Must match").required('Please confirm your password'),
})
 
