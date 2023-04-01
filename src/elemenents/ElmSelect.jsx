import React from "react";

const ElmSelect = ({ inpSchema, current, onChange, selected }) => {
  const filteredOptions = inpSchema?.options.filter((option) => {
    // If there is no selected category or the option is a category, include it in the filtered list
    if (
      inpSchema.label == "Category" ||
      inpSchema.label == "Size" ||
      inpSchema.label == "Color"
    ) {
      return true;
    } else if (inpSchema.label == "Subcategory" || inpSchema.label == "Brand") {
      return true;
    }
    // Otherwise, check if the option's categoryId matches the selected category's ID
  });
  return (
    <div style={{ width: inpSchema.width }}>
      <label className="label p-2">{inpSchema.label}</label>
      {inpSchema.ismultiple ? (
        <div className="select is-multiple is-primary ">
          <select name="Choice" multiple size="5" onChange={onChange}>
            {filteredOptions.map((i, key) => {
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
          <select name="Choice" onChange={onChange}>
            {filteredOptions.map((i, key) => {
              return (
                <option
                  value={i._id}
                  label={i.name.en ? i.name.en + " | " + i.name.gr : i.name}
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

export default ElmSelect;
