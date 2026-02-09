import React, { useState, useRef, useEffect } from 'react';

interface LoveLetterProps {
  onClose: () => void;
}

const LoveLetter: React.FC<LoveLetterProps> = ({ onClose }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // Hiển thị nút close khi scroll đến 95% nội dung (giảm ngưỡng)
      const isNearBottom = scrollTop + clientHeight >= scrollHeight * 0.95;
      console.log('Scroll debug:', { scrollTop, scrollHeight, clientHeight, isNearBottom }); // Debug
      setShowCloseButton(isNearBottom);
    }
  };

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      // Kiểm tra lần đầu khi component mount
      handleScroll();
      
      return () => {
        contentElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div className="relative w-full max-w-2xl animate-scale-in bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[650px]">
      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/3 bg-soft-pink items-center justify-center relative p-8">
        <div className="absolute top-10 left-10 text-primary/20 animate-float">
          <span className="material-symbols-outlined text-4xl">favorite</span>
        </div>
        <div className="absolute bottom-20 right-10 text-primary/20 animate-float" style={{animationDelay: '1.5s'}}>
          <span className="material-symbols-outlined text-3xl">local_florist</span>
        </div>
        <div className="relative z-10 text-center space-y-4">
          <div className="size-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg text-primary">
            <span className="material-symbols-outlined text-5xl fill-current">mail</span>
          </div>
          <h3 className="font-bold text-xl text-gray-800">Twnqvll ❤</h3>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Ngày 14 tháng 2</p>
        </div>
      </div>

      {/* Content Side */}
      <div className="flex-1 paper-texture relative flex flex-col overflow-hidden">
        {/* Stamp */}
        <div className="absolute top-8 right-8 rotate-12 opacity-80 hidden sm:block">
          <div className="border-4 border-double border-primary/20 p-2 rounded-lg w-24 h-28 bg-white shadow-md flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-primary text-3xl">favorite</span>
            <span className="text-xs font-black text-primary mt-1 uppercase tracking-widest">Love</span>
            <span className="text-[10px] text-gray-400 font-bold mt-1">2026</span>
          </div>
        </div>

        {/* Letter Text - Gắn ref vào đây */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto no-scrollbar"
          style={{ padding: '2rem' }} 
        >
          <div className="max-w-md mx-auto space-y-8">
            <h1 className="font-handwriting text-4xl text-gray-800">Gửi Tường Vy ❤️</h1>
            <div className="font-handwriting text-2xl text-gray-700 space-y-8 leading-relaxed">
              <p>
                Vy à, Valentine này tớ chỉ muốn nói rằng cảm ơn cậu vì đã đến bên tớ. Mỗi ngày trôi qua đều là một ngày hạnh phúc khi có cậu ở bên.
              </p>
              <p>
                Tớ nhớ nụ cười của cậu, nhớ cách cậu la mắng khi tớ làm sai, và cả những lúc cậu giận dỗi vu vơ. Tất cả những điều nhỏ bé ấy làm nên thế giới của tớ.
              </p>
              <p>
                Mong rằng chúng ta sẽ còn đón thêm nhiều mùa Valentine nữa cùng nhau. Yêu Vy nhiều hơn những gì lời nói tớ có thể diễn tả.
              </p>
            </div>
            <div className="text-right pt-8">
              <p className="font-handwriting text-2xl text-gray-600">Mãi yêu Vy ❤️,</p>
              <p className="font-handwriting text-4xl font-black text-primary mt-2">minkcuonq</p>
            </div>
          </div>
        </div>

        {/* Footer - Chỉ hiển thị khi scroll đến cuối */}
        {showCloseButton && (
          <div className="p-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm flex justify-center animate-fade-in">
            <button 
              onClick={onClose}
              className="flex items-center gap-1 bg-primary hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              <span className="material-symbols-outlined">close</span>
              <span className="font-bold uppercase tracking-widest text-sm"></span>
            </button>
          </div>
        )}
        
        {/* Hiển thị hint khi chưa scroll */}
        {!showCloseButton && (
          <div className="p-4 text-center text-gray-400 text-sm animate-bounce">
            <span className="material-symbols-outlined text-lg align-middle mr-1">keyboard_arrow_down</span>
            Kéo xuống
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveLetter;