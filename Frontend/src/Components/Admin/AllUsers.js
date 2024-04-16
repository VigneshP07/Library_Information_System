import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { MDBDataTable } from 'mdbreact';
import Loader from '../../Layouts/Loader';
import './aBooks.css';
import { useAlert } from 'react-alert';
import { useDispatch,useSelector } from 'react-redux';

const AllUsers = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const alert = useAlert();
    const {user:admin} = useSelector(state=>state.user);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/v1/admin/users/");
                const data = await response.json();
                setUsers(data?.users);
                setLoading(false);
            } catch (error) {
                alert.error(error.message);
            }
        };
        fetchData();
    }, [alert]);

    const deleteUserHandler = async (id) => {
        try {
            alert.success('User will be deleted successfully');
            await fetch(`http://localhost:4000/api/v1/admin/users/${id}`, {
                method: 'DELETE',
            });
            const response = await fetch("http://localhost:4000/api/v1/admin/users/");
            const data = await response.json();
            setUsers(data.users);
            console.log('User deleted');
        } catch (error) {
            console.error('Error deleting user:', error.message);
            alert.error('Error deleting user:');
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
                    label: 'First Name',
                    field: 'FirstName',
                    sort: 'asc'
                },
                {
                    label: 'Email Id',
                    field: 'emailid',
                    sort: 'asc'
                },
                {
                    label: 'No of Books Taken',
                    field: 'BooksTaken',
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
            if(user._id!=admin._id)
            {
                data.rows.push({
                    userName: user.userName,
                    FirstName: user.FirstName,
                    BooksTaken: user.BooksTaken.length,
                    emailid: user.EmailId,
                    action: (
                        <Fragment>
                            <button className='vinnela-btn2' onClick={() => deleteUserHandler(user._id)}>
                                Delete User
                            </button>
                        </Fragment>
                    )
                })
            }
        })
        return data;
    }

    return (
        <>
            <div style={{display:'flex', justifyContent:'center',marginBottom:'10px'}}>
                <Button variant="outlined" component={Link} to='/admin/Users/New'>Add User</Button>
                <Button variant="contained" component={Link} to='/admin/AllUsers'>All Users</Button>
                <Button variant="outlined" component={Link} to='/admin/Books'>All Books</Button>
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
                        <p className='data'>All Users</p>
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

export default AllUsers;

