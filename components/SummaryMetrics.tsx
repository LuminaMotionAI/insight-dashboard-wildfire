'use client';

import React from 'react';
import { Activity } from 'lucide-react';

interface SummaryProps {
  totalIncidents: number;
  affectedArea: number;
  casualties: number;
  injuries: number;
}

const SummaryMetrics: React.FC<SummaryProps> = ({ 
  totalIncidents, 
  affectedArea, 
  casualties, 
  injuries 
}) => {
  return (
    <div className="col-span-12 md:col-span-4 bg-white rounded-lg p-4 shadow">
      <div className="flex items-center mb-3">
        <Activity size={20} className="mr-2 text-purple-600" />
        <h2 className="text-lg font-bold">요약 지표</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="text-red-600 font-semibold">총 발생 수</div>
          <div className="text-2xl font-bold mt-1">{totalIncidents}건</div>
          <div className="text-xs text-red-700 mt-1">전월 대비 12% 증가</div>
        </div>
        
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="text-orange-600 font-semibold">피해 면적</div>
          <div className="text-2xl font-bold mt-1">{affectedArea}ha</div>
          <div className="text-xs text-orange-700 mt-1">전월 대비 8% 증가</div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-blue-600 font-semibold">인명 피해</div>
          <div className="text-2xl font-bold mt-1">{casualties}명</div>
          <div className="text-xs text-blue-700 mt-1">사망 {casualties}명, 부상 {injuries}명</div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-green-600 font-semibold">진화 현황</div>
          <div className="text-2xl font-bold mt-1">85%</div>
          <div className="text-xs text-green-700 mt-1">진행 중 {Math.round(totalIncidents * 0.15)}건</div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="text-yellow-600 font-semibold">산불 위험 지수</div>
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="ml-2 text-red-600 font-bold">75%</span>
          </div>
          <div className="text-xs text-yellow-700 mt-1">강원도 영서지역 매우 높음</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryMetrics; 