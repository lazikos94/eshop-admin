import React, { useMemo, useState } from "react";

const ElmFile = ({ inpSchema, current, onChange, state }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  async function handleChange(e) {
    console.log(e.target.files);
    // e.target.files.forEach((f) => {
    //   console.log(f);
    // });
    //setFiles(e.target.files);
    //onChange()
  }

  return (
    <>
      <div className="field">
        <label className="label">Select {inpSchema.label}</label>
        <div className="control">
          <input
            className="input"
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={(e) => {
              onChange(e, inpSchema.name);
              setSelectedFile(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>
        {preview && (
          <div className="column">
            <figure className="image is-128x128">
              <img src={preview} alt="file preview" />
            </figure>
            <p className="has-text-centered">{selectedFile.name}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ElmFile;
