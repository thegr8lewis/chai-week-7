"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  Download,
  Loader2,
  Image as ImageIcon
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { simulateOCR, simulateProgressUpdates } from "@/lib/mock-ocr-data"

interface UploadedFile {
  id: string
  file: File
  preview: string
  status: "processing" | "completed" | "error"
  progress: number
  extractedText: string
  error?: string
}

export function DocumentUploadOCR() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substring(2, 11),
      file,
      preview: URL.createObjectURL(file),
      status: "processing" as const,
      progress: 0,
      extractedText: "",
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Process each file with OCR
    for (const uploadedFile of newFiles) {
      await processOCR(uploadedFile)
    }
  }

  const processOCR = async (uploadedFile: UploadedFile) => {
    try {
      // Simulate progress updates
      const progressGenerator = simulateProgressUpdates()

      const updateProgress = () => {
        const next = progressGenerator.next()
        if (!next.done) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id
                ? { ...f, progress: next.value.progress }
                : f
            )
          )

          if (next.value.progress < 100) {
            setTimeout(updateProgress, 300 + Math.random() * 400)
          }
        }
      }

      updateProgress()

      // Simulate OCR processing
      const extractedText = await simulateOCR(uploadedFile.file.name)

      // Update file with extracted text
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? {
                ...f,
                status: "completed" as const,
                progress: 100,
                extractedText: extractedText.trim(),
              }
            : f
        )
      )
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? {
                ...f,
                status: "error" as const,
                error: "Failed to process image",
              }
            : f
        )
      )
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const downloadText = (file: UploadedFile) => {
    const blob = new Blob([file.extractedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${file.file.name.replace(/\.[^/.]+$/, "")}_extracted.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const completedFiles = files.filter((f) => f.status === "completed").length
  const processingFiles = files.filter((f) => f.status === "processing").length
  const errorFiles = files.filter((f) => f.status === "error").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Document Upload & OCR</h3>
          <p className="text-muted-foreground">Upload images to extract text automatically</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {completedFiles} Completed
          </Badge>
          {processingFiles > 0 && (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              {processingFiles} Processing
            </Badge>
          )}
          {errorFiles > 0 && (
            <Badge variant="outline" className="bg-destructive/10 text-destructive">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errorFiles} Failed
            </Badge>
          )}
        </div>
      </div>

      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-all ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Upload className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Drop your documents here</h4>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse (supports JPG, PNG, PDF)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Files
            </Button>
            <p className="text-xs text-muted-foreground">
              Maximum file size: 10MB per file
            </p>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Uploaded Documents ({files.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {files.map((file) => (
              <Card
                key={file.id}
                className="border hover:shadow-md transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Preview */}
                    <div className="shrink-0">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden border flex items-center justify-center">
                        {file.preview ? (
                          <img
                            src={file.preview}
                            alt={file.file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">
                            {file.file.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {(file.file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2 shrink-0">
                          {file.status === "processing" && (
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              Processing
                            </Badge>
                          )}
                          {file.status === "completed" && (
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          {file.status === "error" && (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Error
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {file.status === "processing" && (
                        <div className="space-y-1">
                          <Progress value={file.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {file.progress}% - Extracting text...
                          </p>
                        </div>
                      )}

                      {/* Extracted Text Preview */}
                      {file.status === "completed" && file.extractedText && (
                        <div className="space-y-2">
                          <div className="bg-muted/50 rounded p-3 text-xs font-mono max-h-20 overflow-hidden relative">
                            <p className="line-clamp-3">{file.extractedText}</p>
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted/50 to-transparent" />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedFile(file)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Full Text
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadText(file)}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Error Message */}
                      {file.status === "error" && (
                        <p className="text-xs text-destructive">{file.error}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {/* View Full Text Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Extracted Text
            </DialogTitle>
            <DialogDescription>{selectedFile?.file.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => selectedFile && downloadText(selectedFile)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Text
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (selectedFile?.extractedText) {
                    navigator.clipboard.writeText(selectedFile.extractedText)
                  }
                }}
              >
                Copy to Clipboard
              </Button>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {selectedFile?.extractedText}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
