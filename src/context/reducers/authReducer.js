import types from '../types/authTypes';

const auth_Initialstate = {
    token:null,
    isAuth:false,
    isLoading:true,
    user:null
}

const auth_reducer = (state,action) =>{
    //console.log(state,action)
    switch (action.key) {
        case types.AUTHENTICATED:
            return{...state,isLoading:false,token:action.payload.token,isAuth:action.payload.isAuth,user:action.payload.user}
            break;
        case types.LOADING:
            return{...state,isLoading:false}
            break;
        case types.NOTAUTHENTICATED:
            return{...state,isLoading:false}
            break;
        case types.LOGOUT:
            return{...state,isLoading:false,isAuth:false,user:null}
            break;
        default:
            return state
            break;
    }
}

export {auth_Initialstate,auth_reducer}