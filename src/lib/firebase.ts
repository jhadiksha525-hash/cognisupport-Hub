import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Use initializeFirestore to enable experimentalForceLongPolling and disable FetchStreams
// This helps avoid "offline" errors in environments with restrictive networking/proxies.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const auth = getAuth(app);

// Connectivity validation
async function testConnection() {
  try {
    // Attempt to probe the server explicitly
    await getDocFromServer(doc(db, '_connection_test_', 'probe'));
  } catch (error: any) {
    if (error?.message?.includes('offline')) {
      console.warn("Firestore is offline. Check your network or Firebase configuration.");
    }
    // "Not found" or "Permission Denied" are actually good signs of connectivity
    // as they indicate a response from the server.
  }
}

testConnection();

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: any[];
  }
}

export function handleFirestoreError(error: any, operation: FirestoreErrorInfo['operationType'], path: string | null): never {
  const user = auth.currentUser;
  const info: FirestoreErrorInfo = {
    error: error.message || 'Unknown error',
    operationType: operation,
    path,
    authInfo: {
      userId: user?.uid || 'anonymous',
      email: user?.email || 'none',
      emailVerified: user?.emailVerified || false,
      isAnonymous: user?.isAnonymous || true,
      providerInfo: user?.providerData || []
    }
  };
  
  throw new Error(JSON.stringify(info));
}
