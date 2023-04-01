import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import axios_options from "../utils/axios_options";
import AppConfig from "../app.json";
import dotwalking from "../utils/dotwalking";

const ElmReference = ({
  inpSchema,
  current,
  onChange,
  state,
  storage,
  setStorage,
}) => {
  const [files, setFiles] = useState([]);
  const [options, setOptions] = useState([{ value: "", label: "-- Empty --" }]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    console.log(options.length, inpSchema["name"], "@@@");
    async function fetchData() {
      try {
        const responseColor = await axios.get(
          AppConfig.host +
            (inpSchema.loadData ||
              `/api/v1/db.do/${inpSchema["name"]}/read?limit=1000`),
          { ...axios_options() }
        );
        setLoading(false);
        setOptions((pr) => {
          let newarr = [{ value: "", label: "-- Empty --" }];
          responseColor.data[
            `${inpSchema["name"] || inpSchema["data_property"]}.list`
          ].map((item) =>
            newarr.push({
              value: item[inpSchema["optionValue"] || "_id"] || "",
              label:
                dotwalking(inpSchema["optionLabel"] || "_id", item) || "error",
            })
          );
          return newarr;
        });
        setStorage((pr) => {
          return {
            ...pr,
            [inpSchema["name"]]:
              responseColor.data[
                `${inpSchema["name"] || inpSchema["data_property"]}.list`
              ],
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (loading) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (storage.reload === 0) return;
    function scriptDotwalking(...args) {
      return dotwalking(...args);
    }
    eval(inpSchema["onstoragereload"]);
  }, [storage.reload]);

  async function handleChange(e) {
    console.log(e.target.files);
    //URL.createObjectURL(file)

    // e.target.files.forEach((f) => {
    //   console.log(f);
    // });
    //setFiles(e.target.files);
    //onChange()
  }
  //i.name.en ? i.name.en + " | " + i.name.gr : i.name
  if (loading) return <p>loading</p>;
  return (
    <>
      {!inpSchema?.ismultiple ? (
        <>
          {" "}
          <label className="label p-2">{inpSchema.label}</label>
          <div
            className="select is-primary primary-inp-wrapper"
            style={{ width: inpSchema.width }}
          >
            <select
              name="Choice"
              onChange={(e) => {
                onChange(inpSchema["name"], e.target.value);
                eval(inpSchema["onchange"]);
              }}
            >
              {options.map((i, key) => {
                return (
                  <option value={i.value} name={inpSchema["name"]} key={key}>
                    {i.label}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      ) : (
        <>
          {" "}
          <label className="label p-2">{inpSchema.label}</label>
          <div
            className="select is-multiple primary-inp-wrapper"
            style={{ width: inpSchema.width }}
          >
            <select
              multiple
              name="Choice"
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.options)
                  .filter((option) => option.selected)
                  .map((option) => option.value);
                onChange(inpSchema["name"], selectedOptions);
                eval(inpSchema["onchange"]);
              }}
            >
              {options.map((i, key) => {
                return (
                  <option value={i.value} name={inpSchema["name"]} key={key}>
                    {i.label}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      )}
    </>
  );
};

export default ElmReference;
