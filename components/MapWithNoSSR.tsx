'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 데이터 타입 정의
interface WildfireData {
  id: number;
  position: [number, number]; // LatLngTuple 타입
  name: string;
  severity: string;
  radius: number;
  timestamp: string;
}

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

interface MapProps {
  wildfireData: WildfireData[];
  dangerZones: DangerZone[];
  mountainData?: MountainData[]; // 선택적 프로퍼티로 설정
}

const MapWithNoSSR: React.FC<MapProps> = ({ wildfireData, dangerZones, mountainData = [] }) => {
  // 지도 전체를 감싸는 컨테이너 스타일
  const mapStyle = {
    height: '100%',
    width: '100%',
    borderRadius: '0.375rem',
  };

  // 색상에 따른 위험도 표시
  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case '높음': return '#ff4136'; // 빨간색
      case '중간': return '#ff851b'; // 주황색
      case '낮음': return '#ffdc00'; // 노란색
      default: return '#ff4136';
    }
  };

  const getDangerZoneColor = (level: string) => {
    switch (level) {
      case '매우 높음': return { color: '#ff4136', fillColor: '#ff4136', fillOpacity: 0.2 };
      case '높음': return { color: '#ff851b', fillColor: '#ff851b', fillOpacity: 0.2 };
      default: return { color: '#ff4136', fillColor: '#ff4136', fillOpacity: 0.2 };
    }
  };

  useEffect(() => {
    // Leaflet의 기본 아이콘 설정 수정
    const L1 = L as any;
    delete L1.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  // 산불 마커 아이콘 커스텀
  const fireIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/785/785116.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  // 산 마커 아이콘 커스텀
  const mountainIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2911/2911199.png',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
  });

  return (
    <MapContainer center={[35.8, 127.8]} zoom={6.5} style={mapStyle}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* 산불 마커 */}
      {wildfireData.map(fire => (
        <Marker 
          key={fire.id} 
          position={fire.position} 
          icon={fireIcon}
        >
          <Popup>
            <div className="p-1">
              <h3 className="font-bold text-sm">{fire.name}</h3>
              <p className="text-xs mt-1">심각도: <span style={{color: getSeverityColor(fire.severity)}}>{fire.severity}</span></p>
              <p className="text-xs">발생 시간: {fire.timestamp}</p>
              <p className="text-xs">영향 반경: {(fire.radius/1000).toFixed(1)}km</p>
            </div>
          </Popup>
          <Circle 
            center={fire.position} 
            radius={fire.radius} 
            pathOptions={{
              color: getSeverityColor(fire.severity),
              fillColor: getSeverityColor(fire.severity),
              fillOpacity: 0.2
            }}
          />
        </Marker>
      ))}
      
      {/* 위험 지역 */}
      {dangerZones.map(zone => (
        <Circle 
          key={zone.id}
          center={zone.position}
          radius={zone.radius}
          pathOptions={getDangerZoneColor(zone.level)}
        >
          <Popup>
            <div className="p-1">
              <h3 className="font-bold text-sm">{zone.name}</h3>
              <p className="text-xs mt-1">위험 수준: <span style={{color: getDangerZoneColor(zone.level).color}}>{zone.level}</span></p>
              <p className="text-xs">주의 반경: {(zone.radius/1000).toFixed(1)}km</p>
            </div>
          </Popup>
        </Circle>
      ))}

      {/* 산 정보 마커 */}
      {mountainData && mountainData.map(mountain => (
        <Marker 
          key={mountain.id} 
          position={mountain.position} 
          icon={mountainIcon}
        >
          <Popup>
            <div className="p-1">
              <h3 className="font-bold text-sm">{mountain.name}</h3>
              <p className="text-xs mt-1">높이: {mountain.height}m</p>
              <p className="text-xs">주소: {mountain.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithNoSSR; 