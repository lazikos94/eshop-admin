import Form from "../../components/Form";
import FormV2 from "../../components/FormV2";
import { useEffect, useState } from "react";
import axios from 'axios';
import AppConfig from "../../app.json";

const cs_cat = `setStorage(pr => {return {...pr, reload: pr.reload + 1}})`

const cs_scat = `setOptions(pr => {
    let newarr = [{ value: "", label: "-- Empty --" }]
    let currentCategory = storage["category"].find(f => f._id === state["category"]);
    if(!currentCategory) return pr;
    storage["subcategory"].map(sc => {
        if(currentCategory.subcategories.some(s => s._id === sc._id)) {
            newarr.push({ value: sc._id, label: scriptDotwalking(inpSchema["optionLabel"] || "_id", sc) || "error" })
        }
    })
    return newarr
})`

const cs_brand = `setOptions(pr => {
    let newarr = [{ value: "", label: "-- Empty --" }]
    let currentCategory = storage["category"].find(f => f._id === state["category"]);
    if(!currentCategory) return pr;
    storage["brand"].map(sc => {
        if(currentCategory.brands.some(s => s._id === sc._id)) {
            newarr.push({ value: sc._id, label: scriptDotwalking(inpSchema["optionLabel"] || "_id", sc) || "error" })
        }
    })
    return newarr
})`

const NewProduct = () => {

    useEffect(() => {
        async function fetchData() {
            try {



            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    const data = [
        { type: 'map_language', name: 'name', label: 'Name', multiline: false },
        { type: 'map_language', name: 'description', label: 'Description', multiline: true },
        { type: 'text', placeholder: 'Serial Number', name: 'serialNumber', label: 'Serial Number' },
        { type: 'text', placeholder: 'Unique Code', name: 'uniqueCode', label: 'Unique Code' },
        { type: 'image', name: 'primaryImg', label: 'Primary Image (One)' },
        { type: 'image', name: 'secondaryImg', label: 'Secondary Image (One)' },
        { type: 'image_array', name: 'images', label: 'Images (Many)' },
        { type: 'number', placeholder: 'Price', name: 'price', label: 'Price (€)', width: '40%' },
        { type: 'number', placeholder: 'Discount', name: 'discount', label: 'Discount (%)', width: '40%' },
        { type: 'number', placeholder: 'Quantity', name: 'quantity', label: 'Quantity', width: '40%' },
        { type: 'reference', placeholder: 'Category', name: 'category', optionLabel: "name.en", onchange: cs_cat, onstoragereload: "", label: 'Category', width: '40%' },
        { type: 'reference', placeholder: 'Subcategory', name: 'subcategory', optionLabel: "name.en", onchange: "", onstoragereload: cs_scat, label: 'Subcategory', width: '40%' },
        { type: 'reference', placeholder: 'Brand', name: 'brand', label: 'Brand', optionLabel: "name", onchange: "", onstoragereload: cs_brand, width: '40%' },
        { type: 'reference', placeholder: 'Color', name: 'color', label: 'Color', optionLabel: "name.en", onchange: "", width: '40%' },
        {type:'checkbox',placeholder:'Size Required?', name:'size_required',label:'Size Required?', width: '40%'},
        { type: 'select_input', placeholder: 'Size', name: 'size', label: 'Size', optionLabel: "name.en", onchange: "", width: '40%' },
    ]

    return (
        <div className="container flex" style={{ width: '60%' }}>
            <FormV2 title={'FORM'} fields={data} buttonname={'Submit'} apiPath={'/api/v1/db.do/product/create'} apiMethod={'POST'} />
        </div>);
}

export default NewProduct;