import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { MDBDataTable } from 'mdbreact';
import Loader from '../../Layouts/Loader';
import './aBooks.css';
import { useAlert } from 'react-alert';
import { useDispatch,useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

const ABookList = () => {
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
                    label: 'No of Books Can be Taken',
                    field: 'NewBooks',
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
                const Num = user.Type === "UnderGraduate" ? 2 : user.Type === "PostGraduate" ? 4 : user.Type === "ResearchScolar" ? 6 : 10;
                data.rows.push({
                    userName: user.userName,
                    FirstName: user.FirstName,
                    BooksTaken: user.BooksTaken.length,
                    emailid: user.EmailId,
                    NewBooks: Num - user.BooksTaken.length,
                    action: (
                        <Fragment>
                            <Link to={`/admin/IssueBookTo/${user._id}`}>
                                {user.BooksTaken?.length===Num ?
                                    <button className='vinnela-btn1' disabled>
                                        Issue Book
                                    </button>:
                                    <button className='vinnela-btn1'>
                                        Issue Book
                                    </button>
                                }
                            </Link>
                        </Fragment>
                    )
                })
            }})
        return data;
    }

    return (
        <>
            <div style={{display:'flex', justifyContent:'center',marginBottom:'10px'}}>
                <Button variant="outlined" component={Link} to='/admin/Users/New'>Add User</Button>
                <Button variant="outlined" component={Link} to='/admin/AllUsers'>All Users</Button>
                <Button variant="outlined" component={Link} to='/admin/Books'>All Books</Button>
                <Button variant="outlined" component={Link} to='/admin/Books/New'>New Book</Button>
                <Button variant="contained" component={Link} to='/admin/issue'>Issue Book</Button>
                <Button variant="outlined" component={Link} to='/admin/returnbooks'>Return Book</Button>
                <Button variant="outlined" component={Link} to='/admin/overdue'>Over Due</Button>
                <Button variant="outlined" component={Link} to='/admin/stats'>Stats</Button>
            </div>
            <Fragment>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <p className='data'>Issue Book</p>
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

