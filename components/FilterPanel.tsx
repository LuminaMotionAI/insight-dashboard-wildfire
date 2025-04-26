'use client';

import React from 'react';
import { Calendar, Filter } from 'lucide-react';

interface FilterPanelProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedCause: string;
  setSelectedCause: (cause: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedDate,
  setSelectedDate,
  selectedRegion,
  setSelectedRegion,
  selectedCause,
  setSelectedCause
}) => {
  return (
    <div className="col-span-12 md:col-span-3 bg-white rounded-lg p-4 shadow">
      <div className="flex items-center mb-3">
        <Filter size={20} className="mr-2 text-blue-600" />
        <h2 className="text-lg font-bold">필터 패널</h2>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">날짜 선택</label>
        <div className="flex items-center border rounded p-2">
          <Calendar size={16} className="mr-2 text-gray-500" />
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">지역 필터</label>
        <div className="border rounded p-2">
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full focus:outline-none"
          >
            <option value="전체">전체</option>
            <option value="강원도">강원도</option>
            <option value="경상북도">경상북도</option>
            <option value="경상남도">경상남도</option>
            <option value="충청북도">충청북도</option>
            <option value="충청남도">충청남도</option>
            <option value="전라북도">전라북도</option>
            <option value="전라남도">전라남도</option>
            <option value="경기도">경기도</option>
            <option value="제주도">제주도</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">산불 원인 필터</label>
        <div className="border rounded p-2">
          <select 
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value)}
            className="w-full focus:outline-none"
          >
            <option value="전체">전체</option>
            <option value="입산자실화">입산자실화</option>
            <option value="농업부산물소각">농업부산물소각</option>
            <option value="담뱃불">담뱃불</option>
            <option value="쓰레기소각">쓰레기소각</option>
            <option value="건축물화재">건축물화재</option>
            <option value="기타">기타</option>
          </select>
        </div>
      </div>

      <button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
        onClick={() => alert('필터가 적용되었습니다.')}
      >
        필터 적용
      </button>
    </div>
  );
};

export default FilterPanel; 