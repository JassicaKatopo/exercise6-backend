import React from "react";

const CustomButton = ({ onClick, labelButton, className }) => {
  return (
    <div>
      <button type="button" className={className} onClick={onClick}>
        {labelButton}
      </button>
    </div>
  );
};

export default CustomButton;
