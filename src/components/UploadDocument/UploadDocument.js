import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Typography } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addWords } from "../../redux/reducers/wordsSlice";
import { completeStep } from "../../redux/reducers/stepsSlice";
import data from "../../example.json";

const { Text } = Typography;

export const UploadDocument = ({ currentStep }) => {
  const dispatch = useDispatch();

  function handleBeforeUpload(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(JSON.parse(e.target.result));
      const data = JSON.parse(e.target.result);
      dispatch(addWords(data));
      dispatch(completeStep(currentStep));
    };
    reader.readAsText(file);

    return false;
  }

  function handleUseSampleFile() {
    dispatch(addWords(data));
    dispatch(completeStep(currentStep));
  }

  return (
    <>
      <Upload accept=".json" showUploadList beforeUpload={handleBeforeUpload}>
        <Button type="primary" icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>
      <Text>or</Text>
      <div>
        <Button onClick={handleUseSampleFile}>Use sample file</Button>
      </div>
    </>
  );
};
