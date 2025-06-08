import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../context/WorkoutContext';
import { Plus, Minus, Save, Dumbbell, Calendar, Clock, Flame, FileText } from 'lucide-react';

const AddWorkout = () => {
  const navigate = useNavigate();
  const { addWorkout } = useWorkout();
  const [formData, setFormData] = useState({
    type: '',
    date: new Date().toISOString().split('T')[0],
    duration: 0,
    calories: 0,
    notes: '',
    exercises: [{ name: '', sets: 0, reps: 0 }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...formData.exercises];
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: field === 'name' ? value : Number(value)
    };
    
    setFormData({
      ...formData,
      exercises: updatedExercises
    });
  };

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, { name: '', sets: 0, reps: 0 }]
    });
  };

  const removeExercise = (index) => {
    if (formData.exercises.length > 1) {
      const updatedExercises = formData.exercises.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        exercises: updatedExercises
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert string values to numbers
    const workoutToAdd = {
      ...formData,
      duration: Number(formData.duration),
      calories: Number(formData.calories)
    };
    
    addWorkout(workoutToAdd);
    navigate('/');
  };

  // Workout type options
  const workoutTypes = [
    "Strength", "Cardio", "HIIT", "Flexibility", 
    "VR Boxing", "Neural Training", "Biofeedback Training",
    "AI-Powered Yoga", "Holographic Cycling", "Gravity Resistance"
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 border border-gray-700">
        <div className="flex items-center mb-8">
          <Dumbbell className="h-8 w-8 text-purple-400 mr-3" />
          <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Add New Workout
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-gray-300 mb-1 font-medium">
                <Dumbbell className="h-4 w-4 mr-2 text-purple-400" />
                Workout Type
              </label>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                  required
                >
                  <option value="">Select workout type</option>
                  {workoutTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                  <option value="custom">Custom...</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              {formData.type === 'custom' && (
                <input
                  type="text"
                  name="customType"
                  placeholder="Enter custom workout type"
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                />
              )}
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center text-gray-300 mb-1 font-medium">
                <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center text-gray-300 mb-1 font-medium">
                <Clock className="h-4 w-4 mr-2 text-purple-400" />
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                min="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center text-gray-300 mb-1 font-medium">
                <Flame className="h-4 w-4 mr-2 text-purple-400" />
                Calories Burned
              </label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center text-gray-300 mb-1 font-medium">
              <FileText className="h-4 w-4 mr-2 text-purple-400" />
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
              rows="3"
              placeholder="Optional notes about your workout"
            ></textarea>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                Exercises ({formData.exercises.length})
              </h2>
              <button
                type="button"
                onClick={addExercise}
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                <Plus size={18} className="mr-2" /> Add Exercise
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.exercises.map((exercise, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 rounded-lg border border-gray-700 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-500/30"
                >
                  <div className="flex justify-between mb-4">
                    <h3 className="text-white font-medium flex items-center">
                      <span className="flex items-center justify-center bg-purple-600 text-white rounded-full w-6 h-6 mr-2 text-sm">
                        {index + 1}
                      </span>
                      Exercise {index + 1}
                    </h3>
                    {formData.exercises.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExercise(index)}
                        className="text-red-400 hover:text-red-300 bg-gray-800 hover:bg-gray-700 p-1.5 rounded-full transition-colors duration-200"
                      >
                        <Minus size={16} />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-gray-300 text-sm font-medium">Exercise Name</label>
                      <input
                        type="text"
                        value={exercise.name}
                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                        placeholder="e.g., Bench Press"
                        required
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-gray-300 text-sm font-medium">Sets</label>
                      <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                        min="0"
                        required
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-gray-300 text-sm font-medium">Reps</label>
                      <input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              <Save size={20} className="mr-2" /> Save Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkout; 