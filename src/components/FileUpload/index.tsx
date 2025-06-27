import { useEffect, useState } from "react";
import { CloudUpload, Delete, InsertDriveFile } from "@mui/icons-material";
import { useTranslator } from "../../hooks/useTranslator";

interface FileUploadProps {
  file?: File;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  isReadMode?: boolean;
}

const FileUpload = ({ file, setFile, isReadMode }: FileUploadProps) => {
  const [previewURL, setPreviewURL] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const { t } = useTranslator('fileUpload')

  useEffect(() => {
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setPreviewURL(objectURL);

      return () => {
        URL.revokeObjectURL(objectURL);
      };
    } else {
      setPreviewURL("");
    }
  }, [file]);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert(t('sizeError'));
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert(t('typeError'))
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return t('minSize');
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isImage = file?.type.startsWith("image/");

  const removeFile = () => {
    setFile(undefined);
    setPreviewURL("");
  };

  return (
    <div className="w-full">
      <p className="text-sm text-gray-500 mb-2">{t('title')}</p>

      {!file ? (
        <div
          className={`border-2 p-6 text-center rounded-lg transition-all duration-200 cursor-pointer ${isDragOver
            ? "border-blue-600 bg-blue-50 border-dashed"
            : "border-gray-300 border-dashed hover:border-blue-500 hover:bg-blue-50"
            }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <CloudUpload className="text-blue-600 mx-auto mb-3" style={{ fontSize: 48 }} />
          <h3 className="text-lg font-semibold">{t('dropNote')}</h3>
          <p className="text-sm text-gray-500">{t('supportNote')}</p>

          <input
            disabled={isReadMode}
            id="file-upload"
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            style={{ display: "none" }}
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) handleFileSelect(selectedFile);
            }}
          />
        </div>
      ) : (
        <div className="border p-4 rounded-lg relative bg-white shadow-sm">
          <div className="flex gap-4 items-start">
            <div className="w-20 h-20 flex-shrink-0 border rounded overflow-hidden bg-gray-100 flex items-center justify-center">
              {isImage && previewURL ? (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <InsertDriveFile className="text-gray-500" style={{ fontSize: 40 }} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-gray-500 mb-1">{formatFileSize(file.size)}</p>
              <span className="inline-block px-2 py-1 text-xs text-blue-600 border border-blue-400 rounded">
                {file.type.split("/")[0].toUpperCase()}
              </span>
            </div>

            <button
              onClick={removeFile}
              className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 p-1 rounded"
            >
              <Delete className="text-gray-600" style={{ fontSize: 18 }} />
            </button>
          </div>

          <div className="mt-4 pt-2 border-t">
            <p
              className="text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => document.getElementById("file-upload-replace")?.click()}
            >
              {t('replace')}
            </p>
            <input
              id="file-upload-replace"
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              style={{ display: "none" }}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) handleFileSelect(selectedFile);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
