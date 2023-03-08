import Form from "../../components/Form";

const NewCategory = () => {

    const data=[
        {type:'select',placeholder:'Type',name:'type',label:'Type',options:[
            {value:'none',name:'--None--'},
            {value:'category',name:'Category'},
            {value:'subcategory',name:'Subcategory'},
            {value:'brand',name:'Brand'},
            {value:'size',name:'Size'},
            {value:'color',name:'Color'}
        ]},
   
]
    return ( <div>
        <Form title={'Option'} buttonname={'Submit'} fields={data}/>
    </div> );
}
 
export default NewCategory;