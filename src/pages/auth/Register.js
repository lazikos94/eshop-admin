import Form from "../../components/Form";

const Register = () => {
    const data=[
        {type:'text',placeholder:'Username',name:'username',label:'Username'},
        {type:'password',placeholder:'Password',name:'password',label:'Password'},
        {type:'password',placeholder:'Repeat Password',name:'repassword',label:'Repeat Password'},


    ]
    return ( 
        <div className="container">
            <Form fields={data} buttonname={'Submit'} title={'Register'} apiMethod={'POST'} apiPath={'/register'}/>
        </div> 
    );
}
 
export default Register;