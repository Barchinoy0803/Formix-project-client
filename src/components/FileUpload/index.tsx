import { useEffect, useState } from "react"

interface FileUploadProps {
    file?: File;
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

const FileUpload = ({ file, setFile }: FileUploadProps) => {
    const [customName, setCustomName] = useState<string>("")
    const [previewURL, setPreviewURL] = useState<string>("")

    useEffect(() => {
        if (file) {
            const objectURL = URL.createObjectURL(file)
            setPreviewURL(objectURL)

            return () => {
                URL.revokeObjectURL(objectURL)
            }
        }
    }, [file])

    return (
        <div className="flex flex-col items-start gap-4 p-4">
            <label
                htmlFor="file-upload"
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
                Choose File
            </label>
            <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                    const selectedFile = e.target.files?.[0]
                    if (selectedFile) {
                        setFile(selectedFile)
                        setCustomName("UploadedImage.jpg")
                    }
                }}
            />

            {file && (
                <div>
                    <p className="text-sm text-gray-600">Custom name: {customName}</p>
                    <img src={previewURL} alt="Uploaded" className="w-64 h-auto rounded border" />
                </div>
            )}
        </div>
    )
}

export default FileUpload
