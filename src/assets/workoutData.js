const workoutData = [
    {
        id: 1,
        type: "HIIT Fusion",
        date: "2025-01-15",
        duration: 45,
        calories: 450,
        exercises: [
          { name: "Dynamic Burpees", sets: 3, reps: 12 },
          { name: "Mountain Climbers", sets: 3, reps: 20 },
          { name: "Jump Squats", sets: 3, reps: 15 }
        ]
    },
    {
        id: 2,
        type: "VR Boxing",
        date: "2025-01-14",
        duration: 30,
        calories: 380,
        exercises: [
          { name: "Jab Cross Combo", sets: 4, reps: 20 },
          { name: "Hook Punch", sets: 3, reps: 15 },
          { name: "Upper Cut", sets: 3, reps: 15 }
        ]
    },
    {
        id: 3,
        type: "AI-Powered Yoga",
        date: "2025-01-13",
        duration: 60,
        calories: 320,
        exercises: [
          { name: "Sun Salutation", sets: 3, reps: 5 },
          { name: "Warrior Flow", sets: 2, reps: 8 },
          { name: "Balance Sequence", sets: 2, reps: 6 }
        ]
    },
    {
        id: 4,
        type: "Holographic Cycling",
        date: "2025-01-12",
        duration: 40,
        calories: 420,
        exercises: [
          { name: "Virtual Hill Climb", sets: 1, duration: "15min" },
          { name: "Speed Intervals", sets: 1, duration: "10min" },
          { name: "Cool Down", sets: 1, duration: "15min" }
        ]
    },
    {
        id: 5,
        type: "Neural Training",
        date: "2025-01-11",
        duration: 35,
        calories: 280,
        exercises: [
          { name: "Mind-Muscle Connection", sets: 3, reps: 12 },
          { name: "Focus Drills", sets: 3, reps: 10 },
          { name: "Coordination Patterns", sets: 3, reps: 8 }
        ]
    },
    {
        id: 6,
        type: "Gravity Resistance",
        date: "2025-01-10",
        duration: 50,
        calories: 410,
        exercises: [
          { name: "Anti-Gravity Pushups", sets: 4, reps: 12 },
          { name: "Floating Squats", sets: 3, reps: 15 },
          { name: "Zero-G Lunges", sets: 3, reps: 12 }
        ]
    },
    {
        id: 7,
        type: "Biofeedback Training",
        date: "2025-01-09",
        duration: 45,
        calories: 360,
        exercises: [
          { name: "Heart Rate Control", sets: 3, duration: "10min" },
          { name: "Muscle Activation", sets: 3, reps: 12 },
          { name: "Recovery Breathing", sets: 3, duration: "5min" }
        ]
    },
    {
        id: 8,
        date: '2024-06-14',
        type: 'Strength',
        exercises: [
          { name: 'Incline Bench Press', sets: 3, reps: 10, weight: 115 },
          { name: 'Lat Pulldown', sets: 3, reps: 12, weight: 130 },
          { name: 'Dumbbell Curls', sets: 3, reps: 12, weight: 25 },
          { name: 'Tricep Extensions', sets: 3, reps: 12, weight: 25 },
        ],
        duration: 55,
        calories: 340,
        notes: 'Upper body focus, great pump in the arms'
    },
    {
        id: 9,
        date: '2024-06-15',
        type: 'HIIT',
        exercises: [
          { name: 'Box Jumps', sets: 4, reps: 12 },
          { name: 'Battle Ropes', sets: 4, time: 30 }, 
          { name: 'Plank to Push-up', sets: 4, reps: 10 },
        ],
        duration: 35,
        calories: 420,
        notes: 'Explosive movements, heart rate stayed high throughout'
    },
    {
        id: 10,
        date: '2024-06-17',
        type: 'Cardio',
        exercises: [
          { name: 'Swimming', distance: 1, unit: 'km', time: 30 },
          { name: 'Water Treading', time: 10 },
        ],
        duration: 40,
        calories: 360,
        notes: 'Pool workout, felt great with lower impact on joints'
    },
    {
        id: 11,
        date: '2024-06-19',
        type: 'Strength',
        exercises: [
          { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 165 },
          { name: 'Hip Thrusts', sets: 3, reps: 12, weight: 185 },
          { name: 'Cable Rows', sets: 3, reps: 12, weight: 130 },
          { name: 'Face Pulls', sets: 3, reps: 15, weight: 50 },
        ],
        duration: 50,
        calories: 370,
        notes: 'Back and posterior chain day, focusing on form'
    },
    {
        id: 12,
        date: '2024-06-21',
        type: 'Flexibility',
        exercises: [
          { name: 'Pilates', time: 40 }, 
          { name: 'Foam Rolling', time: 10 }, 
        ],
        duration: 50,
        calories: 200,
        notes: 'Core stability work and recovery, feeling more mobile'
    },
    {
        id: 13,
        date: new Date().toISOString().split('T')[0], 
        type: 'Cardio',
        exercises: [
          { name: 'Interval Running', distance: 4, unit: 'km', time: 20 },
          { name: 'Stair Climber', time: 15 }, 
        ],
        duration: 35,
        calories: 330,
        notes: 'Today\'s workout - mixed cardio intervals for heart health'
    },
    {
        id: 14,
        date: '2024-06-24',
        type: 'Strength',
        exercises: [
          { name: 'Chest Flyes', sets: 3, reps: 12, weight: 20 },
          { name: 'Shoulder Raises', sets: 3, reps: 15, weight: 15 },
          { name: 'Push-ups', sets: 4, reps: 20 },
          { name: 'Dips', sets: 3, reps: 12 },
        ],
        duration: 45,
        calories: 310,
        notes: 'Upper body push day, focused on higher reps and time under tension'
    },
    {
        id: 15,
        date: '2024-06-26',
        type: 'HIIT',
        exercises: [
          { name: 'Assault Bike', time: 1, sets: 6 },
          { name: 'Russian Twists', sets: 3, reps: 20, weight: 10 },
          { name: 'Medicine Ball Slams', sets: 3, reps: 15, weight: 12 },
        ],
        duration: 30,
        calories: 390,
        notes: 'Short but intense workout, felt completely exhausted'
    }
];

export default workoutData; 