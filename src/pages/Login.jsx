import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 border border-gray-700">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-purple-500/20 p-3 rounded-full">
            <LogIn className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-8">Sign in to continue to WorkoutTracker</p>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg flex items-center mb-6">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 