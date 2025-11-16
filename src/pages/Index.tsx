import { useState } from "react";
import { AIPanel } from "@/components/AIPanel";
import { VRChatSearchPanel } from "@/components/VRChatSearchPanel";
import { SettingsDialog } from "@/components/SettingsDialog";
import { WelcomeMascot } from "@/components/WelcomeMascot";

const Index = () => {
  const [customBackground, setCustomBackground] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10">
        {customBackground ? (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${customBackground})` }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-background via-primary/5 to-secondary/10" />
        )}
        {/* Darker overlay for readability */}
        <div className="absolute inset-0 bg-overlay/60" />
      </div>

      {/* Settings */}
      <SettingsDialog
        onBackgroundChange={setCustomBackground}
        currentBackground={customBackground}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 h-screen">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2 drop-shadow-lg">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VRIE
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            VR Identity Exploitation - OSINT Tool
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-140px)]">
          {/* Left: AI Panel */}
          <div className="h-full">
            <AIPanel />
          </div>

          {/* Right: VRChat Search */}
          <div className="h-full">
            <VRChatSearchPanel />
          </div>
        </div>
      </div>

      {/* Welcome Mascot */}
      <WelcomeMascot />
    </div>
  );
};

export default Index;
