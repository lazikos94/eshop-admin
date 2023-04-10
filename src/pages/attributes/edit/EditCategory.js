import { useEffect, useState } from "react";
import axios from 'axios';
import FormV2 from "../../../components/FormV2";
import Modal from '../../../elemenents/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import AppConfig from "../../../app.json";
const EditCategory = () => {
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
                const response = await axios.get(AppConfig.host + '/api/v1/db.do/category/read_one?_id=' + params.id, { headers: { 'Content-Type': 'application/json' } })
                console.log(response.data.category)
                setApiData(response.data.category)
            } catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, [])
    async function deleteRecord() {
        try {
            const delete_record = await axios.delete(AppConfig.host + '/api/v1/db.do/category/delete/' + params.id);
            console.log(delete_record)
            navigate('/view-attributes/category');
        } catch (error) {
            console.log(error)
        }
    }
    const data = [
        { type: 'map_language', name: 'name', label: 'Name', multiline: false },
    ]
    return (<div className="container" style={{ width: '60%' }}>
        {apiData ? <>
            <FormV2 title={'Edit Category'} buttonname={'Update'} fields={data} apiData={apiData} apiPath={'/api/v1/db.do/category/update'} apiMethod={'PUT'} />
            <button class="button is-danger mt-5 mb-5 is-fullwidth" onClick={handleDeleteClick}>Delete</button>
            {isModalOpen && (
                <Modal title='Delete' handleModalCancel={handleModalCancel} handleModalConfirm={handleModalConfirm} />
            )}
        </> : <></>}
    </div>);
}

export default EditCategory;