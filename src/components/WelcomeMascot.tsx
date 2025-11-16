import { useState } from "react";
import cinnamorollWave from "@/assets/cinnamoroll-wave.gif";

export const WelcomeMascot = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 animate-fade-in">
      <div className="bg-overlay/90 backdrop-blur-md rounded-2xl px-4 py-3 border border-primary/20 shadow-xl max-w-xs">
        <p className="text-sm text-foreground font-medium">
          Welcome to VRIE! ✨
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Start by searching for VRChat users or chat with Gemini AI!
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="mt-2 text-xs text-primary hover:text-primary/80 underline"
        >
          Got it!
        </button>
      </div>
      <img
        src={cinnamorollWave}
        alt="Cinnamoroll waving"
        className="h-24 w-24 drop-shadow-lg"
      />
    </div>
  );
};
