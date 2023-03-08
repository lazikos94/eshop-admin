import { useState } from "react";
import PropTypes from 'prop-types';
import Button from './Button';

const Form = (props) => {
    const [state,setState] = useState();
    const [map,setMap] = useState();
    const [choices,setChoices] = useState([]);
    const onSubmit =async (e)=>{
        e.preventDefault();
        console.log(props.fields)
        console.log(props.apiPath)
        console.log(props.apiMethod)
    }
    const onChange = (e)=>{
        setState(pr=>{
            return {...pr,[e.target.name]:e.target.value}
        })
    }
    const onChangeMap = (e)=>{
        
    }
    const onChangeSelect = (e)=>{
        setChoices(e.target.selectedOptions)
        const options = e.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
           
          if (options[i].selected) {
            console.log(options[i].label)
            selectedValues.push({[options[i].label]:options[i].value});
          }
        }
        setChoices(selectedValues);
 
        console.log(choices)
       // setChoices(...choices,{[e.target.select]:e.target.value})
        // setState({[e.target.name]:e.target.value})
        // setChoices({[e.target.name]:e.target.value})
    }
    return ( 
    <form style={{width:'100%'}} onSubmit={onSubmit}>
        <h1 className="is-size-3 has-text-centered">{props.title}</h1>

        {
            props.fields.map((i,key)=>{
                if(i.type=='select'){
                    return(<>
                        <label className="label p-2">{i.label}</label>
                            <pre>{JSON.stringify(choices)}</pre>
                            {i.ismultiple? 
                            <div className="select is-multiple is-primary "><select name='Choice' multiple size="5" onChange={onChangeSelect}>
                              {i.options.map((i,key)=>{
                                return(
                                    <option value={i.value} label={i.name} name={i.name} key={i.name}>{i.name}</option>
                                )
                              })}
                            </select></div>
                            :<div className="select is-primary is-normal"><select>
                              {i.options.map((i,key)=>{
                                return(
                                    <option value={i.value} label={i.name} key={i.name}>{i.name}</option>
                                )
                              })}
                            </select></div>
                            }
                        
                        </>)
                }else if(i.type=='textarea'){
                    return( <>
                        <label className="label p-2">{i.label}</label>
                        <div className="control">
                            
                            <textarea className="textarea" onChange={onChange} name={i.name} key={i.name} placeholder={i.placeholder}/>
                        </div></>)
                }else if(i.type=='map_language'){
                    return(<>
                        <label className="label p-2">English</label>
                        <div className="columns">
                        <input type="text" className="column input is-1" name='en' value='en' disabled/><input type="text" name='en_value' onChange={onChangeMap} className="column input"/>
                        </div>
                        <label className="label p-2">Greek</label>
                        <div className="columns">
                        <input type="text" className="column input is-1" name='gr' value='gr' disabled/><input type="text" name='gr_value' onChange={onChangeMap} className="column input"/>
                        </div>
                    </>)
                }else{
                    return(<>
                        <label className="label p-2">{i.label}</label>
                        <div className="control">
                            <input className="input" autoComplete="new-password" key={i.name} type={i.type} onChange={onChange} name={i.name} placeholder={i.placeholder}/>
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