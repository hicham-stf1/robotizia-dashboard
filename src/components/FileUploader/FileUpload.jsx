import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowUpFromBracket,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.css";
import { MdUploadFile } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
const FileUpload = ({
  files,
  setFiles,
  type,
  text,
  required,
  removeFile,
  setFileText,
}) => {
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFiles([file]);
    const reader = new FileReader();
    // reader.addEventListener("load", () => {
    //   const text = event.target.result;
    //   console.log(text);
    //   alert(text);
    // });
    reader.onload = async (e) => {
      // const txt = e.target.result;
      // event.target.files[0].text().then((text) => {
      //   setFileText(text);
      // });
      // const text = extractText(event.target.files[0]);
      // console.log(text);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <>
      <div className="file-card2 relative w-full h-full flex">
        <div className="file-inputs2">
          <input
            required={required}
            accept={"application/pdf, text/plain, .docx"}
            onClick={(event) => {
              event.target.value = null;
            }}
            type="file"
            onChange={uploadHandler}
          />
          <button className="cursor-pointer ">
            {/* <i>
              <MdUploadFile size={24} />
            </i> */}
            {text}
          </button>
        </div>
        {files.length > 0 && (
          <div
            className="text-[#ff6666] cursor-pointer mr-2 text-[14px] absolute right-12"
            onClick={removeFile}
          >
            <BsFillTrashFill size={20} />
          </div>
        )}
      </div>
    </>
  );
};

export default FileUpload;
