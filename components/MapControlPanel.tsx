import React from 'react';
import { MapPin, AlertTriangle, Clock, Info } from 'lucide-react';

const MapControlPanel = () => {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      <button className="bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded text-sm flex items-center justify-center">
        <MapPin size={14} className="mr-1" />
        산불 위치 보기
      </button>
      <button className="bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded text-sm flex items-center justify-center">
        <AlertTriangle size={14} className="mr-1" />
        위험 지역 보기
      </button>
      <button className="bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded text-sm flex items-center justify-center">
        <Clock size={14} className="mr-1" />
        산불 이동 경로
      </button>
      <button className="bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded text-sm flex items-center justify-center">
        <Info size={14} className="mr-1" />
        지도 범례
      </button>
    </div>
  );
};

export default MapControlPanel; 