import React, { Fragment, useEffect, useState } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Loader from '../../Layouts/Loader';
import './aBooks.css';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminBooks, clearErrors } from '../../Action/BookAction';
import { Button } from '@mui/material';

const ABookList = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();
    const [books, setBooks] = useState([]);

    const { loading, error} = useSelector(state => state.books);

    const deleteBookHandler = async (id) => {
        console.log(`deleting ${id}`);
        try {
            const response = await fetch(`http://localhost:4000/api/v1/admin/Books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                    // You may need to include additional headers if required by your API
                }
            });
            if (!response.ok) {
                console.log('1')
                throw new Error('Failed to delete book');
            }
            alert.success('Book deleted successfully');
        } catch (error) {
            console.lolg('Error deleting book:', error.message);
        }
    }
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/v1/admin/Books/");
                const data = await response.json();
                setBooks(data?.books); // Update state with fetched data
            } catch (error) {
                alert.error(error.message);
            }
        };
        fetchData(); // Call the async function to fetch data
        dispatch(getAdminBooks()); // Dispatch action to fetch data using Redux
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
            if(new Date(book.LastAllotedDate).setFullYear(new Date(book.LastAllotedDate).getFullYear()+5)<new Date().getTime()){
            data.rows.push({
                title:book.title,
                author:book.author,
                abooks:book.acopies,
                status:!book.acopies? 'Not Available':(book.acopies>book.reservedById.length)? 'Available':'Reserved',
                Date:book.LastAllotedDate.substring(0,10),
                number:(book.acopies)? book.Shelf:'Na',
                action: (
                    <Fragment>
                        <button className='vinnela-btn2' onClick={()=>deleteBookHandler(book._id)}>
                            Dispose Book
                        </button>
                    </Fragment>
                )
                
            })}
        })
        return data;
    }
    

    return (
        <>
        <div style={{display:'flex', justifyContent:'center',marginBottom:'10px',marginTop:'-25px',backgroundColor:'#02001990'}}>
            <Button variant="outlined" component={Link} to='/admin/Users/New'>Add User</Button>
            <Button variant="outlined" component={Link} to='/admin/AllUsers'>All Users</Button>
            <Button variant="outlined" component={Link} to='/admin/Books'>All Books</Button>
            <Button variant="outlined" component={Link} to='/admin/Books/New'>New Book</Button>
            <Button variant="outlined" component={Link} to='/admin/issue'>Issue Book</Button>
            <Button variant="outlined" component={Link} to='/admin/returnbooks'>Return Book</Button>
            <Button variant="outlined" component={Link} to='/admin/overdue'>Over Due</Button>
            <Button variant="contained" component={Link} to='/admin/stats'>Stats</Button>
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