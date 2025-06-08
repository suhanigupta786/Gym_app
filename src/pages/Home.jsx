import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Dumbbell, BarChart3, Activity, ChevronRight } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';

const HomePage = () => {
  const { stats, workouts } = useWorkout();
  const recentWorkouts = [...workouts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="w-full">
      <div className="bg-gray-900 text-white p-8 rounded-lg mb-8 border border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-purple-400">Fitness Dashboard</h1>
        <p className="text-gray-400 mb-8">Track your progress, celebrate your achievements</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg flex items-center border border-gray-700 shadow-lg">
            <Flame className="w-12 h-12 mr-4 text-orange-400" />
            <div>
              <p className="text-sm text-gray-400">Total Calories</p>
              <p className="text-3xl font-bold text-white">{stats.totalCalories}</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg flex items-center border border-gray-700 shadow-lg">
            <Dumbbell className="w-12 h-12 mr-4 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Workouts</p>
              <p className="text-3xl font-bold text-white">{stats.totalWorkouts}</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg flex items-center border border-gray-700 shadow-lg">
            <BarChart3 className="w-12 h-12 mr-4 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">Avg. Calories</p>
              <p className="text-3xl font-bold text-white">{stats.avgCaloriesPerWorkout}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Activity className="w-6 h-6 mr-2 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Recent Workouts</h2>
          </div>
          
          <Link to="/workouts" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors cursor-pointer group">
            <span className="mr-1 group-hover:underline">View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {recentWorkouts.length > 0 ? (
          <div className="space-y-4">
            {recentWorkouts.map((workout) => (
              <div key={workout.id} className="border-b border-gray-700 pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">{workout.type}</h3>
                    <p className="text-sm text-gray-400">{new Date(workout.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 font-bold">{workout.calories} calories</p>
                    <p className="text-sm text-gray-400">{workout.duration} min</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 bg-gray-800 rounded-lg">
            <p>No workouts recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
