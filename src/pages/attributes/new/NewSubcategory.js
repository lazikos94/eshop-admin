import { useEffect, useState } from "react";
import axios from 'axios';
import FormV2 from "../../../components/FormV2";
import AppConfig from '../../../app.json';
const NewSubcategory = () => {
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
  const data = [
    { type: 'select', label: 'Category', ismultiple: true, options: apiData },
    { type: 'map_language', name: 'name', label: 'Name', multiline: false },
    { type: 'textarea', name: 'metadata', label: 'Metadata', placeholder: "Metadata" }

  ]
  return (<div className="container" style={{ width: '60%' }}>
    <FormV2 title={'New Subcategory'} buttonname={'Submit'} fields={data} apiPath={'/api/v1/db.do/subcategory/create'} apiMethod={'POST'} />

  </div>);
}

export default NewSubcategory;