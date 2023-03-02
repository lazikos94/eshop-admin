import { useState } from "react";
import PropTypes from 'prop-types';
import Button from './Button';

const Form = (props) => {
    const [state,setState] = useState();

    const onSubmit =async (e)=>{
        e.preventDefault();
        console.log(props.fields)
        console.log(props.apiPath)
        console.log(props.apiMethod)
    }
    const onChange = (e)=>{
        setState({[e.target.name]:e.target.value})
    }
    return ( 
    <form onSubmit={onSubmit}>
        {
            props.fields.map((i,key)=>{
                if(i.type=='select'){
                    return(<>
                        <label className="label">{i.label}</label>
                        <div className="select is-primary is-normal">
                            <select>
                              {i.options.map((i,key)=>{
                                return(
                                    <option value={i.value}>{i.name}</option>
                                )
                              })}
                            </select>
                        </div>
                        </>)
                }else if(i.type=='textarea'){
                    return( <>
                        <label className="label">{i.label}</label>
                        <div className="control">
                            
                            <textarea className="textarea" onChange={onChange} name={i.name} placeholder={i.placeholder}/>
                        </div></>)
                }else{
                    return(<>
                        <label className="label">{i.label}</label>
                        <div className="control">
                            <input className="input" autoComplete="new-password" type={i.type} onChange={onChange} name={i.name} placeholder={i.placeholder}/>
                        </div></> )
                }
            })
        }
        <button className="button is-primary" type="submit">{props.buttonname}</button>
    </form> );
}
 
Form.propTypes={
    fields:PropTypes.arrayOf(PropTypes.object),
    buttonname:PropTypes.string,
    apiPath:PropTypes.string,
    apiMethod:PropTypes.string,
    title:PropTypes.string
}
export default Form;