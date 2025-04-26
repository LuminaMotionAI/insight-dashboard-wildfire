'use client';

import React, { useState } from 'react';
import { BrainCircuit, AlertTriangle, Thermometer, Wind, Droplets } from 'lucide-react';

interface PredictionResult {
  riskScore: number;
  probability: number;
  factors: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    vegetationIndex: number;
    precipitation_forecast?: number;
  };
  recommendation: string;
}

const WildfirePrediction = () => {
  const [region, setRegion] = useState('강원도');
  const [predictionDays, setPredictionDays] = useState(3);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 예측 결과 샘플 데이터
  const predictionResults: PredictionResult[] = [
    {
      riskScore: 78,
      probability: 0.68,
      factors: {
        temperature: 32.5,
        humidity: 15,
        windSpeed: 18,
        precipitation: 0,
        vegetationIndex: 0.62
      },
      recommendation: '산불 위험도가 매우 높습니다. 해당 지역에 산림방화대 추가 파견을 권장합니다.'
    },
    {
      riskScore: 65,
      probability: 0.52,
      factors: {
        temperature: 30.2,
        humidity: 22,
        windSpeed: 12,
        precipitation: 0,
        vegetationIndex: 0.58
      },
      recommendation: '산불 위험도가 높습니다. 등산객 및 입산자 통제가 필요합니다.'
    },
    {
      riskScore: 43,
      probability: 0.31,
      factors: {
        temperature: 27.8,
        humidity: 35,
        windSpeed: 8,
        precipitation: 5,
        precipitation_forecast: 10,
        vegetationIndex: 0.55
      },
      recommendation: '산불 위험도가 중간 수준입니다. 지속적인 모니터링이 필요합니다.'
    }
  ];

  const handlePredict = () => {
    setIsLoading(true);
    
    // API 호출을 시뮬레이션 (실제로는 여기서 예측 API 호출)
    setTimeout(() => {
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-50';
    if (score >= 50) return 'text-orange-600 bg-orange-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="col-span-12 bg-white rounded-lg p-4 shadow">
      <div className="flex items-center mb-3">
        <BrainCircuit size={20} className="mr-2 text-purple-600" />
        <h2 className="text-lg font-bold">산불 위험 예측 시스템</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 입력 영역 */}
        <div className="lg:col-span-4 border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">예측 파라미터</h3>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">지역 선택</label>
            <select 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="강원도">강원도</option>
              <option value="경상북도">경상북도</option>
              <option value="경상남도">경상남도</option>
              <option value="충청북도">충청북도</option>
              <option value="충청남도">충청남도</option>
              <option value="전라북도">전라북도</option>
              <option value="전라남도">전라남도</option>
              <option value="경기도">경기도</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">예측 기간 (일)</label>
            <select 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={predictionDays}
              onChange={(e) => setPredictionDays(Number(e.target.value))}
            >
              <option value={1}>1일</option>
              <option value={3}>3일</option>
              <option value={5}>5일</option>
              <option value={7}>7일</option>
            </select>
          </div>
          
          <button 
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors disabled:bg-gray-400"
            onClick={handlePredict}
            disabled={isLoading}
          >
            {isLoading ? '예측 분석중...' : '위험도 예측 시작'}
          </button>
        </div>
        
        {/* 결과 영역 */}
        <div className="lg:col-span-8">
          {!showResults ? (
            <div className="h-full flex items-center justify-center p-6 border rounded-lg">
              <div className="text-center text-gray-500">
                <BrainCircuit size={48} className="mx-auto mb-2 opacity-50" />
                <p>AI 기반 산불 위험 예측 모델을 활용하여 위험도를 분석합니다</p>
                <p className="text-sm mt-2">기상 데이터, 식생 지수, 과거 산불 패턴을 분석하여 위험도를 산출합니다</p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-3">{region} 지역 {predictionDays}일 예측 결과</h3>
              
              <div className="space-y-4">
                {predictionResults.slice(0, predictionDays).map((result, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{index + 1}일차 예측</span>
                      <span className={`font-bold rounded-full px-2 py-0.5 text-sm ${getRiskColor(result.riskScore)}`}>
                        위험도: {result.riskScore}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      <div className="text-center">
                        <Thermometer size={16} className="mx-auto mb-1 text-red-500" />
                        <div className="text-xs font-medium">기온</div>
                        <div className="text-sm">{result.factors.temperature}°C</div>
                      </div>
                      <div className="text-center">
                        <Droplets size={16} className="mx-auto mb-1 text-blue-500" />
                        <div className="text-xs font-medium">습도</div>
                        <div className="text-sm">{result.factors.humidity}%</div>
                      </div>
                      <div className="text-center">
                        <Wind size={16} className="mx-auto mb-1 text-gray-500" />
                        <div className="text-xs font-medium">풍속</div>
                        <div className="text-sm">{result.factors.windSpeed}m/s</div>
                      </div>
                      <div className="text-center">
                        <Droplets size={16} className="mx-auto mb-1 text-blue-500" />
                        <div className="text-xs font-medium">강수량</div>
                        <div className="text-sm">{result.factors.precipitation}mm</div>
                      </div>
                      <div className="text-center">
                        <AlertTriangle size={16} className="mx-auto mb-1 text-yellow-500" />
                        <div className="text-xs font-medium">발생확률</div>
                        <div className="text-sm">{Math.round(result.probability * 100)}%</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-2 rounded text-sm">
                      <p className="font-medium">AI 추천:</p>
                      <p className="text-xs mt-1">{result.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                <p>* 본 예측은 기상청 데이터와 인공지능 모델을 기반으로 한 참고용 정보입니다.</p>
                <p>* 실제 상황에 따라 위험도는 변동될 수 있습니다.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WildfirePrediction; 