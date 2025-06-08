import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { 
  Dumbbell, 
  Calendar, 
  Clock, 
  Flame, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Filter,
  Search,
  CalendarRange
} from 'lucide-react';

const Workouts = () => {
  const { workouts } = useWorkout();
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });


  const workoutTypes = ['All', ...new Set(workouts.map(workout => workout.type))];


  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };


  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setDateRange({ startDate: '', endDate: '' });
  };


  const getSortedWorkouts = () => {
    let sortableWorkouts = [...workouts];
    

    if (searchTerm) {
      sortableWorkouts = sortableWorkouts.filter(workout => 
        workout.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.exercises.some(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    

    if (filterType && filterType !== 'All') {
      sortableWorkouts = sortableWorkouts.filter(workout => workout.type === filterType);
    }
    

    if (dateRange.startDate) {
      sortableWorkouts = sortableWorkouts.filter(workout => 
        new Date(workout.date) >= new Date(dateRange.startDate)
      );
    }
    
    if (dateRange.endDate) {
      sortableWorkouts = sortableWorkouts.filter(workout => 
        new Date(workout.date) <= new Date(dateRange.endDate)
      );
    }
    

    if (sortConfig.key) {
      sortableWorkouts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableWorkouts;
  };

  const sortedWorkouts = getSortedWorkouts();


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    }
    return null;
  };


  const hasActiveFilters = searchTerm || filterType || dateRange.startDate || dateRange.endDate;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 border border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Dumbbell className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              All Workouts
            </h1>
          </div>
          <div className="text-gray-400">
            <span className="font-medium">{sortedWorkouts.length}</span> workouts found
          </div>
        </div>

        
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                placeholder="Search workouts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-500" />
              </div>
              <select
                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">All Types</option>
                {workoutTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
          
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center text-gray-400 mr-2">
              <CalendarRange size={18} className="mr-2" />
              <span className="text-sm font-medium">Date Range:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 flex-grow">
              <div className="relative flex-grow">
                <input
                  type="date"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleDateChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                  placeholder="Start Date"
                />
              </div>
              
              <div className="flex items-center justify-center">
                <span className="text-gray-400">to</span>
              </div>
              
              <div className="relative flex-grow">
                <input
                  type="date"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleDateChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:outline-none"
                  placeholder="End Date"
                />
              </div>
            </div>
            
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

            
        {sortedWorkouts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-900">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('type')}
                  >
                    <div className="flex items-center">
                      <span>Type</span>
                      <div className="ml-1">{getSortIcon('type')}</div>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('date')}
                  >
                    <div className="flex items-center">
                      <span>Date</span>
                      <div className="ml-1">{getSortIcon('date')}</div>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('duration')}
                  >
                    <div className="flex items-center">
                      <span>Duration</span>
                      <div className="ml-1">{getSortIcon('duration')}</div>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('calories')}
                  >
                    <div className="flex items-center">
                      <span>Calories</span>
                      <div className="ml-1">{getSortIcon('calories')}</div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Exercises
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sortedWorkouts.map((workout) => (
                  <tr 
                    key={workout.id} 
                    className="hover:bg-gray-700 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Dumbbell className="h-5 w-5 text-purple-400 mr-2" />
                        <span className="text-white font-medium">{workout.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-300">{formatDate(workout.date)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-300">{workout.duration} min</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Flame className="h-4 w-4 text-orange-400 mr-2" />
                        <span className="text-orange-400 font-medium">{workout.calories}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {workout.exercises.slice(0, 3).map((exercise, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300"
                          >
                            {exercise.name}
                          </span>
                        ))}
                        {workout.exercises.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                            +{workout.exercises.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <FileText className="h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No workouts found</h3>
              <p className="text-gray-400">
                {hasActiveFilters ? 
                  "Try adjusting your search or filter criteria" : 
                  "Add your first workout to get started"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts; 