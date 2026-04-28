import React from 'react';
import UserForm from './UserForm';
import UserList from './UserList';

const UserPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-sm mt-1">Create and manage users for solar installation calculations</p>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Create User Form */}
          <div className="lg:col-span-1">
            <UserForm />
          </div>

          {/* Right Panel - User List */}
          <div className="lg:col-span-1">
            <UserList />
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Navigation</h3>
              <p className="text-sm text-gray-600 mt-1">Go back to solar calculator</p>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Back to Calculator
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Solar Installation Calculator. User Management System.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserPage;
