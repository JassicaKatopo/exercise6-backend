import React from "react";

const InputText = ({ placeholder, LabelInput, ...rest }) => {
  return (
    <div>
      <p className="form-label mt-3">{LabelInput}</p>
      <input placeholder={placeholder} {...rest} />
    </div>
  );
};

export default InputText;
