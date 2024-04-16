import {ALL_BOOKS_REQUEST,ALL_BOOKS_SUCCESS,ALL_BOOKS_FAIL, CLEAR_ERRORS,
        BOOK_SUCCESS,BOOK_REQUEST,BOOK_FAIL,
        ADMIN_BOOKS_FAIL,ADMIN_BOOKS_REQUEST,ADMIN_BOOKS_SUCCESS,
        NEW_BOOK_FAIL,NEW_BOOK_SUCCESS,NEW_BOOK_REQUEST,NEW_BOOK_RESET,
        DELETE_BOOK_FAIL,DELETE_BOOK_SUCCESS,DELETE_BOOK_REQUEST,DELETE_BOOK_RESET,
    } from '../constants/booksConstants';

export const bookReducer =(state = {book:[]},action)=>{
    switch(action.type){
        case ALL_BOOKS_REQUEST:
        case ADMIN_BOOKS_REQUEST:
            return {
                loading: true,
                Books:[]}
        case ALL_BOOKS_SUCCESS:
            return {
                loading: false,
                book:action.payload.books,
                booksCount: action.payload.booksCount
            }
        case ADMIN_BOOKS_SUCCESS:
            return {
                loading: false,
                book:action.payload,
            }
        case ALL_BOOKS_FAIL:
        case ADMIN_BOOKS_FAIL:
            return {loading:false,error:action.payload}
        case CLEAR_ERRORS:
            return {...state,error:null}
        default:
            return state
    } 
}

export const bookDetailReducer =(state = {book:[]},action)=>{
    switch(action.type){
        case BOOK_REQUEST:
            return {
                loading: true,
                Books:[]}
        case BOOK_SUCCESS:
            return {
                loading: false,
                book:action.payload.books,
            }
        case BOOK_FAIL:
            return {loading:false,error:action.payload}
        case CLEAR_ERRORS:
            return {...state,error:null}
        default:
            return state
    }
}

export const newBookReducer =(state = {book:{}},action)=>{
    switch(action.type){
        case NEW_BOOK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEW_BOOK_SUCCESS:
            return {
                loading: false,
                success:action.payload.success,
                book:action.payload.book
            }
        case NEW_BOOK_RESET:
            return {
                loading: false,
                success:false,
                book:{}
            }
        case NEW_BOOK_FAIL:
            return {loading:false,error:action.payload}
        case CLEAR_ERRORS:
            return {...state,error:null}
        default:
            return state
    }
}

export const DUBookReducer = (state = { isDeleted: false }, action) => {
    switch(action.type){
        case DELETE_BOOK_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case DELETE_BOOK_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            };
        case DELETE_BOOK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

