import React from 'react';
import { View } from '../types';

interface DashboardProps {
  onNavigate: (view: View) => void;
  onOpenLetter: () => void;
  onLock: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onOpenLetter, onLock, isPlaying, onTogglePlay }) => {
  // Removed local isPlaying state since it's now controlled by parent
  const song = { title: "Love My Friend - Shayda", url: "/music/LoveMyFriend.mp3" };
  return (
    <div className="min-h-screen bg-background-light p-4 md:p-10 flex flex-col lg:flex-row gap-8">
      {/* Left: Info & Calendar */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={onLock}
          className="flex items-center gap-1 bg-white hover:bg-gray-50 text-gray-700 px-0.5 py-0.25 rounded-full shadow-lg border border-gray-200 transition-all hover:shadow-xl"
          title="Quay lại màn hình khóa"
        >
          <span className="material-symbols-outlined">lock</span>
          <span className="text-sm font-medium hidden sm:block"></span>
        </button>
      </div>


      <div className="w-full lg:w-[400px] flex flex-col gap-8 shrink-0">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight">Our Love <br /><span className="text-primary">Story</span></h1>
          <p className="text-wine-red text-lg font-medium">Chào mừng Twnqvll đến với góc nhỏ Valentine của chúng mình.</p>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <div className="flex justify-between items-center">
            <button className="p-2 hover:bg-gray-100 rounded-full"><span className="material-symbols-outlined">chevron_left</span></button>
            <h2 className="text-xl font-bold">February 2026</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
          <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="py-2">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-y-2">
            {Array.from({ length: 28 }, (_, i) => (
              <div key={i} className="aspect-square flex items-center justify-center relative">
                {i + 1 === 14 ? (
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                    <button onClick={onOpenLetter} className="relative z-20 w-10 h-10 bg-primary rounded-full text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined fill-current text-[20px]">favorite</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-sm font-medium text-gray-700">{i + 1}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Music Player Mockup */}
        <div
          onClick={onTogglePlay}
          className="group bg-white rounded-full p-2 pr-6 border border-gray-100 shadow-md flex items-center gap-4 hover:shadow-lg transition-all cursor-pointer"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest"></p>
            <p className="text-sm font-semibold truncate">{song.title}</p>
          </div>

          {/* Visualizer Animation */}
          <div className="flex gap-1 items-center h-4">
            <div className={`w-1 bg-primary h-full animate-pulse ${isPlaying ? '' : 'opacity-30'}`} />
            <div className={`w-1 bg-primary h-2/3 animate-pulse delay-75 ${isPlaying ? '' : 'opacity-30'}`} />
            <div className={`w-1 bg-primary h-full animate-pulse delay-150 ${isPlaying ? '' : 'opacity-30'}`} />
          </div>
        </div>
      </div>

      {/* Right: Feature Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
        {/* Card: Timeline */}
        <Card
          title="Timeline"
          subtitle="Kỷ niệm"
          img="https://lh3.googleusercontent.com/aida-public/AB6AXuBJSHkY-wjEacE_0muwE4qz-4QQOaWB8hYHHbY7u0ljKMxfZESIG182UG5sDSDG5X_pNlTTVLObvwaKjhZm10xi8v-nJPVNqD2cxKHabXVCSGdLl5VSAS-g-LCz9t3SM2nxLJ3H6KVgBV3mXsuL55QSSZHJUjPkkPiCkTLncBw72XL1qHn28ZX8mkEWYjqYS0s3B-hmCH2FcsqMUSGImyTFqZGhwN6ZmJRZmyXVsjzO0XAXP498hu3SzePNDYlv7OXlEToGXUPAcg"
          icon="history_edu"
          color="bg-[#fff0f3]"
          textColor="text-wine-red"
          onClick={() => { }}
        />
        {/* Card: Starry Night */}
        <Card
          title="Starry Night"
          subtitle="Vạn vì sao"
          img="https://lh3.googleusercontent.com/aida-public/AB6AXuBEka4E6x7wa_1t-OLMDm4Tq665Yk6-tTuNv6wkwzZnuSgDa9v7C3n_ATKiAEIIGz891dsR7XghOh1mMD2iFJ7xJOfpT0AegLW0-K_-EuUC1eGlG7guadeRMPeDVPpNVEn6G7XK1QbVk_RcUBGx0hQ56vcQj_AWkpybyV6hWlb9goUnI30j4N8SSnMFH7IP_2skg7ZConwKoBCdqnRklMjJZyIUi7dy1cOOpwoPk0MpEv_CB1RYRo_NjCnF4Ad3rh2EtVCM7eJr2w"
          icon="star"
          color="bg-[#f0f4ff]"
          textColor="text-indigo-600"
          onClick={() => onNavigate(View.STARS)}
        />
        {/* Card: Pulsing Heart */}
        <Card
          title="Pulsing Heart"
          subtitle="Trái tim lấp lánh"
          img="https://lh3.googleusercontent.com/aida-public/AB6AXuAtmtq7FuNHJJVXaqeQl8EMs70WPvd0eWLYjtV03nbFvcznmieyE0UMKY6koUC5xxtu-aFlA9Ctg9PaUPBaW_l34uB_cjlyv3sriGepf-ZkhC2ujNghVzJbV7RvIIi6exmbn4yDcjR1gmLAnwOUVwFkR2bibw7fR8qQjLnWQCdaUnXbKecNWlLtVqhQtTXyoVOjFiCfBoOLjizCH0pP6LC2-RMRC_mvtNG8gf9HzsC-B8W-rLeOxiIgUD3Eqim0yYrlUeKakzg8zg"
          icon="ecg_heart"
          color="bg-[#fff0f0]"
          textColor="text-primary"
          onClick={() => onNavigate(View.HEART)}
        />
        {/* Card: Love Data */}
        <Card
          title="Love"
          subtitle="Twnqvll"
          img="https://lh3.googleusercontent.com/aida-public/AB6AXuBtxjGDfEGN6JkZM1hAt1CrGtJ5iDWSWffMdw5PoO0xjOLOHuIdkzoavNtvKpokQ3pKKjFPSQ4N6TBGPzEY--PhzdhH6RIW5OgS_LmT5ZlPu6BWOHmwo5xtewH7TZSfWOND3fBmOSzlyKx5Ch-NC1n7-FUOXxjZlrS5ttueNE_FQNKljNzZKjILM9hFbWD7aXr95Zjpg7zbRqyrRYSpeLJekIOOFwMkrdKDFmQwMZEqNz_tJwN8Gp1GfmA9FVH970U19f8R2UQC9g"
          icon="query_stats"
          color="bg-[#fdf2f8]"
          textColor="text-pink-600"
          onClick={() => onNavigate(View.STATS)}
        />
      </div>
    </div>
  );
};

interface CardProps {
  title: string;
  subtitle: string;
  img: string;
  icon: string;
  color: string;
  textColor: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, subtitle, img, icon, color, textColor, onClick }) => (
  <div
    onClick={onClick}
    className={`group relative overflow-hidden rounded-3xl ${color} cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}
  >
    <div className="absolute inset-0 opacity-40 group-hover:scale-110 transition-transform duration-700">
      <img src={img} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
    </div>
    <div className="relative z-10 h-full p-8 flex flex-col justify-end">
      <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center ${textColor} mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300`}>
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <div>
        <h3 className="text-3xl font-black text-gray-900 group-hover:text-primary transition-colors">{title}</h3>
        <p className={`${textColor} font-bold`}>{subtitle}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
