import React from "react";

const Toolbox = () => {
  const fields = [
    { type: "text", label: "Text Field" },
    { type: "checkbox", label: "Checkbox" },
    { type: "radio", label: "Radio Button" },
    { type: "button", label: "Button" },
    { type: "select", label: "Select" },
    { type: "textarea", label: "Textarea" },
    { type: "date", label: "Date" },
    { type: "time", label: "Time" },
    { type: "number", label: "Number" },
    { type: "email", label: "Email" },
    { type: "url", label: "URL" },
    { type: "file", label: "File Upload" },
  ];

  const handleDragStart = (e, field) => {
    e.dataTransfer.setData("fieldType", JSON.stringify(field));
  };

  return (
    <div className="toolbox">
      <h3>Toolbox</h3>
      {fields.map((field, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, field)}
          className="toolbox-item"
        >
          {field.label}
        </div>
      ))}
    </div>
  );
};

export default Toolbox;
