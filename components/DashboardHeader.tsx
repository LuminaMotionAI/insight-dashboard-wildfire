import React from 'react';
import { Flame } from 'lucide-react';

interface DashboardHeaderProps {
  lastUpdated?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ lastUpdated = '2025년 4월 23일 16:30' }) => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-orange-500 rounded-lg p-4 mb-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Flame size={40} className="mr-2" />
          <h1 className="text-3xl font-bold">산불 현황 대시보드</h1>
        </div>
        <div className="text-sm opacity-80">
          최종 업데이트: {lastUpdated}
        </div>
      </div>
      <p className="mt-2 text-gray-100">
        실시간 산불 발생 현황과 자원 배치 상태를 확인할 수 있는 종합 정보 시스템입니다.
      </p>
    </header>
  );
};

export default DashboardHeader; 