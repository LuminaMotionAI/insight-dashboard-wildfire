import React from 'react';
import { Map } from 'lucide-react';
import MapComponent from './MapComponent';
import MapControlPanel from './MapControlPanel';

const MapView = () => {
  return (
    <div className="col-span-12 md:col-span-5 bg-white rounded-lg p-4 shadow">
      <div className="flex items-center mb-3">
        <Map size={20} className="mr-2 text-green-600" />
        <h2 className="text-lg font-bold">지도 뷰</h2>
      </div>
      
      <MapComponent />
      <MapControlPanel />
    </div>
  );
};

export default MapView; 