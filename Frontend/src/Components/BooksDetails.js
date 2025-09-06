import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getBooksDetails } from "../Action/BookAction";
import { loadUser } from "../Action/UserActions";
import Loader from "../Layouts/Loader";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { green } from "@mui/material/colors";

const BooksDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const history = useHistory();
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.user);


  const deleteBookHandler = async (id) => {
      console.log(`deleting ${id}`);
      try {
          const response = await fetch(`http://localhost:4000/api/v1/admin/Books/${id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (!response.ok) {
              throw new Error('Failed to delete book');
          }
          alert.success('Book deleted successfully');
          history.push('/Books');
      } catch (error) {
          console.log('Error deleting book:', error.message);
      }
    }
  const handleClick = async() => {
    try{
      const response = await fetch(`http://localhost:4000/api/v1/Books/${id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          "_id": user._id
        })
      });
    }catch(e){
      console.log(e);
      alert.error(e);
    }
    try{
      const response = await fetch(`http://localhost:4000/api/v1/me/reserve/${user._id}`,{
      method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          "book":book
        })
      });
    }catch(e){
      console.log(e);
      alert.error(e);
    }
    dispatch(loadUser(user._id));
    dispatch({type:UPDATE_PROFILE_RESET});
    alert.success('Book has been reseved');
    history.push('/Books');
  }

  const {loading: isPending,error,book} = useSelector(state => state.bookDetail)

  useEffect(()=>{
    if(error) {
      return alert.error(error);
    }else{
      dispatch(getBooksDetails(id));
    }
  },[dispatch,id,alert,error])

  return (
      
    <div className="bookdetails">
      { isPending &&  <Loader/>}
      { book && (
        <article>
          <h2>{ book.title }</h2>
          <div className="ind">
            <div>
              <img src={book.img} alt="loading..."></img>
            </div>
            <div className="matter">
              <div>
                <span>
                  Written by :
                </span>
                {book.author }
              </div>
              <div>
                <span>
                  Number of Available Copies in Library :
                </span>
                {book.acopies }
              </div>
              <div><span>ISBN number :</span> {book.ISBN}</div>
              <div><span>Genre :</span> {book.genre }</div>
              <div><span>Number of Pages in Book:</span> {book.pages}</div>
              {book.acopies>0 && <div><span>Shelf No:</span> {book.Shelf}</div>}
            </div>
          </div>
          <div><span>Description : </span>{book.desc}</div>
          <div className="hhh">
            <div>
              {book.acopies>0? <button className="ABCDF" disabled>Available</button>:<button disabled>Un Available</button>}
            </div>
            <div>
              {book.acopies===0 && Array.isArray(book.reservedById) && !book.reservedById?.length && <button className="ABCDF2" onClick={handleClick}>Reseve</button>} 
            </div>
            <div>
              {user.Type==='Admin' && book.acopies>0 && <button className="ABCDF3" onClick={()=>deleteBookHandler(book._id)}>Delete Book</button>}
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

 
export default BooksDetails;