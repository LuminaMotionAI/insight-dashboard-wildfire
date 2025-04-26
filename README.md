# 산불 현황 대시보드

실시간 산불 발생 현황과 자원 배치 상태를 확인할 수 있는 종합 정보 시스템입니다.

## 기능

- 지역별, 원인별, 날짜별 산불 데이터 필터링
- 지도 기반 산불 위치 확인
- 주요 산불 통계 시각화
- 산불 위험 지수 실시간 업데이트

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 환경 변수 설정

`.env.local` 파일을 프로젝트 루트 디렉토리에 생성하고 다음 API 키를 설정하세요:

```
NEXT_PUBLIC_FOREST_SERVICE_API_KEY=your-forest-service-api-key
NEXT_PUBLIC_WEATHER_API_KEY=your-weather-api-key
NEXT_PUBLIC_MAP_API_KEY=your-map-api-key
```

## 기술 스택

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React (아이콘)
- Leaflet (지도)
- Chart.js (차트) 