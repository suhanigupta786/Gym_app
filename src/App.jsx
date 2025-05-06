import React from 'react';
import { WorkoutProvider } from './context/WorkoutContext';
import HomePage from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <WorkoutProvider>
      <div className="min-h-screen flex flex-col bg-gray-800">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-8">
          <HomePage />
        </div>
      </div>
    </WorkoutProvider>
  );
}

export default App;
