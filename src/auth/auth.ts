import { auth } from './firebase';

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const signup = (
  email: string,
  password: string
): Promise<UserCredential> =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (
  email: string,
  password: string
): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);

export const googleSignup = (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const githubLogin = (): Promise<UserCredential> => {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logout = (): Promise<void> => signOut(auth);
