import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";

const RichTextEditor = ({ initialValue, getValue, name }) => {
  const editor = useRef(null);
  const config = {
    buttons: ["bold", "italic", "link", "unlink", "underline", "source"],

  };
  return useMemo(
    () => (
      <div className="w-[46%] mr-[20px] mt-[5px] font-[400] text-[14px]">
        <div className="font-[500] text-[13px]">
          {name} <span className="text-[red] font-[700]">*</span>
        </div>
        <JoditEditor
          required
          ref={editor}
          placeholder="eef"
          value={initialValue}
          config={config}
          tabIndex={1}
          onChange={(newContent) => getValue(newContent)}
        />
      </div>
    ),
    []
  );
};

export default RichTextEditor;
