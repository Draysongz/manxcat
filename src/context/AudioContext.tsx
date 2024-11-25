import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import focus from '../audio/Focus.mp3'
import funshine from '../audio/Funshine.mp3'
import like from '../audio/Like.mp3'
import practice from '../audio/practice.mp3'
import sunshine from '../audio/Sunshine.mp3'
import pink from '../audio/pink.mp3'

type AudioContextType = {
  currentAudio: string;
  isPlaying: boolean;
  isMuted: boolean;
  setAudio: (src: string) => void;
  togglePlayPause: () => void;
  toggleMute: () => void;
  getRandomTrack: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const audioList = [
  { id: 1, name: "Track 1", src: focus },
  { id: 2, name: "Track 2", src: funshine },
  { id: 3, name: "Track 3", src: like },
  { id: 4, name: "Track 4", src: pink},
  { id: 5, name: "Track 5", src: practice },
  { id: 6, name: "Track 6", src: sunshine },
];

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentAudio, setCurrentAudio] = useState(audioList[0].src);
  const [isPlaying, setIsPlaying] = useState(false); // Initially false to wait for interaction
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio after interaction
  const enableAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.warn("Audio playback failed:", err));
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Add a global click event listener for user interaction
    const handleUserInteraction = () => {
      enableAudio();
      document.removeEventListener("click", handleUserInteraction);
    };
    document.addEventListener("click", handleUserInteraction);

    return () => document.removeEventListener("click", handleUserInteraction);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentAudio;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.warn("Audio playback failed:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentAudio, isPlaying]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((err) => console.warn("Audio playback failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const setAudio = (src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentAudio(src);
    setIsPlaying(true);
  };

  const getRandomTrack = () => {
    const randomIndex = Math.floor(Math.random() * audioList.length);
    setAudio(audioList[randomIndex].src);
  };

  return (
    <AudioContext.Provider
      value={{
        currentAudio,
        isPlaying,
        isMuted,
        setAudio,
        togglePlayPause,
        toggleMute,
        getRandomTrack
      }}
    >
      {children}
      <audio ref={audioRef} autoPlay loop />
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};