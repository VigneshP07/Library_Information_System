import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BooksList = ({books}) => {
    return ( 
        <div className="bookslist">
            {Array.isArray(books) && 
             books?.map(book=>(
                 <div className="book" key={book._id}>
                     <Link to ={`/Books/${book._id}`}>
                         <h2>{ book.title }</h2>
                         <p>Written by { book.author }</p>
                     </Link>
                 </div>
             ))}
        </div>
     );
}
 
export default BooksList;