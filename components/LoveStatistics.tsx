
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { View, Milestone, Memory } from '../types';

interface StatsProps {
  onNavigate: (view: View) => void;
  onLock: () => void;
}

const calculateDaysTogether = () => {
  const startDate = new Date('2023-09-26');
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
};

const chartData = [
  { name: 'JAN', value: 40 },
  { name: 'FEB', value: 30 },
  { name: 'MAR', value: 50 },
  { name: 'APR', value: 45 },
  { name: 'MAY', value: 70 },
  { name: 'JUN', value: 65 },
  { name: 'JUL', value: 90 },
];

const milestones: Milestone[] = [
  {
    id: '1',
    title: 'Ngày đầu tiên',
    date: '14/02/2022',
    description: 'Cái nắm tay đầu tiên rụt rè dưới ánh đèn đường...',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZiqUcFEBEXsNkuntBeNBA_Vd4AFVzqET2UCQU0sc7kyZD38Aq_MlF3jjYxMWyvOOZJ830zQ9ByRVoh4xHDo51iny32mG6iB5Hbf9Kzj3e4dFtAwi8gEot5HyioiRCLX5WVD4ikOv_Ilnkddo5WHfiwo1SHkRIlatKungdDmZ7LbqQbr0dMCj3Y8uzB55M2EnG6oXrKhKZ7olYfzyyDYB4YzZVVLuexghftQf3Mduo3EIA0ydu1zYA6RqlQlRfoH2EaCUO0fWuA',
    icon: 'favorite'
  },
  {
    id: '2',
    title: 'Nụ hôn đầu',
    date: '20/03/2022',
    description: 'Khoảnh khắc thời gian như ngừng trôi...',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5UA4zOYKObgqYT4ep5ORSR5lRpiJmLXQUn7VL-zsGPloEYikT3w05NH5Q2WBTq-GvQyePuukgpKLMeHE95kcwggebX1wrZvVelewPGbQvjo94h-3VKflB5MUzwUeMwaPfTQ2kj3E15zFndbLisnzpCIEQ8PCL6zlEj7mUlbePKOfWX7wshsDnVh8pt0gr3JRZ18XbJb91O2k8xccNK8C8l3BJvMLXwFn2Pf0qLHbW3zMTW4G0nhTbTe6mAjbH44yvopBcod7THQ',
    icon: 'volunteer_activism'
  },
  {
    id: '3',
    title: 'Chuyến đi xa',
    date: '15/06/2022',
    description: 'Lần đầu tiên cùng nhau khám phá một vùng đất mới.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi1RcRx1kvkocWlX2hG9qH3YQjck79zxwCu4ULyOb6CuYuYoLny7GbtfR6A7JTz2iVTtrm6VV6sqYUZ5uDnZOD1TG-9U--DVRTrYUsFnNh9fBfOwgHF7O1Xht_GSIJWjrr4ZK4k2NN6iNlK9tKeDeCBfdkjQ0klkgKK3HFvL9pKOqDxgPBLggGnXh2UI64V9VeL_MRvEbVgjgh7WpHKHtVbj-2zF7ThOjxgsHiXWoMly6dGFJw7QuAuugwt6Ovd0vB5__0umQNcQ',
    icon: 'flight'
  }
];

const memories: Memory[] = [
  { id: '1', title: 'Bữa tối lãng mạn', date: '14/02/2023', location: 'Nhà hàng Ven Sông', icon: 'restaurant', color: 'bg-primary/10 text-primary' },
  { id: '2', title: 'Chuyến đi Đà Lạt', date: '20/05/2023', location: 'Đà Lạt, Lâm Đồng', icon: 'flight_takeoff', color: 'bg-blue-500/10 text-blue-500' },
  { id: '3', title: 'Quà sinh nhật em', date: '10/08/2023', location: 'Tại nhà', icon: 'redeem', color: 'bg-purple-500/10 text-purple-500' },
];

const LoveStatistics: React.FC<StatsProps> = ({ onNavigate, onLock }) => {
  return (
    <div className="min-h-screen bg-background-light pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 lg:px-10 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate(View.DASHBOARD)}>
          <span className="material-symbols-outlined text-primary text-3xl">favorite</span>
          <h2 className="text-xl font-bold text-primary hidden sm:block">Love</h2>
        </div>
        <nav className="flex items-center gap-8">
          <button onClick={() => onNavigate(View.DASHBOARD)} className="text-sm font-medium text-gray-500 hover:text-primary"></button>
          <div className="size-10 rounded-full bg-cover" style={{ backgroundImage: 'url("./img/(209).JPG")' }} />
        </nav>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 py-10 space-y-10">
        {/* Hero */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black">Tình Yêu</h1>
            <p className="text-wine-red text-xl">Hành trình hạnh phúc của chúng mình ❤️</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 bg-white font-medium hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined">calendar_today</span> Tuần này
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-red-600 transition-colors">
              <span className="material-symbols-outlined">edit</span> Cập nhật
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group">
            <span className="material-symbols-outlined absolute top-4 right-4 text-primary opacity-10 text-7xl transition-opacity group-hover:opacity-20">calendar_month</span>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center"><span className="material-symbols-outlined">favorite</span></div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Số ngày bên nhau</p>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-6xl font-black">{calculateDaysTogether()}</span>
              <span className="text-xl font-bold text-gray-400 pb-2">ngày</span>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group">
            <span className="material-symbols-outlined absolute top-4 right-4 text-blue-500 opacity-10 text-7xl transition-opacity group-hover:opacity-20">forum</span>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10  bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center items-center"><span className="material-symbols-outlined">chat_bubble</span></div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Số tin nhắn</p>
            </div>
            <div className="flex items-end gap-2">
            <span className="text-1xl font-black text-gray-500 opacity-50 blur-[0.5px]">nhiều lắm</span>
            </div>       
          </div>
          {/* Happiness Level */}
          <div className="bg-gradient-to-br from-primary to-red-600 p-8 rounded-3xl shadow-xl shadow-primary/20 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-10" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '20px 20px'}} />
            <p className="text-sm font-bold uppercase tracking-widest mb-4 opacity-80">Mức độ hạnh phúc</p>
            <div className="relative size-36 flex items-center justify-center border-8 border-white/20 rounded-full">
              <div className="absolute inset-0 border-8 border-white rounded-full border-t-transparent -rotate-45" />
              <span className="text-4xl font-black tracking-tighter">100%</span>
            </div>
            <div className="mt-4 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">all_inclusive</span> Mãi mãi
            </div>
          </div>
        </div>

        {/* Chart & Memories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="mb-8">
              <h3 className="text-2xl font-black">Nhịp đập trái tim</h3>
              <p className="text-gray-500 font-medium">Tần suất cảm xúc qua từng tháng</p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea2a33" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ea2a33" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#ea2a33" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          
        </div>

        <div className="text-center pt-10">
          <p className="font-handwriting text-2xl text-wine-red italic">"And counting..."</p>
        </div>
      </main>
    </div>
  );
};

export default LoveStatistics;
