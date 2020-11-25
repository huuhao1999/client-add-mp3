import React from "react";

import FileUpload from "./components/FileUpload";
import randomColor from 'randomcolor';
import "./App.css";

function App() {
  return (
    <div className="container mt-4" >
      <h4 className="display-4 text-center mb-4">
        <i className="fab fa-react" /> Upload Bài hát
      </h4>
      <FileUpload />
    </div>
  );
}

export default App;
