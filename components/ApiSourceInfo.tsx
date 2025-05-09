import React from 'react';
import { Database } from 'lucide-react';

interface ApiSourceInfoProps {
  forestServiceApiKey: string;
  weatherApiKey: string;
}

const ApiSourceInfo: React.FC<ApiSourceInfoProps> = ({ forestServiceApiKey, weatherApiKey }) => {
  // 현재 날짜와 시간 생성
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // 형식화된 날짜 및 시간 문자열
  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

  return (
    <div className="col-span-12 bg-white rounded-lg p-4 shadow">
      <div className="flex items-center mb-2">
        <Database size={20} className="mr-2 text-gray-600" />
        <h2 className="text-lg font-bold">데이터 출처 및 메모</h2>
      </div>
      <div className="text-sm text-gray-600">
        <p>• 데이터 출처: 산림청 공공데이터 포털 (API 키: {forestServiceApiKey.substring(0, 5)}...)</p>
        <p>• 기상 정보: 기상청 날씨 API (API 키: {weatherApiKey.substring(0, 5)}...)</p>
        <p>• 마지막 업데이트: {formattedDate}</p>
        <p>• 주의사항: 실시간 데이터는 약간의 지연이 있을 수 있으며, 현장 상황에 따라 변동될 수 있습니다.</p>
      </div>
    </div>
  );
};

export default ApiSourceInfo; 