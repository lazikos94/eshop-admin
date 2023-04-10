import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Button from './Button';
import ElmSelect from "../elemenents/ElmSelect";
import ElmMapLanguage from "../elemenents/ElmMapLanguage";
import axios from "axios";
import AppConfig from "../../src/app.json";
import ElmFile from "../elemenents/ElmFile";
import ElmReference from "../elemenents/ElmReference";
import ElmFileArr from "../elemenents/ElmFIleArr";
import ElmSelectInput from "../elemenents/ElmSelectInput";
import ElmCheckBox from "../elemenents/ElmCheckBox";
const FormV2 = (props) => {
    const [state, setState] = useState({
        name: {
            en: '',
            gr: ''
        },
        description: {
            en: '',
            gr: ''
        },
        size_required:false

    });
    const [storage, setStorage] = useState({ reload: 0 });
    const [choices, setChoices] = useState([]);
    const [files, setFiles] = useState([])
    const [debug, setDebug] = useState(false);
    const [formFields, setFormFields] = useState([{ size: "", quantity: 10 }]);

    useEffect(() => {
        console.log(props.api)
        if (props.apiData) {
            setState({
                name: {
                    en: props.apiData.name.en,
                    gr: props.apiData.name.gr
                },
                metatada: props.apiData.metadata
            })
        }
    }, [])
    const handleAddField = () => {
        const newField = { size: "", quantity: 10 };
        setFormFields([...formFields, newField]);
        setState(pr => {
            return { ...pr, size: formFields };
        })

    };
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(choices);
        console.log(files)
        let final_state = state;

        if (props.apiMethod == 'POST') {
            if (files.length > 0) {
                console.log('IN')
                console.log(state)
                console.log(files)

                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                    const fileField = files[i];
                    const fieldName = fileField.name;
                    const filesList = fileField.files;
                    if (filesList instanceof FileList) {
                        for (let j = 0; j < filesList.length; j++) {
                            const file = filesList[j];
                            formData.append(fieldName, file);
                        }
                    } else if (filesList instanceof File) {
                        formData.append(fieldName, filesList);
                    }
                }
                console.log('FORMDATA', formData);

                const file_url = await axios.post(AppConfig.host + '/api/v1/upload/image?key=test', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                console.log('response', file_url.data.attachments);
                const response_arr = file_url.data.attachments;

                setState(prevState => ({
                    ...prevState,
                    ...response_arr.reduce((acc, curr) => {
                        acc[curr.key] = curr.url;
                        return acc;
                    }, {})
                }))
                for (let i = 0; i < response_arr.length; i++) {
                    final_state[response_arr[i].key] = response_arr[i].url;

                }


            }

            const response = await axios.post(AppConfig.host + props.apiPath, final_state, { headers: { 'Content-Type': 'application/json' } })
            console.log(response)
        } if (props.apiMethod == 'PUT') {
            const response = await axios.put(AppConfig.host + props.apiPath, state, {
                params: {
                    _id: props.apiData._id
                }, headers: { 'Content-Type': 'application/json' }
            })
            console.log(response)
        }
    }
    const onChange = (e) => {
        setState(pr => {
            return { ...pr, [e.target.name]: e.target.value }
        })
    }

    function onChangePrimary(propertyName, propertyValue) {
        setState((prevState) => {
            let updatedState = { ...prevState };
            // if (propertyName === "size") {
            //     updatedState[propertyName] = propertyValue.map((value) => {
            //         return { size: value, quantity: 10 };
            //     });
            // }
            if (Array.isArray(propertyValue) && propertyName !== "size") {
                updatedState[propertyName] = propertyValue.map(value => value);
            } else {
                updatedState[propertyName] = propertyValue;
            }
            return updatedState;
        });
    }

    const onImageChangeOne = (e, fieldName) => {

        const file = e.target.files[0];
        console.log(file)
        setFiles(pr => {
            return [...pr, { name: fieldName, files: file }]
        })

    }
    const onImageChange = (e, fieldName) => {

        const files = e
        // console.log(files)
        // const names = files.name;
        // console.log(names)
        // setFileNames((prevFileNames) => ({
        //     ...prevFileNames,
        //     [fieldName]: names,
        // }));
        setFiles(pr => {
            return [...pr, { name: fieldName, files: files }]
        })
        // Do something with the files...
    };
    const onChangeSelect = (e) => {
        setChoices(e.target.selectedOptions)
        const options = e.target.options;
        const selectedValues = [];

        for (let i = 0; i < options.length; i++) {

            if (options[i].selected) {
                console.log(options[i].label)
                selectedValues.push({ _id: options[i].value });
            }
        }
        setChoices(selectedValues);
        setState((pr => { return { ...pr, category: selectedValues } }))
        console.log(state)
    }
    return (
        <form style={{ width: '100%' }} onSubmit={onSubmit}>

            <h1 className="is-size-3 has-text-centered">{props.title}</h1>
            {debug && (
                <div style={{ height: 500, overflowY: "auto" }}>
                    <pre>
                        {JSON.stringify({ state: state }, null, 2)}
                    </pre>
                </div>
            )}
            <button className="button is-primary m-3" type="button" onClick={e => setDebug(p => !p)}>debug</button>
            {
                props.fields.map((i, key) => {
                    if (i.type == 'select') {
                        return (<ElmSelect current={state} inpSchema={i} selected={state} onChange={onChangeSelect} key={key} />)
                    } else if (i.type == 'textarea') {
                        return (<>
                            <label className="label p-2">{i.label}</label>
                            <div className="control">
                                <textarea className="textarea" onChange={onChange} value={state.textarea} name={i.name} key={i.name} placeholder={i.placeholder} />
                            </div></>)
                    } else if (i.type == 'map_language') {
                        return (<ElmMapLanguage current={state} state={state} inpSchema={i} onChange={onChangePrimary} key={key} />)
                    } else if (i.type == 'image') {
                        return (<ElmFile current={state} state={state} inpSchema={i} onChange={onImageChangeOne} key={key} />)
                    } else if (i.type == 'reference') {
                        return (<ElmReference current={state} state={state} inpSchema={i} onChange={onChangePrimary} key={key} storage={storage} setStorage={setStorage} />)
                    } else if (i.type == 'image_array') {
                        return (<ElmFileArr current={state} state={state} inpSchema={i} onChange={onImageChange} key={key} />)
                    } else if (i.type == 'select_input') {
                        return (<ElmSelectInput setState={setState} current={state} state={state} inpSchema={i} formFields={formFields} setFormFields={setFormFields} handleAddField={handleAddField} />)
                    } else if (i.type == 'checkbox') {
                        return (<ElmCheckBox setState={setState} current={state} state={state} inpSchema={i} />)
                    } else {
                        return (<div style={{ width: i.width }}>
                            <label className="label p-2">{i.label}</label>
                            <div className="control" >
                                <input className="input" autoComplete="new-password" key={i.name} type={i.type} onChange={onChange} name={i.name} placeholder={i.placeholder} />
                            </div></div>)
                    }
                })
            }
            <button className="button is-primary mt-5 mb-5 is-fullwidth" type="submit">{props.buttonname}</button>
        </form>);
}

FormV2.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object),
    buttonname: PropTypes.string,
    apiPath: PropTypes.string,
    apiMethod: PropTypes.string,
    title: PropTypes.string
}
export default FormV2;