import {GET_DATA_SUCCESS,GET_DATA_REQUEST,GET_DATA_ERROR } from './action'
import Axios from 'axios';

url="http://localhost:4000/packages"
export const getData=()=>{
    return dispatch=>{
        dispatch({
            type:GET_DATA_REQUEST
        });
        return Axios.get(url).then((res)=>{
            dispatch({
                type:GET_DATA_SUCCESS,
                payload:res.data
            })
        }).catch((err)=>{
            dispatch({
                type:GET_DATA_ERROR,
                payload:""
            })
        })
    }
}