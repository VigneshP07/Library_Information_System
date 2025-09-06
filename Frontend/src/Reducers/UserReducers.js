import {
    LOGIN_REQUEST,LOGIN_FAIL,LOGIN_SUCCESS,CLEAR_ERRORS,
    REGISTER_FAIL,REGISTER_SUCCESS,REGISTER_REQUEST,
    LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL,
    LOGOUT_SUCCESSS,LOGOUT_FAIL,UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_RESET,
    UPDATE_PROFILE_FAIL,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_REQUEST,
    ALL_USERS_FAIL,ALL_USERS_REQUEST,ALL_USERS_SUCCESS,ALL_USERS_RESET,
    DELETE_USER_FAIL,DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_RESET,
} from '../constants/userConstants'

export const userReducer = (state = {user :{}},action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
             ...state,
                loading:true,
                isAuthenticated:false,
            }
            
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
             ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload,
            }
        
        case LOGOUT_SUCCESSS:
            return{
            ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
            }
        
        case LOAD_USER_FAIL:
            return{
            ...state,
                loading:false,
                error:action.payload,
                isAuthenticated:false,
                user:null,
            }
        
        case LOGOUT_FAIL:    
            return{
            ...state,
            error:action.payload,
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
           ...state,
                loading:false,
                error:action.payload,
                isAuthenticated:false,
            }
        case CLEAR_ERRORS:
            return{
             ...state,
                error:null
            }
        default:
            return state
    }
}

export const profileReducer= (state ={},action)=>{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return{
             ...state,
                loading:true,
            }
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return{
             ...state,
                loading:false,
                isUpdated:action.payload
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return{
            ...state,
                isUpdated:false,
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return{
             ...state,
                loading:false,
                error:action.payload,
            }

        default:
            return state
    }
}

export const allUserReducer =(state = {users:[]},action)=>{
    switch(action.type){
        case ALL_USERS_REQUEST:
            return {
                loading: true,
                User:[]}
        case ALL_USERS_SUCCESS:
            return {
                loading: false,
                users:action.payload,
            }
        case ALL_USERS_FAIL:
            return {loading:false,error:action.payload}
        case CLEAR_ERRORS:
            return {...state,error:null}
        default:
            return state
    } 
}

export const DeleteUser = (state = { isDeleted: false }, action) => {
    switch(action.type){
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case DELETE_USER_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            };
        case DELETE_USER_FAIL:
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