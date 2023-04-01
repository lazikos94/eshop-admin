import axios from 'axios';
import { useEffect, useState } from "react";
import FormV2 from "../../../components/FormV2";

const NewSize = () => {


  const formdata = [

    { type: 'map_language', name: 'name', label: 'Name', multiline: false },
    { type: 'textarea', name: 'metadata', label: 'Metadata' }
  ]
  return (<div className="container" style={{ width: '60%' }}>
    <FormV2 title={'New Size'} buttonname={'Submit'} fields={formdata} apiPath={'/api/v1/db.do/size/create'} apiMethod={'POST'} />
  </div>);
}

export default NewSize;