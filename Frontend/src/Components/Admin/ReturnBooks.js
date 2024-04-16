import React, { Fragment, useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Loader from '../../Layouts/Loader';
import './aBooks.css';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch ,useSelector } from 'react-redux';
import { Button } from '@mui/material';


const ABookList = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/v1/admin/users/");
                const data = await response.json();
                setUsers(data?.users); // Update state with fetched data
                setLoading(false); // Update loading state
            } catch (error) {
                alert.error(error.message);
            }
        };
        fetchData(); // Call the async function to fetch data
    }, [dispatch, alert]);

    const returnBookHandler = async (user, element,fine,currentDate,endDate,date) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/DeleteBookTaken/${user._id}`,{
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                data : element,
            })});
            const response2 = await fetch(`http://localhost:4000/api/v1/UpdateAvailbility/${element._id}`,{
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                data : user._id,
                fine : fine,
                user : user,
                element : date,
                currentDate : currentDate,
                endDate : endDate,
            })});
            const response3 = await fetch(`http://localhost:4000/api/v1/Books/${element._id}`);
            const data = await response3.json();
            if (data?.books?.reservedById?.length !== 0) {
                const response = await fetch(`http://localhost:4000/api/v1/availablenotify/${data?.books.reservedById[0]}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: `The Reserved Book,${data.books.title} is now available in the Library Now. Please issue the book before anyone else issues it.`
                    })
                });
            }
            alert.success('Book Status Updated Sucessfully');
            history.push('/admin/Users/New');
        } catch (error) {
            console.error('Error deleting book:', error.message);
            alert.error('Error Returning Book');
        }
    }

    const seUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User Name',
                    field: 'userName',
                    sort: 'asc'
                },
                {
                    label: 'Email Id',
                    field: 'emailid',
                    sort: 'asc'
                },
                {
                    label: 'Book Taken',
                    field: 'BookTaken',
                    sort: 'asc'
                },
                {
                    label: 'Issue Date',
                    field: 'Date1',
                    sort: 'asc'
                },
                {
                    label: 'Due Date',
                    field: 'Date',
                    sort: 'asc'
                },
                {
                    label: 'Fine',
                    field: 'fine',
                    sort: 'asc'
                },
                {
                    label: 'Action',
                    field: 'action',
                }
            ],
            rows: [],
        }

        users.forEach(user => {
            if (user.BooksTaken.length) {
                const Time = user.Type === "UnderGraduate" ? 1 : user.Type === "PostGraduate" ? 1 : user.Type === "ResearchScolar" ? 3 : 6;
                
                user.BooksTaken.forEach(element => {
                    const currentDate = new Date();
                    const currentDate1 = new Date().toDateString();
                    const endDate = new Date(element.date).setMonth(new Date(element.date).getMonth() + Time);
                    const endDate1 = new Date(endDate).toDateString();
                    const differenceInMilliseconds = currentDate - endDate;
                    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
                    const differenceInDays = Math.ceil(differenceInMilliseconds / oneDayInMilliseconds);
                    const fine = differenceInDays > 0 ? differenceInDays * 10 : 0;
                    data.rows.push({
                        userName: user.userName,
                        emailid: user.EmailId,
                        BookTaken: element.book,
                        Date1: new Date(element.date).toDateString(),
                        Date: new Date(endDate).toDateString(), 
                        fine: fine, 
                        action: (
                            <Fragment>
                                <button className='vinnela-btn2' onClick={() => returnBookHandler(user, element,fine,currentDate1,endDate1,new Date(element.date).toDateString())}>
                                    Return Book
                                </button>
                            </Fragment>
                        )
                    });
                })
            }
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
            <Button variant="contained" component={Link} to='/admin/returnbooks'>Return Book</Button>
            <Button variant="outlined" component={Link} to='/admin/overdue'>Over Due</Button>
            <Button variant="outlined" component={Link} to='/admin/stats'>Stats</Button>
        </div>
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <p className='data'>Return Book</p>
                    <div className="table-container">
                        <MDBDataTable
                            striped
                            bordered
                            small
                            className="table"
                            data={seUsers()}
                        />
                    </div>
                </Fragment>
            )}
        </Fragment>
        </>
    );
};

export default ABookList;