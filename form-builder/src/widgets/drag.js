import React, { useState } from "react";

const DragDropCanvas = () => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const field = JSON.parse(e.dataTransfer.getData("fieldType"));

    // Add the new field to the grid
    setFields([
      ...fields,
      { ...field, id: Date.now(), label: field.label || "New Field", width: "full" },
    ]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setSelectedField((prev) => ({ ...prev, [name]: value }));

    // Update the fields array
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === selectedField.id ? { ...field, [name]: value } : field
      )
    );
  };

  const handleDeleteField = () => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== selectedField.id));
    setSelectedField(null);
  };

  const handleSaveEdit = () => {
    setSelectedField(null); // Close the edit panel
  };

  return (
    <div className="canvas-container">
      <div
        className="canvas"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h3>Drag and Drop Your Form Elements Below</h3>
        <div className="grid-container">
          {fields.map((field) => (
            <div
              key={field.id}
              className={`grid-item ${
                selectedField?.id === field.id ? "selected" : ""
              }`}
              style={{
                gridColumn: field.width === "full" ? "span 2" : "span 1",
              }}
              onClick={() => handleFieldClick(field)}
            >
              {field.type === "text" && (
                <input type="text" placeholder={field.label} />
              )}
              {field.type === "checkbox" && (
                <label>
                  <input type="checkbox" /> {field.label}
                </label>
              )}
              {field.type === "radio" && (
                <label>
                  <input type="radio" /> {field.label}
                </label>
              )}
              {field.type === "button" && <button>{field.label}</button>}
              {field.type === "select" && (
                <select>
                  <option>{field.label}</option>
                </select>
              )}
              {field.type === "textarea" && (
                <textarea placeholder={field.label}></textarea>
              )}
              {field.type === "date" && <input type="date" />}
              {field.type === "time" && <input type="time" />}
              {field.type === "number" && (
                <input type="number" placeholder={field.label} />
              )}
              {field.type === "email" && (
                <input type="email" placeholder={field.label} />
              )}
              {field.type === "url" && <input type="url" placeholder={field.label} />}
              {field.type === "file" && <input type="file" />}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Edit Panel */}
      {selectedField && (
        <div className="edit-panel">
          <h4>Edit Field</h4>
          <label>
            Label:
            <input
              type="text"
              name="label"
              value={selectedField.label}
              onChange={handleFieldChange}
            />
          </label>
          <label>
            Width:
            <select
              name="width"
              value={selectedField.width}
              onChange={handleFieldChange}
            >
              <option value="full">Full</option>
              <option value="half">Half</option>
            </select>
          </label>
          <button onClick={handleSaveEdit} className="save-btn">
            Save
          </button>
          <button onClick={handleDeleteField} className="delete-btn">
            Delete Field
          </button>
        </div>
      )}
    </div>
  );
};

export default DragDropCanvas;
