import { useState, useEffect } from "react";
import AppConfig from "../app.json";
import axios_options from "../utils/axios_options";
import axios from "axios";
import dotwalking from "../utils/dotwalking";

const ElmSelectInput = ({
  state,
  current,
  inpSchema,
  formFields,
  setFormFields,
  handleAddField,
  setState,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        AppConfig.host +
          (inpSchema.loadData ||
            `/api/v1/db.do/${inpSchema["name"]}/read?limit=1000`),
        { ...axios_options() }
      );
      console.log(response.data);
      setOptions((pr) => {
        let newarr = [{ value: "", label: "-- Empty --" }];
        response.data[
          `${inpSchema["name"] || inpSchema["data_property"]}.list`
        ].map((item) =>
          newarr.push({
            value: item[inpSchema["optionValue"] || "_id"] || "",
            label:
              dotwalking(inpSchema["optionLabel"] || "_id", item) || "error",
          })
        );
        setLoading(false);
        return newarr;
      });
    }
    if (loading) {
      fetchData();
    }
  }, []);
  return (
    <div style={{ width: inpSchema.width }}>
      <label className="label p-2">{inpSchema.label}</label>
      {formFields.map((field, index) => (
        <div className="field" key={index}>
          <div className="control">
            <div className="select is-primary primary-inp-wrapper">
              <select
                value={field.size}
                onChange={(e) => {
                  const newFields = [...formFields];
                  newFields[index].size = e.target.value;
                  setFormFields(newFields);
                  setState((pr) => {
                    return { ...pr, size: newFields };
                  });
                }}
                required
              >
                {options?.map((data, index) => (
                  <option
                    key={index}
                    name={inpSchema["name"]}
                    value={data.value}
                  >
                    {data.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="Quantity"
              value={field.quantity}
              onChange={(e) => {
                const newFields = [...formFields];
                newFields[index].quantity = e.target.value;
                setFormFields(newFields);
                setState((pr) => {
                  return { ...pr, size: newFields };
                });
              }}
              required
            />
          </div>
        </div>
      ))}
      <div className="field">
        <div className="control">
          <button
            className="button is-primary"
            type="button"
            onClick={handleAddField}
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElmSelectInput;
