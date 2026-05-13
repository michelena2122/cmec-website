import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// This is a placeholder. The real config will be injected after Firebase setup.
// I'll update this once firebase-applet-config.json is available.
let firebaseConfig = {};

try {
  // If the file exists, we import it (standard for this env)
  // @ts-ignore
  const config = await import('../firebase-applet-config.json');
  firebaseConfig = config.default;
} catch (e) {
  console.warn('Firebase config not found yet. Waiting for setup...');
}

const app = initializeApp(firebaseConfig as any);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
