import Form from "../../components/Form";


const NewProduct = () => {
    
    const data=[
        {type:'text',placeholder:'Product Name',name:'gr_title',label:'Title'},
        {type:'text',placeholder:'Product Name',name:'en_title',label:'Title'},
        {type:'select',placeholder:'Product Name',name:'category',label:'Category',options:[{value:'Test',name:'Test'},{value:'Test',name:'Test'},{value:'Test',name:'Test'}]},
    {type:'select',placeholder:'Product Name',name:'namespace',label:'Namespace',options:[{value:'Test',name:'Test'},{value:'Test',name:'Test'},{value:'Test',name:'Test'}]},
    {type:'select',placeholder:'Product Name',name:'size',label:'Size',options:[{value:'Test',name:'Test'},{value:'Test',name:'Test'},{value:'Test',name:'Test'}]},
    {type:'select',placeholder:'Product Name',name:'color',label:'Color',options:[{value:'Test',name:'Test'},{value:'Test',name:'Test'},{value:'Test',name:'Test'}]},
    {type:'select',placeholder:'Product Name',name:'brand',label:'Brand',options:[{value:'Test',name:'Test'},{value:'Test',name:'Test'},{value:'Test',name:'Test'}]},
    {type:'number',placeholder:'Product Name',name:'price',label:'Price'},
    {type:'number',placeholder:'Product Name',name:'discount',label:'Discount'},
    {type:'textarea',placeholder:'Product Name',name:'en_description',label:'Description'},
    {type:'textarea',placeholder:'Product Name',name:'gr_description',label:'Description'},
    {type:'textarea',placeholder:'Product Name',name:'info',label:'Info'},
   
]
    
    return ( 
    <div className="container">
        <Form title={'FORM'} fields={data} buttonname={'Submit'} apiPath={'/test'} apiMethod={'POST'}/>
    </div> );
}
 
export default NewProduct;