import React, { useState } from "react";

const FieldProperties = ({ selectedField, updateField }) => {
  const [label, setLabel] = useState(selectedField?.label || "");

  const handleUpdate = () => {
    updateField({ ...selectedField, label });
  };

  if (!selectedField) return null;

  return (
    <div className="field-properties">
      <h3>Field Properties</h3>
      <label>
        Label:
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </label>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default FieldProperties;
