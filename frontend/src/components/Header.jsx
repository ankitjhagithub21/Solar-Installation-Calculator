import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
     <header className="bg-blue-600 text-white p-4 shadow-lg flex items-center flex-wrap justify-between">
       <div>
         <h1 className="text-2xl font-bold">Solar Installation Calculator</h1>
       
       </div>
      <div>
         <Link to={"/"} className='px-4 py-2 bg-white rounded-lg text-gray-800 mx-2'>Home</Link>
         <Link to={"/add-user"} className='px-4 py-2 bg-white rounded-lg text-gray-800'>Add User</Link>
      </div>
      </header>
  )
}

export default Header