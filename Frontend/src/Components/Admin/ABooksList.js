import React, { Fragment, useEffect, useState } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Loader from '../../Layouts/Loader';
import './aBooks.css';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminBooks, clearErrors, deleteBook } from '../../Action/BookAction';
import { Button } from '@mui/material';
// import { DELETE_BOOK_RESET,DELETE_BOOK_REQUEST,DELETE_BOOK_SUCCESS,DELETE_BOOK_FAIL } from '../../constants/booksConstants';

const ABookList = () => {
    const dispatch = useDispatch();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const {error} = useSelector(state => state.books);
    const history = useHistory();
    const alert = useAlert();

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
            history.push('/admin/Users/New');
        } catch (error) {
            console.log('Error deleting book:', error.message);
        }
    }
    

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/admin/Books/");
            const data = await response.json();
            setBooks(data?.books);
            setLoading(false);
        } catch (error) {

            alert.error(error.message);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [dispatch, alert]);
    

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [error, dispatch, alert,history]);

    const seBooks = () => {
        const data ={
            columns: [
                {
                    label: (
                        <div>
                        Title 
                        {/* <SortIcon/> */}
                        </div>
                        ),
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: (
                        <div>
                        Author
                        </div>
                        ),
                    field: 'author',
                    sort: 'asc'
                },
                {
                    label: (
                        <div>
                        Id
                        </div>
                        ),
                    field: 'Id',
                    sort: 'asc'
                },
                {
                    label: 'Books Available',
                    field: 'abooks',
                    sort: 'asc'
                },
                {
                    label: 'Availability',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'LastIssue Date',
                    field: 'Date',
                    sort: 'asc'
                },
                {
                    label: 'Shelf Number',
                    field: 'number',
                    sort: 'asc'
                },
                {
                    label: 'Action',
                    field: 'action',
                }
            ],
            rows: [],
        
        }
        
        books?.forEach(book=>{
            data.rows.push({
                title:book.title,
                author:book.author,
                Id:book._id,
                abooks:book.acopies,
                status:!book.acopies? 'Not Available':(book.acopies>book.reservedById.length)? 'Available':'Reserved',
                Date:book.LastAllotedDate.substring(0,10),
                number:(book.acopies)? book.Shelf:'Na',
                action: (
                    <Fragment>
                        <button className='vinnela-btn2' onClick={()=>deleteBookHandler(book._id)}>
                            Delete Book
                        </button>
                    </Fragment>
                )
                
            })
        })
        return data;
    }
    

    return (
        <>
        <div style={{display:'flex', justifyContent:'center',marginBottom:'10px',marginTop:'-25px',backgroundColor:'#02001990'}}>
      <Button variant="outlined" component={Link} to='/admin/Users/New'>Add User</Button>
        <Button variant="outlined" component={Link} to='/admin/AllUsers'>All Users</Button>
      <Button variant="contained" component={Link} to='/admin/Books'>All Books</Button>
      <Button variant="outlined" component={Link} to='/admin/Books/New'>New Book</Button>
      <Button variant="outlined" component={Link} to='/admin/issue'>Issue Book</Button>
      <Button variant="outlined" component={Link} to='/admin/returnbooks'>Return Book</Button>
      <Button variant="outlined" component={Link} to='/admin/overdue'>Over Due</Button>
      <Button variant="outlined" component={Link} to='/admin/stats'>Stats</Button>
        </div>
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <p className='data'>All Books</p>
                    <div className="table-container">
                        <MDBDataTable
                            striped
                            bordered
                            small
                            className="table"
                            data={seBooks()}
                        />
                    </div>
                </Fragment>
            )}
        </Fragment>
        </>
    );
};

export default ABookList;