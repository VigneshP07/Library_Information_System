import BooksList from "./Components/BooksList";
import { useState,useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loader from "./Layouts/Loader";
import {useDispatch,useSelector} from 'react-redux';
import {getAllBooks} from './Action/BookAction';
import { useAlert } from "react-alert";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10); 
    const {loading: isPending,error,booksCount,book:books} = useSelector(state=>state.books)
    useEffect(() =>{
        if(error) {
           return alert.error(error);
        }
        dispatch(getAllBooks(searchTerm,currentPage));
    },[dispatch,error,currentPage,searchTerm,alert]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (  
        <div className="home">
            { isPending && <Loader /> }   
            { books && <BooksList books={books}/> }
            {books && books.length && booksPerPage<=booksCount && (
            <Stack spacing={2} className="pagination">
                <Pagination 
                    className="Pagination"
                    count={Math.ceil((booksCount || 0) / booksPerPage)} 
                    color="primary"
                    onChange={handleChange} 
                    page={currentPage}
                />
            </Stack>)}
        </div>
    );
}

export default Home;
