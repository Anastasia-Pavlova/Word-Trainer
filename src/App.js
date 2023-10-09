import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
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
      <Link to="/select" state={fileData}>
        <Button size="large">Дальше</Button>
      </Link>
      <Link to="/select" state={fileData}>
        <Button size="small" danger>
          Дальше (правильного ответа не существует)
        </Button>
      </Link>
    </div>
  );
}

export default App;
