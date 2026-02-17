import { useState, useCallback } from "react";
import { Upload as UploadIcon, FileUp, X, Settings2, Shield, Scan, FileText, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const formatIcons: Record<string, typeof FileText> = {
  DICOM: Database,
  NIfTI: Scan,
  PDF: FileText,
  CSV: FileText,
};

const UploadPage = () => {
  const [files, setFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [options, setOptions] = useState({
    removeMetadata: true,
    faceAnonymization: true,
    textRedaction: true,
    customPHI: false,
  });
  const navigate = useNavigate();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).map((f) => ({
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(1) + " MB",
      type: f.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
    }));
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const addDemoFiles = () => {
    setFiles([
      { name: "CT_Chest_Series.dcm", size: "256.4 MB", type: "DICOM" },
      { name: "MRI_Brain_T2.nii.gz", size: "142.1 MB", type: "NIfTI" },
      { name: "Discharge_Summary.pdf", size: "2.3 MB", type: "PDF" },
      { name: "Patient_Demographics.csv", size: "0.8 MB", type: "CSV" },
    ]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload Data</h1>
        <p className="text-muted-foreground text-sm mt-1">Upload medical files for secure de-identification</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload Zone */}
        <div className="lg:col-span-2 space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={addDemoFiles}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10">
                <UploadIcon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-semibold">Drop files here or click to browse</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Supports DICOM, NIfTI, PDF, CSV · Max 2GB per file
                </p>
              </div>
            </div>
          </div>

          {/* File List */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2"
              >
                {files.map((file, i) => {
                  const Icon = formatIcons[file.type] || FileText;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/60 shadow-card"
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.type} · {file.size}</p>
                      </div>
                      <button
                        onClick={() => setFiles((f) => f.filter((_, idx) => idx !== i))}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Options Panel */}
        <Card className="shadow-card border-border/60 h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-primary" />
              De-identification Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { key: "removeMetadata", label: "Remove Metadata", desc: "Strip DICOM tags & EXIF data", icon: Database },
              { key: "faceAnonymization", label: "Face Anonymization", desc: "Defacing for 3D imaging data", icon: Scan },
              { key: "textRedaction", label: "Text Redaction", desc: "Remove PHI from clinical notes", icon: FileText },
              { key: "customPHI", label: "Custom PHI Rules", desc: "Apply custom redaction patterns", icon: Shield },
            ].map((opt) => (
              <div key={opt.key} className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted mt-0.5">
                  <opt.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    <Switch
                      checked={options[opt.key as keyof typeof options]}
                      onCheckedChange={(v) => setOptions((o) => ({ ...o, [opt.key]: v }))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                </div>
              </div>
            ))}

            <Button
              onClick={() => navigate("/processing")}
              disabled={files.length === 0}
              className="w-full gradient-primary text-primary-foreground font-semibold gap-2 mt-4"
            >
              <FileUp className="w-4 h-4" />
              Start Processing
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default UploadPage;
