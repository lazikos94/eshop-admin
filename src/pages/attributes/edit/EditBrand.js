import axios from 'axios';
import { useEffect, useState } from "react";
import FormV2 from "../../../components/FormV2";
import Modal from '../../../elemenents/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import AppConfig from '../../../app.json';
const EditBrand = () => {
    const navigate = useNavigate();
    const params = useParams()
    const [apiData, setApiData] = useState([])
    const [apiBrandData, setApiBrandData] = useState()
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
                console.log(params)
                const response1 = await axios.get(AppConfig.host + '/api/v1/db.do/brand/read_one?_id=' + params.id, { headers: { 'Content-Type': 'application/json' } })
                console.log(response1.data.brand)
                setApiBrandData(response1.data.brand)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    async function deleteRecord() {
        try {
            const delete_record = await axios.delete(AppConfig.host + '/api/v1/db.do/brand/delete/' + params.id);
            console.log(delete_record)
            navigate('/view-attributes/brand');
        } catch (error) {
            console.log(error)
        }
    }
    const formdata = [
        { type: 'map_language', name: 'name', label: 'Name', multiline: false },
        { type: 'image', name: 'image', label: 'Brand Image' },
    ]
    return (<div className="container" style={{ width: '60%' }}>
        {apiBrandData ? <>
            <FormV2 title={'Edit Brand'} buttonname={'Update'} fields={formdata} apiData={apiBrandData} apiPath={'/api/v1/db.do/brand/update'} apiMethod={'PUT'} />
            <button class="button is-danger mt-5 mb-5 is-fullwidth" onClick={handleDeleteClick}>Delete</button>
            {isModalOpen && (
                <Modal handleModalCancel={handleModalCancel} handleModalConfirm={handleModalConfirm} />
            )}
        </> : <></>}
    </div>);
}

export default EditBrand;
