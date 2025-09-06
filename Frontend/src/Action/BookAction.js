import axios from 'axios'

import {ALL_BOOKS_REQUEST,ALL_BOOKS_SUCCESS,ALL_BOOKS_FAIL, CLEAR_ERRORS,
        BOOK_FAIL,BOOK_REQUEST,BOOK_SUCCESS,
        ADMIN_BOOKS_FAIL,ADMIN_BOOKS_REQUEST,ADMIN_BOOKS_SUCCESS,
        NEW_BOOK_FAIL,NEW_BOOK_SUCCESS,NEW_BOOK_REQUEST,DELETE_BOOK_RESET,
        DELETE_BOOK_FAIL,DELETE_BOOK_SUCCESS,DELETE_BOOK_REQUEST,NEW_BOOK_RESET,
    } from '../constants/booksConstants';

export const getAllBooks = (searchTerm='',currentPage=1) => async (dispatch) => {
    try {
        dispatch({type: ALL_BOOKS_REQUEST});
        const {data} = await axios.get(`http://localhost:4000/api/v1/Books?keyword=${searchTerm}&page=${currentPage}`);
        dispatch({type: ALL_BOOKS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ALL_BOOKS_FAIL, payload: error.response.data});
    }
}

export const getBooksDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: BOOK_REQUEST});
        const {data} = await axios.get('http://localhost:4000/api/v1/Books/'+id);
        dispatch({type: BOOK_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: BOOK_FAIL, payload: error.response.data});
    }
}

export const newBook = (bookData) => async (dispatch) => {
    try {
        dispatch({type: NEW_BOOK_REQUEST});
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        console.log(bookData);
        const {data} = await axios.post('http://localhost:4000/api/v1/admin/Books/New',bookData,config);
        dispatch({type: NEW_BOOK_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: NEW_BOOK_FAIL, payload: error.response.data});
    }
}

export const getAdminBooks = () => async (dispatch) => {
    try {
        dispatch({type: ADMIN_BOOKS_REQUEST,loading: true});
        const {data} = await axios.get('http://localhost:4000/api/v1/admin/Books/');
        dispatch({type: ADMIN_BOOKS_SUCCESS, payload: data,loading: false});
    } catch (error) {
        dispatch({type: ADMIN_BOOKS_FAIL, payload: error.response.data,loading: false});
    }
}

export const deleteBook = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_BOOK_REQUEST});
        const {data} = await axios.delete(`http://localhost:4000/api/v1/admin/Books/${id}`);
        console.log('Sucessfully deleted');
        dispatch({type: DELETE_BOOK_SUCCESS, payload: data.sucess});
    } catch (error) {
        dispatch({type: DELETE_BOOK_FAIL, payload: error.response.data});
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}