import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Cannabis, 
  Home, 
  Dumbbell, 
  LogIn, 
  UserPlus, 
  Menu, 
  X, 
  List, 
  LogOut, 
  User as UserIcon
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="bg-gray-800 p-2 rounded-full group-hover:bg-purple-900 transition-all duration-300">
                <Cannabis className="h-7 w-7 text-purple-400 group-hover:text-purple-300" />
              </div>
              <span className="font-bold text-xl ml-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">WorkoutTracker</span>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'text-white bg-purple-600 shadow-lg shadow-purple-500/20' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Home className="w-5 h-5 mr-1.5" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/workouts" 
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/workouts') 
                  ? 'text-white bg-purple-600 shadow-lg shadow-purple-500/20' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <List className="w-5 h-5 mr-1.5" />
              <span>Workouts</span>
            </Link>
            <Link 
              to="/add-workout" 
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/add-workout') 
                  ? 'text-white bg-purple-600 shadow-lg shadow-purple-500/20' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Dumbbell className="w-5 h-5 mr-1.5" />
              <span>Add Workout</span>
            </Link>
            
            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
                >
                  <div className="flex items-center">
                    <div className="bg-purple-600 rounded-full p-1 mr-2">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <span>{currentUser.name}</span>
                  </div>
                </button>
                
                {profileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <div className="flex items-center">
                          <LogOut className="w-4 h-4 mr-2" />
                          <span>Sign Out</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20"
                >
                  <LogIn className="w-4 h-4 mr-1.5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <UserPlus className="w-4 h-4 mr-1.5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 shadow-lg">
          <Link 
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? 'text-white bg-purple-600' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link 
            to="/workouts"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/workouts') 
                ? 'text-white bg-purple-600' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <List className="w-5 h-5 mr-2" />
              <span>Workouts</span>
            </div>
          </Link>
          <Link 
            to="/add-workout"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/add-workout') 
                ? 'text-white bg-purple-600' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <Dumbbell className="w-5 h-5 mr-2" />
              <span>Add Workout</span>
            </div>
          </Link>
          
          {currentUser ? (
            <>
              <div className="px-3 py-2 text-base font-medium text-gray-300 border-t border-gray-700 mt-2 pt-2">
                <div className="flex items-center">
                  <div className="bg-purple-600 rounded-full p-1 mr-2">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <span>{currentUser.name}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <LogOut className="w-5 h-5 mr-2" />
                  <span>Sign Out</span>
                </div>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-purple-600 to-purple-700 text-white"
              >
                <div className="flex items-center">
                  <LogIn className="w-5 h-5 mr-2" />
                  <span>Login</span>
                </div>
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium border border-purple-500 text-purple-400"
              >
                <div className="flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  <span>Sign Up</span>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 