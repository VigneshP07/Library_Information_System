import React, { Fragment, useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import Loader from '../../Layouts/Loader';
import './aBooks.css';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const ABookList = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
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

    const NotifyBookHandler = async (user) => {
        try {
            let num = '';
            const Time = user.Type === "UnderGraduate" ? 1 : user.Type === "PostGraduate" ? 1 : user.Type === "ResearchScolar" ? 3 : 6;
            user.BooksTaken.forEach(element => {
                if (new Date(element.date).setMonth(new Date(element.date).getMonth()+ Time) < Date.now()) {
                    num = num + `You have "${element.book}" Over Due\n`
                }
            })
            if(num!=='')
            {
                const response = await fetch(`http://localhost:4000/api/v1/notify/${user._id}`,{
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                message: `${num}`
                })});}
        alert.success('Successfully Notified');
        }catch(e){
        alert.error(e);
        }
    }

    const NotifyBookOneHandler = async (user) => {
        try {
            let num = '';
            const Time = user.Type === "UnderGraduate" ? 1 : user.Type === "PostGraduate" ? 1 : user.Type === "ResearchScolar" ? 3 : 6;
            user.BooksTaken.forEach(element => {
                if (new Date(element.date).setMonth(new Date(element.date).getMonth()+ Time) < Date.now()) {
                    num = num + `You have "${element.book}" Over Due\n`
                }
            })
            if(num!=='')
            {
            const response = await fetch(`http://localhost:4000/api/v1/notify/${user._id}`,{
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify({
            message: `${num}`
            })});}
        }catch(e){
        console.log(e);
        alert.error(e);
        }
    }

    const NotifyBookAllHandler = async () => {
        try {
            users.forEach(user => {
                NotifyBookOneHandler(user);
                })
                alert.success('Successfully Notified All Over Dues');
        }catch(e){
        console.log(e);
        alert.error(e);
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
                    if (new Date(element.date).setMonth(new Date(element.date).getMonth()+ Time) < Date.now()) {
                        data.rows.push({
                            userName: user.userName,
                            emailid: user.EmailId,
                            BookTaken: element.book,
                            Date1: new Date(element.date).toDateString(),
                            Date: new Date(new Date(element.date).setMonth(new Date(element.date).getMonth()+ Time)).toDateString(),
                            action: (
                                <Fragment>
                                    <button className='vinnela-btn1' onClick={() => NotifyBookHandler(user)}>
                                        Notify
                                    </button>
                                </Fragment>
                            )
                        })
                    }
                })
            }
        })
        return data;
    }

    return (
        <>
         <div style={{display:'flex', justifyContent:'center',marginBottom:'10px'}}>
            <Button variant="outlined" component={Link} to='/admin/Users/New'>Add User</Button>
            <Button variant="outlined" component={Link} to='/admin/AllUsers'>All Users</Button>
            <Button variant="outlined" component={Link} to='/admin/Books'>All Books</Button>
            <Button variant="outlined" component={Link} to='/admin/Books/New'>New Book</Button>
            <Button variant="outlined" component={Link} to='/admin/issue'>Issue Book</Button>
            <Button variant="outlined" component={Link} to='/admin/returnbooks'>Return Book</Button>
            <Button variant="contained" component={Link} to='/admin/overdue'>Over Due</Button>
            <Button variant="outlined" component={Link} to='/admin/stats'>Stats</Button>
        </div>
            <Fragment>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <p className='data'>
                            Over Due Books
                            <button className='vinnela-btn1 data' onClick={() => NotifyBookAllHandler()}>
                                Notify All
                            </button>
                        </p>
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