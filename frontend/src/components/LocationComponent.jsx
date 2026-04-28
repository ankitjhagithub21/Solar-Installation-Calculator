import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Polygon } from '@vis.gl/react-google-maps';
import { useSelector, useDispatch } from 'react-redux';
import { selectLocation } from '../store/slices/locationSlice';
import { setCurrentUser } from '../store/slices/userSlice';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const LocationComponent = () => {
  const dispatch = useDispatch();
  const selectedLocation = useSelector(state => state.location.selectedLocation);
  const currentUser = useSelector(state => state.user.currentUser);
  
  const [position, setPosition] = useState({ lat: 37.7749, lng: -122.4194 });
  const [error, setError] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [completedPolygon, setCompletedPolygon] = useState([]);
  const [zoom, setZoom] = useState(15);
  const [mirrorEnabled, setMirrorEnabled] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [calculationResult, setCalculationResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition(newPos);
          setMapCenter(newPos);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Update map center when a location is selected from Redux
  useEffect(() => {
    if (selectedLocation) {
      setMapCenter({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng
      });
      // Set zoom to a good level for viewing area
      setZoom(18);
    } else {
      // When no location is selected (cleared), reset to user's current location
      if (position.lat !== 37.7749 || position.lng !== -122.4194) {
        setMapCenter({
          lat: position.lat,
          lng: position.lng
        });
        setZoom(15);
      }
    }
  }, [selectedLocation, position]);

  const calculateArea = async () => {
    if (polygonPoints.length < 3) {
      alert('Please add at least 3 points to calculate area');
      return;
    }

    setIsCalculating(true);
    
    try {
      const res = await fetch(`http://localhost:8000/api/roof-drawings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          polygon: polygonPoints,
          userId: currentUser?._id || null,
          address:selectedLocation
        })
      });
      
      const data = await res.json();
      console.log(data);
      setCalculationResult(data);
    } catch (error) {
      console.error('Error calculating area:', error);
      alert('Error calculating area. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleMapClick = (event) => {
    if (!isDrawing) return;

    const newPoint = {
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng
    };

    setPolygonPoints(prev => [...prev, newPoint]);
  };

  const startDrawing = () => {
    setIsDrawing(true);
    setPolygonPoints([]);
    setCompletedPolygon([]);
    setResult(null);
  };

  const stopDrawing = () => {
    if (polygonPoints.length >= 3) {
      setCompletedPolygon(polygonPoints);
    }
    setIsDrawing(false);
  };

  const clearPolygon = () => {
    setPolygonPoints([]);
    setCompletedPolygon([]);
    setIsDrawing(false);
    setResult(null);
  };

  const handleZoomIn = () => setZoom(z => Math.min(z + 1, 20));
  const handleZoomOut = () => setZoom(z => Math.max(z - 1, 1));

  const toggleMirror = () => setMirrorEnabled(prev => !prev);

  const getMirroredPoints = (points) => {
    if (!mirrorEnabled || points.length === 0) return points;

    const centerLat = mapCenter.lat;
    return points.map(point => ({
      lat: 2 * centerLat - point.lat,
      lng: point.lng
    }));
  };

  return (
    <div className="relative">

      {/* CONTROLS */}
      <div className="absolute top-5 left-5 z-[1000] bg-white p-4 rounded-xl shadow-xl flex flex-col gap-3 w-[260px]">
        <h3 className="text-lg font-semibold">Polygon Tool</h3>

        {!isDrawing ? (
          <button onClick={startDrawing} className="btn bg-blue-500 text-white">Start Drawing</button>
        ) : (
          <button
            onClick={stopDrawing}
            disabled={polygonPoints.length < 3}
            className={`btn ${polygonPoints.length >= 3 ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'} text-white`}
          >
            Complete Drawing
          </button>
        )}

        <button onClick={clearPolygon} className="btn bg-red-500 text-white">
          Clear
        </button>

        <button onClick={calculateArea} className="btn bg-black text-white" disabled={isCalculating}>
          {isCalculating ? "Calculating..." : "Calculate Area & Estimate"}
        </button>

        <div className="flex gap-2">
          <button onClick={handleZoomIn} className="btn-small">+</button>
          <button onClick={handleZoomOut} className="btn-small">-</button>
        </div>

        <button onClick={toggleMirror} className="btn-small bg-purple-500 text-white">
          {mirrorEnabled ? "Mirror ON" : "Mirror OFF"}
        </button>
      </div>

      {/* RESULT PANEL */}
      {calculationResult && (
        <div className="absolute bottom-5 left-5 z-[1000] bg-white p-5 rounded-xl shadow-2xl w-[320px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">📊 Solar Installation Results</h3>
            <button 
              onClick={() => setCalculationResult(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-800">Roof Area</p>
              <p className="text-2xl font-bold text-blue-900">{calculationResult.area} m²</p>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-800">Estimated Cost</p>
              <p className="text-2xl font-bold text-green-900">${calculationResult.solarEstimate?.estimatedCost?.toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-gray-50 rounded">
                <p className="text-xs text-gray-600">Panels Needed</p>
                <p className="font-bold">{calculationResult.solarEstimate?.panelsNeeded}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <p className="text-xs text-gray-600">System Size</p>
                <p className="font-bold">{calculationResult.solarEstimate?.panelsNeeded * 400}W</p>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="font-semibold text-yellow-800">Annual Savings</p>
              <p className="text-lg font-bold text-yellow-900">${calculationResult.solarEstimate?.estimatedSavings?.toLocaleString()}</p>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-semibold text-purple-800">Payback Period</p>
              <p className="text-lg font-bold text-purple-900">{calculationResult.solarEstimate?.paybackPeriod} months</p>
              <p className="text-xs text-purple-600">(~{Math.round(calculationResult.solarEstimate?.paybackPeriod / 12)} years)</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute bottom-5 right-5 bg-red-500 text-white p-3 rounded">
          {error}
        </div>
      )}

      {/* MAP */}
      <APIProvider apiKey={apiKey}>
        <Map
          className="w-screen h-screen"
          center={mapCenter}
          zoom={zoom}
          gestureHandling='greedy'
          disableDefaultUI
          onClick={handleMapClick}
          onZoomChanged={(e) => setZoom(e.detail.zoom)}
        >

          {(completedPolygon.length > 0 || (isDrawing && polygonPoints.length >= 3)) && (
            <Polygon
              paths={completedPolygon.length > 0 ? completedPolygon : polygonPoints}
              fillColor={'#0088ff'}
              fillOpacity={0.3}
              strokeColor={'#0088ff'}
              strokeWeight={2}
            />
          )}

          {mirrorEnabled && (
            <Polygon
              paths={getMirroredPoints(completedPolygon.length > 0 ? completedPolygon : polygonPoints)}
              fillColor={'#ff0088'}
              fillOpacity={0.2}
              strokeColor={'#ff0088'}
              strokeWeight={2}
            />
          )}

          {isDrawing && polygonPoints.map((point, index) => (
            <AdvancedMarker key={index} position={point}>
              <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </AdvancedMarker>
          ))}

        </Map>
      </APIProvider>

      {/* STYLES */}
      <style>{`
        .btn {
          padding: 8px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
        }
        .btn-small {
          padding: 4px 8px;
          border-radius: 6px;
          background: #333;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default LocationComponent;