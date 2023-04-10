import { useEffect, useState } from "react";
import axios from 'axios';
import FormV2 from "../../../components/FormV2";
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../../elemenents/Modal';
import AppConfig from "../../../app.json";
const EditSubcategory = () => {
    const navigate = useNavigate();
    const params = useParams()
    const [apiData, setApiData] = useState([])
    const [apiSubcategoryData, setApiSubcategoryData] = useState()
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
                const response = await axios.get(AppConfig.host + "/api/v1/db.do/category/read", { headers: { "Content-Type": "application/json", } });
                console.log(response.data['category.list'])
                setApiData(response.data['category.list']);
                const response1 = await axios.get(AppConfig.host + '/api/v1/db.do/subcategory/read_one?_id=' + params.id, { headers: { 'Content-Type': 'application/json' } })
                console.log(response1.data.subcategory)
                setApiSubcategoryData(response1.data.subcategory)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    async function deleteRecord() {
        try {
            const delete_record = await axios.delete(AppConfig.host + '/api/v1/db.do/subcategory/delete/' + params.id);
            console.log(delete_record)
            navigate('/view-attributes/subcategory');
        } catch (error) {
            console.log(error)
        }
    }
    const data = [

        { type: 'map_language', name: 'name', label: 'Name', multiline: false },


    ]
    return (<div className="container" style={{ width: '60%' }}>
        {apiSubcategoryData ? <>
            <FormV2 title={'Edit Subcategory'} buttonname={'Update'} fields={data} apiData={apiSubcategoryData} apiPath={'/api/v1/db.do/subcategory/update'} apiMethod={'PUT'} />
            <button class="button is-danger mt-5 mb-5 is-fullwidth" onClick={handleDeleteClick}>Delete</button>
            {isModalOpen && (
                <Modal  title='Delete' handleModalCancel={handleModalCancel} handleModalConfirm={handleModalConfirm} />
            )}
        </> : <></>}

    </div>);
}

export default EditSubcategory;