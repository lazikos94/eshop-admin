import axios from 'axios';
import { useEffect, useState } from "react";
import FormV2 from "../../../components/FormV2";

const NewColor = () => {

  const formdata = [

    { type: 'map_language', name: 'name', label: 'Name', multiline: false },
    { type: 'input', name: 'color', label: 'Color', placeholder: 'hex color code like #ffffff' },
    { type: 'textarea', name: 'metadata', label: 'Metadata' }
  ]
  return (<div className="container" style={{ width: '60%' }}>
    <FormV2 title={'New Color'} buttonname={'Submit'} fields={formdata} apiPath={'/api/v1/db.do/color/create'} apiMethod={'POST'} />
  </div>);
}

export default NewColor;