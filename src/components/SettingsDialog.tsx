import { useState } from "react";
import { Settings, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SettingsDialogProps {
  onBackgroundChange: (url: string | null) => void;
  currentBackground: string | null;
}

export const SettingsDialog = ({ onBackgroundChange, currentBackground }: SettingsDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onBackgroundChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = () => {
    onBackgroundChange(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 bg-overlay/60 backdrop-blur-md border border-primary/20 hover:bg-overlay/80 text-foreground"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-overlay/95 backdrop-blur-xl border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-foreground">Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Customize your VRIE experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label htmlFor="background" className="text-foreground">
              Custom Background
            </Label>
            <div className="flex gap-2">
              <label
                htmlFor="background"
                className="flex-1 cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 hover:bg-primary/20 transition-colors">
                  <Upload className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">Upload Image</span>
                </div>
                <input
                  id="background"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              
              {currentBackground && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRemoveBackground}
                  className="border-destructive/30 hover:bg-destructive/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {currentBackground && (
              <p className="text-xs text-muted-foreground">
                Custom background active
              </p>
            )}
          </div>

          <div className="space-y-2 rounded-lg bg-primary/10 p-4">
            <h4 className="text-sm font-medium text-foreground">About VRIE</h4>
            <p className="text-xs text-muted-foreground">
              VR Identity Exploitation - OSINT Tool for VRChat
            </p>
            <p className="text-xs text-muted-foreground">
              Connect your Gemini CLI and VRChat API to unlock full functionality
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
