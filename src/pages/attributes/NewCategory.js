import Form from "../../components/Form";

const NewCategory = () => {
   
    const data =[
        {type:'map_language',name:'name',label:'Name'},
        {type:'textarea',name:'metadata',label:'Metadata',placeholder:"Metadata"}
    ]
    return ( <div className="container" style={{width:'60%'}}>
        <Form title={'New Category'} buttonname={'Submit'} fields={data} apiPath={'/api/v1/db.do/category/create'} apiMethod={'POST'}/>
    </div> );
}
 
export default NewCategory;