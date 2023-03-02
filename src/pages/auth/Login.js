import Form from "../../components/Form";


const Login = () => {
    
    const data=[
        {type:'text',placeholder:'Username',name:'username',label:'Username'},
        {type:'password',placeholder:'Password',name:'password',label:'Password'},

    ]
    return ( 
        <div className="container">
            <Form fields={data} buttonname={'Submit'} title={'Login'} apiMethod={'POST'} apiPath={'/login'}/>
        </div> 
    );
}
 
export default Login;