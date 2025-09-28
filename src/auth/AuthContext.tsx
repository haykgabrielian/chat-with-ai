import React, { createContext, useEffect, useMemo, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

type AuthContextType = {
  user: User | null;
  loadingUser: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loadingUser: true,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser);
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, loadingUser }), [user, loadingUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthProvider;
