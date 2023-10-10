import { useState } from "react";
import { Button, Typography } from "antd";
import { FooterButtons } from "./components/FooterButtons/FooterButtons";
import data from "./WordsArray.json";
import "./App.css";

const { Text } = Typography;

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

  function handleUseSampleFile() {
    setFileData(data);
  }

  return (
    <div style={{ textAlign: "center", margin: 50 }}>
      <div>
        <input type="file" onChange={handleUpload} className="uploadInput" />
      </div>
      <Text>or</Text>
      <div>
        <Button onClick={handleUseSampleFile}>Use sample file</Button>
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
