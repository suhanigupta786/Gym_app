import React from 'react';
import { Cannabis, Home, Dumbbell, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <Cannabis className="h-7 w-7 text-purple-400" />
              <span className="font-bold text-xl ml-2">WorkoutTracker</span>
            </div>
          </div> 
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 transition-colors">
              <Home className="w-5 h-5 mr-1.5" />
              <span>Dashboard</span>
            </button>
            <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
              <Dumbbell className="w-5 h-5 mr-1.5" />
              <span>Add Workout</span>
            </button>
            <button className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors">
              <LogIn className="w-4 h-4 mr-1.5" />
              <span>Login</span>
            </button>
            <button className="flex items-center px-4 py-2 rounded-md text-sm font-medium border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 transition-colors">
              <UserPlus className="w-4 h-4 mr-1.5" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    )
}
export default Navbar; 