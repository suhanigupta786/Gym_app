import React, { createContext, useState, useContext, useEffect } from 'react';
import workoutData from '../assets/workoutData';
const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState(workoutData);
  const [stats, setStats] = useState({
    totalCalories: 0,
    totalWorkouts: 0,
    avgCaloriesPerWorkout: 0,
    categories: {}
  });


  useEffect(() => {
    calculateStats();
  },[workouts]);

  const calculateStats = () => {
    const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0);
    
    const totalWorkouts = workouts.length;
    
    const avgCaloriesPerWorkout = totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0;
    
    const categories = workouts.reduce((acc, workout) => {
      acc[workout.type] = (acc[workout.type] || 0) + 1;
      return acc;
    }, {});
    
    setStats({
      totalCalories,
      totalWorkouts,
      avgCaloriesPerWorkout,
      categories
    });
  };

  const addWorkout = (newWorkout) => {
    const newId = workouts.length > 0 ? Math.max(...workouts.map(w => w.id || 0)) + 1 : 1;
    
    const workoutWithId = { 
      ...newWorkout, 
      id: newId 
    };
    
    setWorkouts([...workouts, workoutWithId]);
    
    return newId;
  };

  const value = {
    workouts,
    stats,
    addWorkout
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === null) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};

export default WorkoutContext; 