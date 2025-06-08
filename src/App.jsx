import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WorkoutProvider } from './context/WorkoutContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/Home';
import AddWorkout from './pages/AddWorkout';
import Workouts from './pages/Workouts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-800">
            <Navbar />
            <div className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-workout" element={
                  <ProtectedRoute>
                    <AddWorkout />
                  </ProtectedRoute>
                } />
                <Route path="/workouts" element={
                  <ProtectedRoute>
                    <Workouts />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </div>
        </Router>
      </WorkoutProvider>
    </AuthProvider>
  );
}

export default App;
