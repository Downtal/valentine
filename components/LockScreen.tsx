
import React, { useState, useEffect } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState(false);
  const correctPin = '1402';

  const handleKeyPress = (digit: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === correctPin) {
        onUnlock();
      } else {
        setError(true);
        const timer = setTimeout(() => {
          setPin('');
          setError(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [pin, onUnlock]);

  return (
    <div className="flex min-h-screen w-full flex-col justify-center items-center p-4 md:p-8 bg-soft-pink">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] md:h-[700px]">
        {/* Left Side: Romantic Visuals */}
        <div className="relative hidden md:flex w-1/2 flex-col justify-between bg-primary p-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Romantic Background" 
              className="h-full w-full object-cover opacity-80 mix-blend-multiply" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi3ozyFGEGK7k-KuiwwjVGB2E_6ctcNIT2WxKyNmnrTH1-8-B22HAwo8oIPBxGCLMvnyDyVRANjEPsLaM8kYFhiCehQyIWLO-K0x1Lhk0ZSCu3RfjHRFm_ywgRVejmP0MP4TruywP5LuNRThTIfjKO5IukCzl6Wg2urnmt1HADxVrZFPjCtRwhIj7_T2Mo_MRZqH3tftU7duTw-XQ9Nt_diuhAtUrNh4I2uJlzNZ6jdD1Hpw5iMnxNS4r2vpeA6sPfv1-n4R-viw" 
            />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-3xl">favorite</span>
              <h2 className="text-xl font-bold">LoveBox</h2>
            </div>
            
            <div className="flex flex-grow items-center justify-center">
              <div className="relative w-64 h-80 bg-white p-3 rounded-lg shadow-xl -rotate-3 transition-transform hover:rotate-0 duration-500 cursor-pointer">
                <img 
                  alt="Couple" 
                  className="w-full h-full object-cover rounded" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChHrEm-fEREtJUU8f5zh3uyIpQ2M79j_VdWE9L5FF9Eh6dhTMqJdWhnFgJFFpwYvmUSSSKvuibiWj44L04aWrfQD_eZLCLFLtuUV84qnsrp-xIlciwRbmSvqxypZ3EcehU2-5Whycaf63whDQ6Oghle5p6MPaeqppMp9gDzaGvDt8HdlN6YEjt127R78GO_KouJHTUyHOHp_5tfHIheZyW1AhlmYo_9n0BnSsYY6MUevIaGOxxyJVDf19EcrBxXYtC-q5-QppIjw" 
                />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm border border-white/40 shadow-sm" />
              </div>
            </div>

            <div className="text-white text-center pb-4">
              <p className="text-lg font-medium italic">"Yêu là tìm thấy hạnh phúc của mình trong hạnh phúc của người khác."</p>
            </div>
          </div>
        </div>

        {/* Right Side: Keypad */}
        <div className="flex flex-1 flex-col items-center justify-center p-8 bg-white">
          <div className="w-full max-w-[360px] space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Chào bạn yêu!</h1>
              <p className="text-gray-500">Nhập mật mã để mở hộp thư bí mật của chúng mình.</p>
            </div>

            {/* PIN Display */}
            <div className={`flex justify-center gap-4 py-4 transition-transform ${error ? 'animate-bounce' : ''}`}>
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 
                    ${pin.length > i ? 'bg-primary border-primary scale-125' : 'border-gray-300'}`} 
                />
              ))}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-4">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'].map((k, idx) => {
                if (k === '') return <div key={idx} />;
                if (k === 'delete') return (
                  <button 
                    key={k} 
                    onClick={handleBackspace}
                    className="h-16 rounded-2xl bg-red-50 text-primary flex items-center justify-center shadow-sm border border-red-100 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined">backspace</span>
                  </button>
                );
                return (
                  <button 
                    key={k} 
                    onClick={() => handleKeyPress(k)}
                    className="h-16 rounded-2xl bg-gray-50 hover:bg-gray-100 text-2xl font-semibold text-gray-800 flex items-center justify-center shadow-sm border border-gray-100 active:scale-95 transition-all"
                  >
                    {k}
                  </button>
                );
              })}
            </div>

            <div className="text-center space-y-2">
              <button className="text-sm text-primary font-medium underline underline-offset-4 decoration-primary/30">
                Quên mật mã?
              </button>
              <p className="text-xs text-gray-400">Gợi ý: 1402</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400 text-sm">
        © 2024 LoveBox. Made with <span className="text-primary material-symbols-outlined align-middle text-sm">favorite</span> for you.
      </div>
    </div>
  );
};

export default LockScreen;
