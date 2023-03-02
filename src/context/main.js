import { createContext, useContext, useState, useEffect ,useReducer} from "react";
import getCookie from '../context/helpers/cookie';
import {auth_reducer,auth_Initialstate} from './reducers/authReducer';
import types from './types/authTypes';
import axios from 'axios';

const mainContext = createContext();
const cookie = getCookie('jwtToken');

export const ContextProvider=({children})=>{
    const [globalState,dispatchGlobalState] = useReducer(auth_reducer,auth_Initialstate);
    const [token, setToken] = useState(cookie);
    
    useEffect(() => {
        if(token){
            authApiRequest(dispatchGlobalState,token)
        }else{
            dispatchGlobalState({key:types.LOADING})
        }
    }, [])
    if(globalState.isLoading) return <p>loading...</p>

    return (
    <mainContext.Provider value={{ globalState,dispatchGlobalState,setToken }}>
        <div>{children}</div>
    </mainContext.Provider>
    )
}
export default function useMain () {
  const context = useContext(mainContext);
  return context;
}

async function authApiRequest(dispatchGlobalState,token){
    const headers = { 
      'Content-Type': 'application/json',
      'Accept':'application/json'
    };
  
    const response= await axios.get('βαλε κατι',token,{headers});
    if(response.error || response.status !== 200){
        dispatchGlobalState({key:types.NOTAUTHENTICATED})
    }else{
        dispatchGlobalState({key:types.AUTHENTICATED, payload:{token:'default', isAuth:true, user:Response.data.user}})
    }
}