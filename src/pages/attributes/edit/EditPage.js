import AppConfig from "../../../app.json";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FormV2 from "../../../components/FormV2";
import { useEffect, useState } from "react";

const EditPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [apiData, setApiData] = useState();
    const [state, setState] = useState();


    const onChange = (e) => {

    }
    useEffect(() => {
        async function fetchData() {
            try {
                console.log(params)
                const response = await axios.get(AppConfig.host + '/api/v1/db.do/page/read_one?_id=' + params.id, { headers: { 'Content-Type': 'application/json' } })
                console.log(response.data.page)
                setApiData(response.data.page)
            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, [])
    return (
        <div className="container is-flex-direction-column is-align-content-center is-justify-content-center" style={{ width: '60%' }}>
            <div className="mt-5 mb-5">
                <h1 className=" is-size-2 has-text-centered has-text-weight-bold">{apiData?.label.en}</h1>
                <h1 className="is-size-2 has-text-centered has-text-weight-bold">{apiData?.label.gr}</h1>
            </div>
            <div className="mt-5 mb-5">
                <p className=" is-size-4 has-text-centered has-text-weight-semibold">{apiData?.content.en}</p><br />
                <p className=" is-size-4 has-text-centered has-text-weight-semibold">{apiData?.content.gr}</p>
            </div>

        </div>
    );
}

export default EditPage;