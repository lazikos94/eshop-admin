import Form from "../../components/Form";

const NewBrand = () => {
    const formdata = [
        {type:'select',label:'Category',ismultiple:true,options:[{value:'shoes',name:'Shoes'},{value:'dresses',name:'Dresses'},{value:'pants',name:'Pants'}]},
        {type:'map_language',name:'name',label:'Name'},
        {type:'textarea',name:'metadata',label:'Metadata'}
    ]
    return ( <div className="container" style={{width:'60%'}}>
        <Form title={'New Brand'} buttonname={'Submit'} fields={formdata} apiPath={'/api/v1/db.do/brand/create'} apiMethod={'POST'}/>
    </div> );
}
 
export default NewBrand;