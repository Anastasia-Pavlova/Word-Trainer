import { useState } from "react";
import { FooterButtons } from "./components/FooterButtons/FooterButtons";
import "./App.css";

function App() {
  const [fileData, setFileData] = useState();

  function handleUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setFileData(data);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }

  return (
    <div style={{ textAlign: "center", margin: 50 }}>
      <div>
        <input type="file" onChange={handleUpload} className="uploadInput" />
      </div>

      <FooterButtons
        link="/select"
        state={fileData}
        showButtonCondition={fileData}
      />
    </div>
  );
}

export default App;
