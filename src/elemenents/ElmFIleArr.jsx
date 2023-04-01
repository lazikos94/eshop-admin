import React, { useState } from "react";

const ElmFileArr = ({ inpSchema, onChange }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(files);
    setSelectedFiles(files);
    const previewUrls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      previewUrls.push(URL.createObjectURL(file));
    }
    setPreviews(previewUrls);
    onChange(files, inpSchema.name);
  };

  return (
    <div className="field">
      <label className="label">Select {inpSchema.label}</label>
      <div className="control">
        <input
          className="input"
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          onChange={handleFileChange}
          multiple
        />
      </div>
      {previews.map((preview, index) => (
        <div className="column" key={index}>
          <figure className="image is-128x128">
            <img src={preview} alt="file preview" />
          </figure>
          <p className="has-text-centered">{selectedFiles[index].name}</p>
        </div>
      ))}
    </div>
  );
};

export default ElmFileArr;
