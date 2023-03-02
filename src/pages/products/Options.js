import Form from "../../components/Form";

const Options = () => {

    const data=[
        {type:'select',placeholder:'Type',name:'type',label:'Type',options:[{value:'namespace',name:'Namespace'},{value:'brand',name:'Brand'},{value:'category',name:'Category'},{value:'size',name:'Size'},{value:'color',name:'Color'}]},
        {type:'text',placeholder:'Label',name:'label',label:'Label'},
   
]
    return ( <div>
        <Form title={'Option'} buttonname={'Submit'} fields={data}/>
    </div> );
}
 
export default Options;