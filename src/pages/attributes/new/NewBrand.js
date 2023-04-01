import axios from 'axios';
import { useEffect, useState } from "react";
import FormV2 from "../../../components/FormV2";
import AppConfig from '../../../app.json';
const NewBrand = () => {
  const [apiData, setApiData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(AppConfig.host + "/api/v1/db.do/category/read", {
          headers: {
            "Content-Type": "application/json",

          }
        });

        console.log(response.data['category.list'])
        setApiData(response.data['category.list']);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const formdata = [
    { type: 'select', label: 'Category', ismultiple: true, options: apiData },
    { type: 'string', name: 'name', label: 'Name' },
    { type: 'image', name: 'image', label: 'Brand Image' },
    { type: 'textarea', name: 'metadata', label: 'Metadata' }
  ]
  return (<div className="container" style={{ width: '60%' }}>
    <FormV2 title={'New Brand'} buttonname={'Submit'} fields={formdata} apiPath={'/api/v1/db.do/brand/create'} apiMethod={'POST'} />
  </div>);
}

export default NewBrand;
