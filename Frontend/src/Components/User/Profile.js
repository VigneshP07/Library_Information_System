import React,{Fragment, useEffect} from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector,useDispatch } from "react-redux";
import Loader from "../../Layouts/Loader";
import { loadUser } from "../../Action/UserActions";
import './Profile.css'
const Profile = () => {
    const dispatch = useDispatch();
    const {user,loading} = useSelector((state) => state.user);
    return ( 
        <Fragment>
            {loading? <Loader />:(
                <div className="profile">
                <h1 className="profile-heading">My Profile</h1>
                <div className="mainpartprofile">
                <div className="profile-info">
                    <p className="profile-info-item"><span>User Name:</span>{user.userName}</p>
                    <p className="profile-info-item"><span>First Name:</span> {user.FirstName}</p>
                    <p className="profile-info-item"><span>Last Name:</span> {user.LastName}</p>
                    <p className="profile-info-item"><span>Email ID:</span> {user.EmailId}</p>
                    <p className="profile-info-item"><span>Books in Possession:</span> {Array.isArray(user.BooksTaken) && user.BooksTaken?.length}</p>
                    {Array.isArray(user.BooksTaken) && user.BooksTaken.map((book,index)=>(
                        <p className="profile-info-item1" key={book._id}>{index+1}.{book.book}</p>))
                    }
                    <p className="profile-info-item"><span>Number of Books Reserved:</span> {Array.isArray(user.ReservedBooks) && user.ReservedBooks?.length}</p>
                    {/* {user.Message!=='' && <p className="profile-info-item">Notification:</p>} */}
                    {/* {user.Message!=='' && <p className="profile-info-item1" dangerouslySetInnerHTML={{__html: user.Message.replace(/\n/g, '<br/>') }}/>} */}
                </div>
                <div className="profile-links">
                    <Link to='/me/update' className="profile-link">EDIT PROFILE</Link>
                    <Link to='/password/update' className="profile-link">EDIT PASSWORD</Link>
                </div>
                </div>
                </div>
            )}
        </Fragment>
     );
}
 
export default Profile;