import React from "react";

const ElmTextarea = ({ inpSchema, current, onChange }) => {
  return (
    <div style={{ width: i.width }}>
      <label className="label p-2">{i.label}</label>
      {i.ismultiple ? (
        <div className="select is-multiple is-primary ">
          <select name="Choice" multiple size="5" onChange={onChangeSelect}>
            {i.options.map((i, key) => {
              return (
                <option
                  value={i._id}
                  label={i.name.en + " | " + i.name.gr}
                  name={i.name.en}
                  key={i.name.en}
                >
                  {i.name.en}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <div className="select is-primary is-normal">
          <select>
            {i.options.map((i, key) => {
              return (
                <option
                  value={i._id}
                  label={i.name.en + " | " + i.name.gr}
                  name={i.name.en}
                  key={i.name.en}
                >
                  {i.name.en}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
};

export default ElmTextarea;
