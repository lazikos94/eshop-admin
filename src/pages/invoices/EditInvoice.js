import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import AppConfig from '../../app.json';

const EditInvoice = () => {
    const params = useParams()
    const [apiData,setApiData] = useState();

    useEffect(()=>{
        async function fetchData(){
            const response =  await axios.get(AppConfig.host+`/api/v1/db.do/invoice/read_one?_id=${params.id}`, { headers: { "Content-Type": "application/json" }})
            console.log(response.data)
            setApiData(response.data['invoice'])
        }   
        fetchData()
    },[])
    
    return (<div>{JSON.stringify(apiData)}</div>);
}

export default EditInvoice;