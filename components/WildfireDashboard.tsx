'use client';

import React, { useState } from 'react';
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
  const [selectedDate, setSelectedDate] = useState('2025-04-23');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCause, setSelectedCause] = useState('전체');

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
      <DashboardHeader lastUpdated="2025년 4월 23일 16:30" />

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
