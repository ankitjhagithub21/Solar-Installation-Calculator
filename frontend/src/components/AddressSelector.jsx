import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLocation, clearSelectedLocation } from '../store/slices/locationSlice';

const AddressSelector = () => {
  const dispatch = useDispatch();
  const { locations, selectedLocation, isLoading, error } = useSelector(state => state.location);

  const handleAddressSelect = (location) => {
    dispatch(selectLocation(location));
  };

  const handleClearSelection = () => {
    dispatch(clearSelectedLocation());
  };

  const formatCoordinates = (lat, lng) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Select Location</h2>
      
      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-green-800 mb-1">Selected Location:</h3>
              <p className="text-sm text-gray-700 font-medium">{selectedLocation.address}</p>
              <p className="text-xs text-gray-600 mt-1">
                Coordinates: {formatCoordinates(selectedLocation.lat, selectedLocation.lng)}
              </p>
            </div>
            <button
              onClick={handleClearSelection}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Address List */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Available Locations:</h3>
        <div className="max-h-64 overflow-y-auto space-y-2">
          {locations.map((location, index) => (
            <div
              key={index}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedLocation?.address === location.address
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => handleAddressSelect(location)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{location.address}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatCoordinates(location.lat, location.lng)}
                  </p>
                </div>
                {selectedLocation?.address === location.address && (
                  <div className="ml-2">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

    </div>
  );
};

export default AddressSelector;
