import Form from "../../components/Form";

const NewSubcategory = () => {

    const data=[
        {type:'select',label:'Category',ismultiple:true,options:[{value:'shoes',name:'Shoes'},{value:'dresses',name:'Dresses'},{value:'pants',name:'Pants'}]},
        {type:'map_language',name:'name',label:'Name'},
        {type:'textarea',name:'metadata',label:'Metadata',placeholder:"Metadata"}

    ]
    return ( <div className="container" style={{width:'60%'}}>
       <Form title={'New Subcategory'} buttonname={'Submit'} fields={data} apiPath={'/api/v1/db.do/subcategory/create'} apiMethod={'POST'}/>

    </div> );
}
 
export default NewSubcategory;