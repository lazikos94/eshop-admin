import { useState } from "react";
import PropTypes from 'prop-types';
import Button from './Button';

const Form = (props) => {
    const [state, setState] = useState();
    const [map, setMap] = useState();
    const [choices, setChoices] = useState([]);
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(props.fields)
        console.log(props.apiPath)
        console.log(props.apiMethod)
    }
    const onChange = (e) => {
        setState(pr => {
            return { ...pr, [e.target.name]: e.target.value }
        })
    }
    const onChangeMap = (e) => {

    }
    const onImageChange = async (e) => {
        console.log(e.target.files);
        const data = new FormData();
        data.append("file1", e.target.files[0]);

        fetch("", { headers: { "content-type": "multiform-part" } })

        // return ["/url1", "/url2"]
    }
    const onChangeSelect = (e) => {
        setChoices(e.target.selectedOptions)
        const options = e.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {

            if (options[i].selected) {
                console.log(options[i].label)
                selectedValues.push({ [options[i].label]: options[i].value });
            }
        }
        setChoices(selectedValues);

        console.log(choices)
        // setChoices(...choices,{[e.target.select]:e.target.value})
        // setState({[e.target.name]:e.target.value})
        // setChoices({[e.target.name]:e.target.value})
    }
    return (
        <form style={{ width: '100%' }} onSubmit={onSubmit}>
            <h1 className="is-size-3 has-text-centered">{props.title}</h1>

            {
                props.fields.map((i, key) => {
                    if (i.type == 'select') {
                        return (<div style={{ width: i.width }}>
                            <label className="label p-2">{i.label}</label>
                            {i.ismultiple ?
                                <div className="select is-multiple is-primary "><select name='Choice' multiple size="5" onChange={onChangeSelect}>
                                    {i.options.map((i, key) => {
                                        return (
                                            <option value={i._id} label={i.name.en + ' | ' + i.name.gr} name={i.name.en} key={i.name.en}>{i.name.en}</option>
                                        )
                                    })}
                                </select></div>
                                : <div className="select is-primary is-normal"><select>
                                    {i.options.map((i, key) => {
                                        return (
                                            <option value={i._id} label={i.name.en + ' | ' + i.name.gr} name={i.name.en} key={i.name.en}>{i.name.en}</option>
                                        )
                                    })}
                                </select></div>
                            }

                        </div>)
                    } else if (i.type == 'textarea') {
                        return (<>
                            <label className="label p-2">{i.label}</label>
                            <div className="control">

                                <textarea className="textarea" onChange={onChange} name={i.name} key={i.name} placeholder={i.placeholder} />
                            </div></>)
                    } else if (i.type == 'map_language') {
                        return (<>
                            <label className="label p-2">{i.label}</label>
                            <div className="columns">
                                <input type="text" className="column input is-1" name='en' value='en' disabled /><input type="text" name='en_value' onChange={onChangeMap} className="column input" />
                            </div>
                            <div className="columns">
                                <input type="text" className="column input is-1" name='gr' value='gr' disabled /><input type="text" name='gr_value' onChange={onChangeMap} className="column input" />
                            </div>
                        </>)
                    } else if (i.type == 'map_language_textarea') {
                        return (<>
                            <label className="label p-2">{i.label}</label>
                            <div className="columns">
                                <input type="text" className="column input is-1" name='en' value='en' disabled /><textarea type="text" name='en_value' onChange={onChangeMap} className="column input" />
                            </div>
                            <div className="columns">
                                <input type="text" className="column input is-1" name='gr' value='gr' disabled /><textarea type="text" name='gr_value' onChange={onChangeMap} className="column input" />
                            </div>
                        </>)
                    } else if (i.type == 'image') {
                        return (<>
                            <label className="label p-2">{i.label}</label>
                            <div className="file has-name">
                                <label className="file-label">
                                    <input className="file-input column" type="file" name={i.name} onChange={onImageChange} />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                    </span>
                                    <span className="file-name">
                                        Screen Shot 2017-07-29 at 15.54.25.png
                                    </span>
                                </label>
                            </div>
                        </>)
                    } else if (i.type == 'image_array') {
                        return (<>
                            <label className="label p-2">{i.label}</label>
                            <div className="file has-name">
                                <label className="file-label">
                                    <input className="file-input column" type="file" multiple={true} name={i.name} onChange={onImageChange} />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                    </span>
                                    <span className="file-name">
                                        Screen Shot 2017-07-29 at 15.54.25.png
                                    </span>
                                </label>
                            </div>
                        </>)
                    } else {
                        return (<div style={{ width: i.width }}>
                            <label className="label p-2">{i.label}</label>
                            <div className="control" >
                                <input className="input" autoComplete="new-password" key={i.name} type={i.type} onChange={onChange} name={i.name} placeholder={i.placeholder} />
                            </div></div>)
                    }
                })
            }
            <button className="button is-primary" type="submit">{props.buttonname}</button>
        </form>);
}

Form.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object),
    buttonname: PropTypes.string,
    apiPath: PropTypes.string,
    apiMethod: PropTypes.string,
    title: PropTypes.string
}
export default Form;