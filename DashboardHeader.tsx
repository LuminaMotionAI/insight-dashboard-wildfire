import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

interface DashboardHeaderProps {
  lastUpdated?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ lastUpdated }) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  
  useEffect(() => {
    // 현재 날짜와 시간 포맷팅 함수
    const updateDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      setCurrentDateTime(formattedDate);
    };
    
    // 초기 실행
    updateDateTime();
    
    // 1분마다 시간 업데이트
    const intervalId = setInterval(updateDateTime, 60000);
    
    // 클린업
    return () => clearInterval(intervalId);
  }, []);
  
  // 전달된 lastUpdated가 있으면 사용, 없으면 실시간 시간 사용
  const displayDateTime = lastUpdated || currentDateTime;
  
  return (
    <header className="bg-gradient-to-r from-red-600 to-orange-500 rounded-lg p-4 mb-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Flame size={40} className="mr-2" />
          <h1 className="text-3xl font-bold">산불 현황 대시보드</h1>
        </div>
        <div className="text-sm opacity-80">
          최종 업데이트: {displayDateTime}
        </div>
      </div>
      <p className="mt-2 text-gray-100">
        실시간 산불 발생 현황과 자원 배치 상태를 확인할 수 있는 종합 정보 시스템입니다.
      </p>
    </header>
  );
};

export default DashboardHeader; 