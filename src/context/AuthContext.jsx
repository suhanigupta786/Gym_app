// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Firebase signup - returns userCredential
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Firebase login - returns userCredential
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Logout
  const logout = () => signOut(auth);

  // ✅ Update profile (e.g. displayName)
  const updateUserProfile = (updates) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, updates);
    }
    return null;
  };

  // ✅ Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
