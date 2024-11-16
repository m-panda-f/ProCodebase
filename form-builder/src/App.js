import React, { useState } from "react";
import Toolbox from "./widgets/toolbox";
import DragDropCanvas from "./widgets/drag";
import FieldProperties from "./widgets/field";
import "./App.css";

function App() {
  const [selectedField, setSelectedField] = useState(null);

  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  const handleFieldUpdate = (updatedField) => {
    
    setSelectedField(updatedField);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <Toolbox />
        <FieldProperties
          selectedField={selectedField}
          updateField={handleFieldUpdate}
        />
      </div>
      <DragDropCanvas onFieldSelect={handleFieldSelect} />
    </div>
  );
}

export default App;
