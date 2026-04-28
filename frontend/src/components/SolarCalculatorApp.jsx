import React from 'react';
import AddressSelector from './AddressSelector';
import UserList from './UserList';
import LocationComponent from './LocationComponent';

const SolarCalculatorApp = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - User and Address Selection */}
          <div className="lg:col-span-1 space-y-4">
            <UserList />
            <AddressSelector />
          </div>

          {/* Right Panel - Map and Drawing */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <LocationComponent />
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default SolarCalculatorApp;
