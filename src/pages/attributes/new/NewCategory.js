import { useEffect, useState } from "react";
import axios from 'axios';
import FormV2 from "../../../components/FormV2";

const NewCategory = () => {



    const data = [
        { type: 'map_language', name: 'name', label: 'Name', multiline: false },
        { type: 'textarea', name: 'metadata', label: 'Metadata', placeholder: "Metadata" }
    ]
    return (<div className="container" style={{ width: '60%' }}>
        <FormV2 title={'New Category'} buttonname={'Submit'} fields={data} apiPath={'/api/v1/db.do/category/create'} apiMethod={'POST'} />
    </div>);
}

export default NewCategory;