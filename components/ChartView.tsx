'use client';

import React from 'react';
import { BarChart2 } from 'lucide-react';
import { RegionChart, TimelineChart, CauseDistributionChart, YearlyTrendsChart } from './ChartComponents';

const ChartView = () => {
  return (
    <div className="col-span-12 bg-white rounded-lg p-4 shadow">
      <div className="flex items-center mb-3">
        <BarChart2 size={20} className="mr-2 text-indigo-600" />
        <h2 className="text-lg font-bold">상세 분석 차트</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RegionChart />
        <TimelineChart />
        <CauseDistributionChart />
        <YearlyTrendsChart />
      </div>
    </div>
  );
};

export default ChartView; 