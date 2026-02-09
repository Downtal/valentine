
import React, { useState, useCallback, useEffect } from 'react';
import LockScreen from './components/LockScreen';
import Dashboard from './components/Dashboard';
import LoveStatistics from './components/LoveStatistics';
import LoveLetter from './components/LoveLetter';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LOCK);
  const [showLetter, setShowLetter] = useState(false);

  const handleUnlock = useCallback(() => {
    setCurrentView(View.DASHBOARD);
  }, []);

  const navigateTo = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const toggleLetter = useCallback((val: boolean) => {
    setShowLetter(val);
  }, []);

  return (
    <div className="relative min-h-screen">
      {currentView === View.LOCK && (
        <LockScreen onUnlock={handleUnlock} />
      )}

      {currentView === View.DASHBOARD && (
        <Dashboard 
          onNavigate={navigateTo} 
          onOpenLetter={() => toggleLetter(true)} 
        />
      )}

      {currentView === View.STATS && (
        <LoveStatistics 
          onNavigate={navigateTo} 
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
