import {
    LOGIN_REQUEST,LOGIN_FAIL,LOGIN_SUCCESS,CLEAR_ERRORS,
    REGISTER_FAIL,REGISTER_SUCCESS,REGISTER_REQUEST,
    LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL,
    LOGOUT_SUCCESSS,LOGOUT_FAIL,
    UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_REQUEST,
    ALL_USERS_FAIL,ALL_USERS_REQUEST,ALL_USERS_SUCCESS,ALL_USERS_RESET,
    DELETE_USER_FAIL,DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_RESET,
} from '../constants/userConstants'

import axios from 'axios'

export const login = (Username,Password) => async (dispatch) => {
    try{
    dispatch({type:LOGIN_REQUEST})
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const {data} = await axios.post('http://localhost:4000/api/v1/login',{Username,Password},config)
    // localStorage.setItem('JWT', data.JWT);
    dispatch({type:LOGIN_SUCCESS,payload:data.user})
    }catch(err){
        dispatch({type:LOGIN_FAIL,payload:err.response.data.message})
    }
}

export const register = (userData) => async (dispatch) => { 
    try{
    dispatch({type:REGISTER_REQUEST})
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const {data} = await axios.post('http://localhost:4000/api/v1/register',userData,config)
    dispatch({type:REGISTER_SUCCESS,payload:data.user})
    }catch(err){
        dispatch({type:REGISTER_FAIL,payload:err.response.data.message})
    }
}

export const loadUser =(id) => async (dispatch)=>{
    try{
        dispatch({type:LOAD_USER_REQUEST})
        const {data} = await axios.get(`http://localhost:4000/api/v1/me/${id}`)
        dispatch({type:LOAD_USER_SUCCESS,payload:data.user})
    }catch(err){
        dispatch({type:LOAD_USER_FAIL,payload:err.response.data.message})
    }
}

export const Logout =() => async (dispatch) =>{
    try{
        await axios.get('http://localhost:4000/api/v1/logout')
        dispatch({type:LOGOUT_SUCCESSS})
    }catch(err){
        dispatch({type:LOGOUT_FAIL,payload:err.response})
    }
}

export const updateProfile = (userData,id) => async (dispatch) => {
    
    try{
    dispatch({type:UPDATE_PROFILE_REQUEST})
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const {data} = await axios.patch(`http://localhost:4000/api/v1/me/update/${id}`,userData,config)
    dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.success})
    }catch(err){
        console.log(err)
        dispatch({type:UPDATE_PROFILE_FAIL,payload:err.response.data.message})
    }
}

export const updatePassword = (userData,id) => async (dispatch) => {
    
    try{
    dispatch({type:UPDATE_PASSWORD_REQUEST})
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const {data} = await axios.patch(`http://localhost:4000/api/v1/password/update/${id}`,userData,config)
    dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:data.success})
    }catch(err){
        dispatch({type:UPDATE_PASSWORD_FAIL,payload:err.response.data.message})
    }
}

export const getAllUsers = () => async (dispatch) => {
    try{
    dispatch({type:ALL_USERS_REQUEST})
    const {data} = await axios.get('http://localhost:4000/api/v1/admin/users')
    dispatch({type:ALL_USERS_SUCCESS,payload:data.users})
    }catch(err){
        dispatch({type:ALL_USERS_FAIL,payload:err.response.data.message})
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try{
    dispatch({type:DELETE_USER_REQUEST})
    const {data} = await axios.delete(`http://localhost:4000/api/v1/admin/users/${id}`)
    dispatch({type:DELETE_USER_SUCCESS,payload:data.success})
    }catch(err){
        dispatch({type:DELETE_USER_FAIL,payload:err.response.data.message})
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}