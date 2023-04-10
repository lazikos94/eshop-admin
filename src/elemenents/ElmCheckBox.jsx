import React, { useState } from 'react';

function ElmCheckBox({inpSchema,current,onChange,setState}) {
  const [sizeRequired, setSizeRequired] = useState(false);

  function handleCheckboxChange(event) {
    const isChecked = event.target.checked;
    setSizeRequired(isChecked);
    setState(pr => {
        return { ...pr, [event.target.name]:isChecked}
    })
  }

  return (
    <div className="field">
              <label className="label p-2" htmlFor={inpSchema.name}>{inpSchema.label}</label>
      <input
        className="is-checkradio is-info"
        id={inpSchema.name}
        type="checkbox"
        name={inpSchema.name}
        checked={sizeRequired}
        onChange={handleCheckboxChange}
      />

    </div>
  );
}
export default ElmCheckBox;
