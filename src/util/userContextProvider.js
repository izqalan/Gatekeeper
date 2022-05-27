import React, { useEffect, useState, createContext, useContext } from 'react'
import { firebase } from './firebase';

//firebase user context provider
export const UserContext = createContext({
  user: null,
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async firebaseUser => {
      setUser(firebaseUser ?? null);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const value = { user };
  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}
