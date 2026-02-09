import React, { useState, useCallback, useEffect, useRef } from 'react';
import LockScreen from './components/LockScreen';
import Dashboard from './components/Dashboard';
import LoveStatistics from './components/LoveStatistics';
import LoveLetter from './components/LoveLetter';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LOCK);
  const [showLetter, setShowLetter] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const song = { title: "Love My Friend - Shayda", url: "/music/LoveMyFriend.mp3" };
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleUnlock = useCallback(() => {
    setCurrentView(View.DASHBOARD);
    setShowLetter(true);
  }, []);

  const handleLock = useCallback(() => {
    setCurrentView(View.LOCK);
  }, []);

  const navigateTo = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const toggleLetter = useCallback((val: boolean) => {
    setShowLetter(val);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (currentView === View.LOCK) {
        // Dừng nhạc khi ở LockScreen
        if (isPlaying) {
          audioRef.current.pause();
        }
      } else {
        // Phát nhạc khi ở các trang khác (Dashboard, Stats, etc.)
        if (!isPlaying) {
          audioRef.current.play();
        }
      }
    }
  }, [currentView, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.loop = true; // Lặp lại
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Audio Element Global */}
      <audio 
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{ display: 'none' }}
      />
      {currentView === View.LOCK && (
        <LockScreen onUnlock={handleUnlock} />
      )}

      {currentView === View.DASHBOARD && (
        <Dashboard 
          onNavigate={navigateTo} 
          onOpenLetter={() => toggleLetter(true)} 
          onLock={handleLock}
        />
      )}

      {currentView === View.STATS && (
        <LoveStatistics 
          onNavigate={navigateTo}
          onLock={handleLock}
        />
      )}

      {showLetter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => toggleLetter(false)} />
          <LoveLetter onClose={() => toggleLetter(false)} />
        </div>
      )}
    </div>
  );
};

export default App;
