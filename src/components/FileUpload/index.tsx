import { memo, useEffect, useState } from 'react'
import { CloudUpload, Delete, InsertDriveFile } from '@mui/icons-material'
import { useTranslator } from '../../hooks/useTranslator'

interface FileUploadProps {
  file?: File
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  isReadMode?: boolean
}

const FileUpload = ({ file, setFile, isReadMode }: FileUploadProps) => {
  const [previewURL, setPreviewURL] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const { t } = useTranslator('fileUpload')

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewURL(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreviewURL('')
  }, [file])

  const handleFileSelect = (f: File) => {
    if (f.size > 10 * 1024 * 1024) {
      alert(t('sizeError'))
      return
    }
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    if (!allowed.includes(f.type)) {
      alert(t('typeError'))
      return
    }
    setFile(f)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFileSelect(f)
  }

  const formatSize = (b: number) => {
    if (b === 0) return t('minSize')
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(b) / Math.log(k))
    return `${parseFloat((b / k ** i).toFixed(2))} ${sizes[i]}`
  }

  const isImage = file?.type.startsWith('image/')
  const remove = () => {
    setFile(undefined)
    setPreviewURL('')
  }

  return (
    <div className="w-full">
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{t('title')}</p>

      {!file ? (
        <div
          className={`cursor-pointer rounded-lg border-2 p-6 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-blue-600 bg-blue-50 dark:border-blue-400/80 dark:bg-blue-900/40 border-dashed'
              : 'border-gray-300 dark:border-gray-600 border-dashed hover:border-blue-500 hover:bg-blue-50 dark:hover:border-blue-400 dark:hover:bg-gray-800'
          }`}
          onDrop={onDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            setIsDragOver(false)
          }}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <CloudUpload className="mx-auto mb-3 text-blue-600 dark:text-blue-500" style={{ fontSize: 48 }} />
          <h3 className="text-lg font-semibold">{t('dropNote')}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('supportNote')}</p>

          <input
            disabled={isReadMode}
            id="file-upload"
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFileSelect(f)
            }}
          />
        </div>
      ) : (
        <div className="relative rounded-lg border bg-white shadow-sm dark:border-gray-600 dark:bg-gray-800">
          <div className="flex items-start gap-4 p-4">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded border bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
              {isImage && previewURL ? (
                <img src={previewURL} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <InsertDriveFile className="text-gray-500 dark:text-gray-400" style={{ fontSize: 40 }} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{file.name}</p>
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">{formatSize(file.size)}</p>
              <span className="inline-block rounded border border-blue-400 px-2 py-1 text-xs text-blue-600 dark:border-blue-400 dark:text-blue-400">
                {file.type.split('/')[0].toUpperCase()}
              </span>
            </div>

            <button
              onClick={remove}
              className="absolute right-2 top-2 rounded bg-gray-100 p-1 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <Delete className="text-gray-600 dark:text-gray-300" style={{ fontSize: 18 }} />
            </button>
          </div>

          <div className="border-t pt-2 dark:border-gray-600">
            <p
              className="cursor-pointer text-sm text-blue-600 hover:underline dark:text-blue-400"
              onClick={() => document.getElementById('file-upload-replace')?.click()}
            >
              {t('replace')}
            </p>
            <input
              id="file-upload-replace"
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleFileSelect(f)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(FileUpload)
