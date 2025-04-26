'use client';

import React, { useEffect, useState } from 'react';
import { Map as MapIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

// 산불 데이터 타입 정의
interface WildfireData {
  id: number;
  position: [number, number]; // LatLngTuple 타입
  name: string;
  severity: string;
  radius: number;
  timestamp: string;
}

// 위험 지역 데이터 타입 정의
interface DangerZone {
  id: number;
  position: [number, number]; // LatLngTuple 타입
  name: string;
  level: string;
  radius: number;
}

// 산 정보 데이터 타입 정의
interface MountainData {
  id: number;
  position: [number, number];
  name: string;
  height: number;
  address: string;
}

// 산림청 API에서 산 정보 가져오기
const fetchMountainDataFromAPI = async (serviceKey: string): Promise<MountainData[] | null> => {
  try {
    // 실제 API 요청을 보내는 코드
    // const response = await fetch(
    //   `https://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoOpenAPI?ServiceKey=${serviceKey}&searchWrd=한라산&numOfRows=10&pageNo=1`
    // );
    // const xmlData = await response.text();
    // XML 파싱 로직이 필요함
    
    // 더미 데이터 반환 (실제 API 연동 전까지 사용)
    console.log("산림청 API 키:", serviceKey);
    const dummyMountainData: MountainData[] = [
      { 
        id: 1, 
        position: [33.3620, 126.5360], 
        name: '한라산', 
        height: 1947,
        address: '제주특별자치도 서귀포시 토평동 산15-1'
      },
      { 
        id: 2, 
        position: [37.7407, 128.4456], 
        name: '설악산', 
        height: 1708,
        address: '강원도 인제군 북면 한계리 산1-1'
      },
      { 
        id: 3, 
        position: [35.4736, 127.7308], 
        name: '지리산', 
        height: 1915,
        address: '경상남도 산청군 시천면 중산리 산1'
      },
      { 
        id: 4, 
        position: [33.5205, 126.4911], 
        name: '관음사(제주)', 
        height: 950,
        address: '제주특별자치도 제주시 아라동 산66-1'
      }
    ];
    
    return dummyMountainData;
  } catch (error) {
    console.error("산 정보 데이터 API 호출 실패:", error);
    return null;
  }
};

// 실제로는 여기서 Leaflet이나 다른 지도 API를 연동하게 됩니다
const MapComponent = () => {
  // API 키 설정
  const mapApiKey = process.env.NEXT_PUBLIC_MAP_API_KEY || 'your-map-api-key';
  const forestServiceApiKey = process.env.NEXT_PUBLIC_FOREST_SERVICE_API_KEY || 'your-forest-service-api-key';
  
  // 산 정보 상태 관리
  const [mountainData, setMountainData] = useState<MountainData[]>([]);
  
  // SSR에서 Leaflet을 사용하지 않도록 동적 임포트
  const MapWithNoSSR = dynamic(() => import('./MapWithNoSSR'), {
    ssr: false,
    loading: () => (
      <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center relative">
        <div className="text-center text-gray-500">
          <MapIcon size={48} className="mx-auto mb-2 opacity-50" />
          <p>지도 로딩 중...</p>
        </div>
      </div>
    )
  });

  // 산불 데이터 (실제로는 API에서 가져옴)
  const wildfireData: WildfireData[] = [
    { id: 1, position: [37.5665, 126.9780], name: '서울 남산', severity: '중간', radius: 1000, timestamp: '2025-04-23 14:30' },
    { id: 2, position: [38.1214, 128.4636], name: '강원도 속초', severity: '높음', radius: 2500, timestamp: '2025-04-23 15:15' },
    { id: 3, position: [35.8714, 127.1214], name: '전북 완주군', severity: '높음', radius: 2000, timestamp: '2025-04-23 13:45' },
    { id: 4, position: [36.3504, 127.3845], name: '충남 대전시', severity: '낮음', radius: 800, timestamp: '2025-04-23 16:00' },
    { id: 5, position: [35.1795, 129.0756], name: '부산 정관읍', severity: '중간', radius: 1200, timestamp: '2025-04-23 15:30' },
    { id: 6, position: [33.4996, 126.5312], name: '제주시 한림읍', severity: '높음', radius: 1800, timestamp: '2025-04-23 12:20' },
    { id: 7, position: [33.2500, 126.5630], name: '서귀포시 성산읍', severity: '중간', radius: 1500, timestamp: '2025-04-23 13:10' }
  ];

  // 위험 지역 데이터
  const dangerZones: DangerZone[] = [
    { id: 1, position: [37.8607, 127.7303], name: '강원도 춘천', level: '매우 높음', radius: 5000 },
    { id: 2, position: [36.9903, 128.3228], name: '경북 영주시', level: '높음', radius: 4000 },
    { id: 3, position: [33.3800, 126.5600], name: '제주도 한라산', level: '매우 높음', radius: 4500 }
  ];

  // 산림청 API에서 산 정보 가져오기
  useEffect(() => {
    const loadMountainData = async () => {
      const apiData = await fetchMountainDataFromAPI(forestServiceApiKey);
      if (apiData) {
        setMountainData(apiData);
        console.log("산 정보 불러오기 성공:", apiData.length);
      }
    };
    
    loadMountainData();
  }, [forestServiceApiKey]);

  return (
    <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center relative">
      <MapWithNoSSR 
        wildfireData={wildfireData} 
        dangerZones={dangerZones}
        mountainData={mountainData}
      />
      
      {/* 범례 */}
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-2 rounded text-sm z-[1000]">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span>진행 중인 산불</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
          <span>위험 지역</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span>주요 산</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>대피소</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent; 