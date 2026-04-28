import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setUsers } from '../store/slices/userSlice';

const UserList = () => {
  const dispatch = useDispatch();

  const {users} = useSelector((state)=>state.user)
 
  const [selectedUserId, setSelectedUserId] = useState(null);


  const handleUserSelect = (user) => {
    setSelectedUserId(user._id);
    dispatch(setCurrentUser(user));
  };

  const handleClearSelection = () => {
    setSelectedUserId(null);
    dispatch(setCurrentUser(null));
  };


  useEffect(()=>{

    const fetchUsers = async() => {
      
      try{
        const res = await fetch(`http://localhost:8000/api/users`)
        const data = await res.json()
        console.log(data)
        dispatch(setUsers(data))
      }catch(error){
        console.log(error)
      }
    }
    fetchUsers()
  },[])
  

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Select User</h2>
      
      {/* Selected User Display */}
      {selectedUserId && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-green-800 mb-1">Selected User:</h3>
              <p className="text-sm text-gray-700 font-medium">
                {users.find(u => u._id === selectedUserId)?.name}
              </p>
              <p className="text-xs text-gray-600">
                {users.find(u => u._id === selectedUserId)?.email}
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

      {/* User List */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Available Users:</h3>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {users.map((user) => (
            <div
              key={user._id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedUserId === user._id
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => handleUserSelect(user)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">{user.phone}</p>
                </div>
                {selectedUserId === user._id && (
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
      {/* {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )} */}

      {/* Loading State */}
      {/* {loading && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">Loading users...</p>
        </div>
      )} */}

     
    </div>
  );
};

export default UserList;
