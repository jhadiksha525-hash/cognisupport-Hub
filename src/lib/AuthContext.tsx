import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  User 
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          // Sync/get user profile
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          
          if (!userSnap.exists()) {
            const newProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || user.email?.split('@')[0] || 'User',
              photoURL: user.photoURL || '',
              createdAt: serverTimestamp()
            };
            await setDoc(userRef, newProfile);
            setProfile(newProfile);
          } else {
            setProfile(userSnap.data());
          }
        } catch (error: any) {
          if (error?.message?.includes('offline') || error?.code === 'unavailable') {
            console.warn("Firestore is currently offline or unreachable. Using locally derived profile fallback.");
          } else {
            console.error("Error syncing profile:", error);
          }
          
          // Use basic info if we can't fetch the full profile due to network
          setProfile({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
            photoURL: user.photoURL || '',
            isOffline: true,
            orgId: localStorage.getItem(`orgId_${user.uid}`) || 'default-org' // Optional: try to remember last org
          });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Auth error:", error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await sendEmailVerification(userCredential.user);
      
      // Initial profile creation
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        email: email,
        displayName: name,
        photoURL: '',
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Signin error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signUpWithEmail, signInWithEmail, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
