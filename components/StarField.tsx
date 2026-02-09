import React, { useState, useEffect, useRef } from 'react';
import { View } from '../types';

interface StarFieldProps {
  onNavigate: (view: View) => void;
  onLock: () => void;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  imageIndex: number;
}

const StarField: React.FC<StarFieldProps> = ({ onNavigate, onLock }) => {
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          imageIndex: Math.floor(Math.random() * 209) + 1, // Random image from 1-209
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Animation loop for twinkling stars
  useEffect(() => {
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        const time = Date.now() * star.twinkleSpeed;
        const opacity = 0.5 + 0.5 * Math.sin(time);

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [stars]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStarClick = (star: Star) => {
    setSelectedStar(star);
  };

  const handleCloseImage = () => {
    setSelectedStar(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black overflow-hidden">
      {/* Navigation buttons */}
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => onNavigate(View.DASHBOARD)}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-full shadow-lg border border-white/20 transition-all hover:shadow-xl"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="text-sm font-medium">Trang chủ</span>
        </button>
        
      </div>

      {/* Title */}
      <div className="absolute top-4 right-4 z-50 text-right">
        <h1 className="text-4xl font-bold text-white mb-2">Vạn Vì Sao</h1>
        <p className="text-white/80 text-sm">Click vào ngôi sao để xem kỷ niệm</p>
      </div>

      {/* Canvas for animated stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer"
        onClick={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Find clicked star
          const clickedStar = stars.find(star => {
            const distance = Math.sqrt((star.x - x) ** 2 + (star.y - y) ** 2);
            return distance < star.size + 10; // Add some padding for easier clicking
          });

          if (clickedStar) {
            handleStarClick(clickedStar);
          }
        }}
      />

      {/* Image modal */}
      {selectedStar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleCloseImage}
          />
          <div className="relative max-w-4xl max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={handleCloseImage}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <img
              src={`/img/(${selectedStar.imageIndex}).JPG`}
              alt={`Kỷ niệm ${selectedStar.imageIndex}`}
              className="w-full h-auto max-h-[70vh] object-contain"
              onError={(e) => {
                // If JPG fails, try jpg extension
                const img = e.target as HTMLImageElement;
                if (img.src.endsWith('.JPG')) {
                  img.src = `/img/(${selectedStar.imageIndex}).jpg`;
                }
              }}
            />
            <div className="p-4 bg-white">
              <p className="text-center text-gray-600">
                Kỷ niệm #{selectedStar.imageIndex}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-white/60 text-sm">
          Mỗi ngôi sao ẩn chứa một kỷ niệm. Hãy khám phá chúng!
        </p>
      </div>
    </div>
  );
};

export default StarField;