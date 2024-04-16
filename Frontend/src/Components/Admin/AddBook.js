import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { newBook, clearErrors } from '../../Action/BookAction';
import EditIcon from '@mui/icons-material/Edit';
import { NEW_BOOK_RESET } from '../../constants/booksConstants';

const NewBook = () => {
    const [values, setValues] = useState({
        title: '',
        author: '',
        tcopies: '',
        acopies: '',
        ISBN: '',
        img: '',
        genre: '',
        pages: '',
        desc: '',
        Shelf: ''
    });

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, error, success } = useSelector(state => state.newBookReducer);

    useEffect(() => {
        if (success) {
            alert.success('Book Added Successfully');
            history.push('/admin/Users/New');
            dispatch({ type: NEW_BOOK_RESET });
        }
        if (error) {
            alert.show(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, success, error, history]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const handleAddData = (e) => {
        e.preventDefault();
        const data = {
            title: values.title,
            author: values.author,
            tcopies: values.tcopies,
            acopies: values.acopies,
            ISBN: values.ISBN,
            img: values.img,
            genre: values.genre,
            pages: values.pages,
            desc: values.desc,
            Shelf: values.Shelf
        };
        console.log(data);
        dispatch(newBook(data));
    }

    return (
        <>
         <div style={{display:'flex', justifyContent:'center',marginBottom:'10px',marginTop:'-25px',backgroundColor:'#02001990'}}>
            <Button variant="outlined" component={Link} to='/admin/Users/New'>Add User</Button>
            <Button variant="outlined" component={Link} to='/admin/AllUsers'>All Users</Button>
            <Button variant="outlined" component={Link} to='/admin/Books'>All Books</Button>
            <Button variant="contained" component={Link} to='/admin/Books/New'>New Book</Button>
            <Button variant="outlined" component={Link} to='/admin/issue'>Issue Book</Button>
            <Button variant="outlined" component={Link} to='/admin/returnbooks'>Return Book</Button>
            <Button variant="outlined" component={Link} to='/admin/overdue'>Over Due</Button>
            <Button variant="outlined" component={Link} to='/admin/stats'>Stats</Button>
        </div>
        <Fragment>
            <section className="SignUp">
                <h2>New Book</h2>
                <form onSubmit={handleAddData}>
                    <label htmlFor="title_field">Title:</label>
                    <input type="text" id="title_field" name="title" className="form-control" value={values.title} onChange={handleChange} />
                    <label htmlFor="author_field">Author:</label>
                    <input type="text" id="author_field" name="author" className="form-control" value={values.author} onChange={handleChange} />
                    <label htmlFor="tcopies_field">Total Copies:</label>
                    <input type="number" min={0} id="tcopies_field" name="tcopies" className="form-control" value={values.tcopies} onChange={handleChange} />
                    <label htmlFor="acopies_field">Available Copies:</label>
                    <input type="number" min={0} id="acopies_field" name="acopies" className="form-control" value={values.acopies} onChange={handleChange} />
                    <label htmlFor="ISBN_field">ISBN:</label>
                    <input type="text" id="ISBN_field" name="ISBN" className="form-control" value={values.ISBN} onChange={handleChange} />
                    <label htmlFor="img_field">Image:</label>
                    <input type="text" id="img_field" name="img" className="form-control" onChange={handleChange} />
                    <label htmlFor="genre_field">Genre:</label>
                    <input type="text" id="genre_field" name="genre" className="form-control" value={values.genre} onChange={handleChange} />
                    <label htmlFor="pages_field">Pages:</label>
                    <input type="number" min={0} id="pages_field" name="pages" className="form-control" value={values.pages} onChange={handleChange} />
                    <label htmlFor="desc_field">Description:</label>
                    <textarea type="text" id="desc_field" name="desc" className="form-control" value={values.desc} onChange={handleChange} />
                    <label htmlFor="Shelf_field">Shelf:</label>
                    <input id="Shelf_field" name="Shelf" className="form-control" value={values.Shelf} onChange={handleChange} />
                    
                    <button type="submit" disabled={loading ? true : false}>
                        CREATE
                    </button>
                </form>
            </section>
        </Fragment>
        </>
    );
}

export default NewBook;
