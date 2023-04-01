import axios from 'axios';
import { useEffect, useState } from "react";
import FormV2 from "../../../components/FormV2";
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../../elemenents/Modal';
import AppConfig from '../../../app.json';
const EditColor = () => {
    const navigate = useNavigate();
    const params = useParams()

    const [apiData, setApiData] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleModalConfirm = () => {
        deleteRecord();
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        async function fetchData() {
            try {
                console.log(params)
                const response = await axios.get(AppConfig.host + '/api/v1/db.do/color/read_one?_id=' + params.id, { headers: { 'Content-Type': 'application/json' } })
                console.log(response.data.color)
                setApiData(response.data.color)
            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, [])
    async function deleteRecord() {
        try {
            const delete_record = await axios.delete(AppConfig.host + '/api/v1/db.do/color/delete/' + params.id);
            console.log(delete_record)
            navigate('/view-attributes/color');
        } catch (error) {
            console.log(error)
        }
    }
    const formdata = [

        { type: 'map_language', name: 'name', label: 'Name', multiline: false },
        { type: 'input', name: 'color', label: 'Color', placeholder: 'hex color code like #ffffff' },

    ]
    return (<div className="container" style={{ width: '60%' }}>
        {apiData ? <>
            <FormV2 title={'Edit Color'} buttonname={'Update'} fields={formdata} apiData={apiData} apiPath={'/api/v1/db.do/color/update'} apiMethod={'PUT'} />
            <button class="button is-danger mt-5 mb-5 is-fullwidth" onClick={handleDeleteClick}>Delete</button>
            {isModalOpen && (
                <Modal handleModalCancel={handleModalCancel} handleModalConfirm={handleModalConfirm} />
            )}
        </> : <></>}
    </div>);
}

export default EditColor;