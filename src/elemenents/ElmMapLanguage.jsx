import React, { useMemo, useState } from "react";

const ElmMapLanguage = ({ inpSchema, current, onChange, state }) => {
  const languages = useMemo(() => ["en", "gr"], []);

  return (
    <div className="primary-inp-wrapper mb-5">
      <label className="label p-2">{inpSchema.label}</label>
      {languages.map((lang, lindex) => {
        return (
          <div className="columns" id="languages-list" key={lindex}>
            <input
              type="text"
              className="column input is-1"
              name={lang}
              value={lang}
              disabled
            />
            {inpSchema.multiline === false ? (
              <input
                type="text"
                name={lang + "_value"}
                onChange={(e) =>
                  onChange(inpSchema.name, {
                    ...current[inpSchema.name],
                    [lang]: e.target.value,
                  })
                }
                value={state.name[lang]}
                className="column input"
              />
            ) : (
              <textarea
                name={lang + "_value"}
                mutiline={4}
                onChange={(e) =>
                  onChange(inpSchema.name, {
                    ...current[inpSchema.name],
                    [lang]: e.target.value,
                  })
                }
                value={state.description[lang]}
                className="textarea"
              ></textarea>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ElmMapLanguage;
