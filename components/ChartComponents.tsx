'use client';

import React from 'react';
import { MapPin, Clock, Flame, TrendingUp, BarChart2, PieChart } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// 샘플 데이터
const yearlyData = {
  labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
  datasets: [{
    label: '산불 발생 건수',
    data: [98, 112, 127, 131, 118, 127],
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  }]
};

const regionData = {
  labels: ['강원도', '경상북도', '경상남도', '충청북도', '충청남도', '전라북도', '전라남도', '경기도', '제주도'],
  datasets: [{
    label: '산불 발생 건수',
    data: [42, 23, 18, 12, 9, 8, 7, 8, 30],
    backgroundColor: [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(199, 199, 199, 0.7)',
      'rgba(83, 102, 255, 0.7)',
      'rgba(255, 0, 128, 0.7)',
    ],
    borderWidth: 1,
  }]
};

const timelineData = {
  labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
  datasets: [{
    label: '시간대별 발생 건수',
    data: [5, 2, 3, 15, 32, 28, 31, 11],
    borderColor: 'rgb(54, 162, 235)',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    tension: 0.3,
  }]
};

const causeData = {
  labels: ['입산자실화', '농업부산물소각', '담뱃불', '쓰레기소각', '건축물화재', '기타'],
  datasets: [{
    label: '산불 원인 분포',
    data: [35, 25, 18, 12, 5, 5],
    backgroundColor: [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
    ],
    borderWidth: 1,
  }]
};

export const RegionChart = () => {
  return (
    <div className="border rounded-lg p-3">
      <h3 className="text-sm font-semibold mb-2 flex items-center">
        <MapPin size={16} className="mr-1 text-green-600" />
        지역별 산불 발생 추이
      </h3>
      <div className="h-48">
        <Bar 
          data={regionData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              },
            },
          }} 
        />
      </div>
    </div>
  );
};

export const TimelineChart = () => {
  return (
    <div className="border rounded-lg p-3">
      <h3 className="text-sm font-semibold mb-2 flex items-center">
        <Clock size={16} className="mr-1 text-blue-600" />
        시간대별 발생 그래프
      </h3>
      <div className="h-48">
        <Line 
          data={timelineData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          }} 
        />
      </div>
    </div>
  );
};

export const CauseDistributionChart = () => {
  return (
    <div className="border rounded-lg p-3">
      <h3 className="text-sm font-semibold mb-2 flex items-center">
        <Flame size={16} className="mr-1 text-red-600" />
        산불 원인 분포
      </h3>
      <div className="h-48">
        <Pie 
          data={causeData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right' as const,
                labels: {
                  font: {
                    size: 10,
                  }
                }
              },
            },
          }} 
        />
      </div>
    </div>
  );
};

export const YearlyTrendsChart = () => {
  return (
    <div className="border rounded-lg p-3">
      <h3 className="text-sm font-semibold mb-2 flex items-center">
        <TrendingUp size={16} className="mr-1 text-purple-600" />
        연도별 추세 비교
      </h3>
      <div className="h-48">
        <Line 
          data={yearlyData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          }} 
        />
      </div>
    </div>
  );
};