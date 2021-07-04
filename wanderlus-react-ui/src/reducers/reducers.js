import {GET_DATA_SUCCESS,GET_DATA_REQUEST,GET_DATA_ERROR } from '../action/action'
const initialState={
    data:[],
    loading:false,
    error:""
}

let counterReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_DATA_REQUEST:
            return{...state,
                data:[],
                loading:false,
                error:""
            }
            case GET_DATA_SUCCESS:
                return{...state,
                    data:action.payload,
                    loading:false,
                    error:""
                }
                case GET_DATA_ERROR:
                    return{...state,
                        data:[],
                        loading:false,
                        error:"error in getting data"
                    }
                default:
                    return initialState
    }
}

export default counterReducer