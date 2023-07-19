import { useState } from "react";
import ShareFile from "../ShareFile";
import UploadFile from "../UploadFile";

const FileUpload = () => {
  const [file, setFile] = useState();
  const [showToast, setShowToast] = useState(false);

  function handleUpload(e) {
    setFile(e.target.files?.[0]);
  }

  const handleCopyToClipboard = () => {
    if (file) {
      const textField = document.createElement("textarea");
      textField.innerText = file.name;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <>
      {file ? (
        <ShareFile
          file={file}
          handleCopyToClipboard={handleCopyToClipboard}
          showToast={showToast}
        />
      ) : (
        <UploadFile handleUpload={handleUpload} />
      )}
    </>
  );
};

export default FileUpload;
