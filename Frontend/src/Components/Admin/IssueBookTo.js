import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './aBooks.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Loader from '../../Layouts/Loader';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../Action/UserActions';

const IssueBookTo = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [bookData, setBookData] = useState([]);
    const [inputs, setInputs] = useState(['']); // State to manage input fields
    const [New, setNew] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/admin/users/${id}`);
                const data = await response.json();
                setUser(data?.user);
                setLoading(false);
            } catch (error) {
                alert.error(error.message);
            }
        };
        fetchData();
    }, [id, alert]);

    let Num = user.Type === "UnderGraduate" ? 2 : user.Type === "PostGraduate" ? 4 : user.Type === "ResearchScolar" ? 6 : 10;
    Num = Num - user.BooksTaken?.length;
    const fetchBookData = async (index) => {
        try {
            if(inputs[index]!== "")
            {
            const response = await fetch(`http://localhost:4000/api/v1/Books/` + inputs[index]);
            const data = await response.json();
            if (data.status !== false) {
                setBookData((prevBookData) => {
                    const updatedBookData = [...prevBookData];
                    updatedBookData[index] = data;
                    return updatedBookData;
                });
            } else {
                setBookData((prevBookData) => {
                    const updatedBookData = [...prevBookData];
                    updatedBookData[index] = null;
                    return updatedBookData;
                });
            }}
        } catch (error) {
            alert.error(error.message);
        }
    };

    const handleAddInput = () => {
        setInputs([...inputs, '']);
        setBookData([...bookData, '']);
        setNew(New + 1);
    };

    const handleChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleDeleteInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
        const newBookData = bookData.filter((_, i) => i !== index);
        setBookData(newBookData);
        setNew(New - 1);
    };

    const handleIssue = async () => {
        if (inputs?.length > 0) {
            inputs.forEach(async (input, index) => {
                try {

                    const response1 = await fetch(`http://localhost:4000/api/v1/Books/` + inputs[index]);
                    const data = await response1.json();
                    if(data.books?.reservedById?.length !== 0 || data.books.reservedById[0] !== user._id)
                    {
                        const responsef = await fetch(`http://localhost:4000/api/v1/RemoveReserve/` + data.books.reservedById[0],{
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: data.books._id,
                            }),
                        });
                    }
                    const response = await fetch(`http://localhost:4000/api/v1/TakenBook/${input}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            _id: user._id,
                        }),
                    });
                    const data1 = await response.json();
                    const issue = await fetch(`http://localhost:4000/api/v1/BookTaken/${user._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            data: {
                                date: new Date(),
                                book: data1.books?.title,
                                _id: input,
                            }
                        }),
                    });

                } catch (error) {
                    alert.error('Error occurred:', error);
                    history.pushState('/admin/issue')
                }
            });
            alert.success('Book Issued Successfully');
            history.push('/admin/Users/New')
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <Button variant="outlined" component={Link} to='/admin/Users/New'>Add User</Button>
                <Button variant="outlined" component={Link} to='/admin/AllUsers'>All Users</Button>
                <Button variant="outlined" component={Link} to='/admin/Books'>All Books</Button>
                <Button variant="outlined" component={Link} to='/admin/Books/New'>New Book</Button>
                <Button variant="contained" component={Link} to='/admin/issue'>Issue Book</Button>
                <Button variant="outlined" component={Link} to='/admin/returnbooks'>Return Book</Button>
                <Button variant="outlined" component={Link} to='/admin/overdue'>Over Due</Button>
                <Button variant="outlined" component={Link} to='/admin/stats'>Stats</Button>
            </div>
            {loading ? <Loader /> :
                (
                    <Fragment>
                        <p className='data'>Issuing Book To : {user.userName}</p>
                        <div className='SignUp'>
                            <form className='ADST'>
                                {inputs.map((input, index) => (
                                    <div key={index} className='BookName'>
                                        {index+1}:
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                        />
                                        <Button onClick={() => fetchBookData(index)}>
                                            Browse
                                        </Button>
                                        <div>
                                        {bookData[index]?.books ? (
                                            bookData[index].books.reservedById?.length === 0 || bookData[index].books.reservedById[0] === user._id ? (
                                                bookData[index]?.books?.acopies > 0 ? (
                                                    <span>{bookData[index]?.books?.title}</span>
                                                ) : (
                                                    <span>Book is Unavailable</span>
                                                )
                                            ) : (
                                                <span>Already Reserved by Other</span>
                                            )
                                        ) : (
                                            <span>Wrong Id</span>
                                        )}
                                        </div>
                                        <Button onClick={() => handleDeleteInput(index)}>-</Button>
                                    </div>
                                ))}
                            </form>
                            <div className='IssueButtons'>
                                {New < Num && <Button onClick={handleAddInput}>+</Button>}
                                {New>0 && <button onClick={handleIssue} className="Issue_all">Issue All</button>}
                            </div>
                        </div>
                    </Fragment>
                )}
        </>
    );
};

export default IssueBookTo;
