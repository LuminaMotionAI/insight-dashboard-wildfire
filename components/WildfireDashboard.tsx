'use client';

import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import FilterPanel from './FilterPanel';
import MapView from './MapView';
import SummaryMetrics from './SummaryMetrics';
import ChartView from './ChartView';
import ApiSourceInfo from './ApiSourceInfo';
import WildfirePrediction from './WildfirePrediction';

// API 키 설정
const API_KEYS = {
  forestService: process.env.NEXT_PUBLIC_FOREST_SERVICE_API_KEY || 'your-forest-service-api-key',
  weatherService: process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'your-weather-api-key',
  mapService: process.env.NEXT_PUBLIC_MAP_API_KEY || 'your-map-api-key'
};

const WildfireDashboard = () => {
  // 현재 날짜 가져오기
  const getCurrentDateString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDateString());
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCause, setSelectedCause] = useState('전체');
  const [currentDateTime, setCurrentDateTime] = useState('');

  // 현재 날짜와 시간 업데이트
  useEffect(() => {
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
    
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // 샘플 데이터
  const summary = {
    totalIncidents: 127,
    affectedArea: 3450,
    casualties: 2,
    injuries: 15
  };

  return (
    <div className="flex flex-col w-full bg-gray-50 p-4 text-gray-800">
      {/* 헤더 섹션 */}
      <DashboardHeader lastUpdated={currentDateTime} />

      {/* 메인 콘텐츠 영역 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 필터 패널 */}
        <FilterPanel 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedCause={selectedCause}
          setSelectedCause={setSelectedCause}
        />

        {/* 지도 뷰 */}
        <MapView />

        {/* 요약 지표 */}
        <SummaryMetrics 
          totalIncidents={summary.totalIncidents}
          affectedArea={summary.affectedArea}
          casualties={summary.casualties}
          injuries={summary.injuries}
        />

        {/* 상세 분석 차트 */}
        <ChartView />
        
        {/* 산불 예측 시스템 */}
        <WildfirePrediction />

        {/* 데이터 출처 및 메모 */}
        <ApiSourceInfo 
          forestServiceApiKey={API_KEYS.forestService}
          weatherApiKey={API_KEYS.weatherService}
        />
      </div>
    </div>
  );
};

export default WildfireDashboard;
