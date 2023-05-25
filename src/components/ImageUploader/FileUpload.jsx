import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowUpFromBracket,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.css";
const FileUpload = ({ files, setFiles, type, text, required, setFileData }) => {
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    console.log("im heere")
    console.log(file)
    setFiles([file]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setFileData([reader.result]);
    });
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <>
      <div className="file-card relative h-full flex cursor-pointer">
        <div className="file-inputs">
          <input
            required={required}
            accept={!type ? "image/*" : type}
            onClick={(event) => {
              event.target.value = null;
            }}
            type="file"
            onChange={uploadHandler}
          />
          <button className="cursor-pointer">
            {text}
          </button>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
