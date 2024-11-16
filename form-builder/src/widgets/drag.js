import React, { useState } from "react";

const DragDropCanvas = () => {
  const [fields, setFields] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const field = JSON.parse(e.dataTransfer.getData("fieldType"));
    setFields([...fields, { ...field, id: Date.now() }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="canvas"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h3>Canvas</h3>
      {fields.map((field) => (
        <div key={field.id} className="canvas-field">
          {field.type === "text" && <input type="text" placeholder={field.label} />}
          {field.type === "checkbox" && <label><input type="checkbox" /> {field.label}</label>}
          {field.type === "radio" && <label><input type="radio" /> {field.label}</label>}
          {field.type === "button" && <button>{field.label}</button>}
          {field.type === "select" && <select><option>{field.label}</option></select>}
          {field.type === "textarea" && <textarea placeholder={field.label}></textarea>}
          {field.type === "date" && <input type="date" />}
          {field.type === "time" && <input type="time" />}
          {field.type === "number" && <input type="number" placeholder={field.label} />}
          {field.type === "email" && <input type="email" placeholder={field.label} />}
          {field.type === "url" && <input type="url" placeholder={field.label} />}
          {field.type === "file" && <input type="file" />}
        </div>
      ))}
    </div>
  );
};

export default DragDropCanvas;
