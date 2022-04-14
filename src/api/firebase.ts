import { initializeAnalytics } from "firebase/analytics";
import { getApps, getApp, initializeApp } from "firebase/app";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
  HttpsCallableResult,
} from "firebase/functions";

/**
 * Firebaseを初期化する
 */
export const initializeFirebase = (isServer: boolean) => {
  if (getApps().length) {
    return;
  }
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MEASUREMENT_ID,
  });

  if (!isServer) {
    initializeAnalytics(getApp());
  }

  if (process.env.NEXT_PUBLIC_ENV !== "production") {
    // ローカル環境の場合
    connectFunctionsEmulator(
      getFunctions(getApp(), process.env.NEXT_PUBLIC_FIREBASE_REGION),
      "localhost",
      5000
    );
  }
};

/**
 * Firebase Functionsの関数を実行する
 */
export const callFunction = async <
  T = Record<string, unknown>,
  R = Record<string, unknown>
>(
  name: string,
  data?: T
): Promise<HttpsCallableResult<R>> => {
  const callable = httpsCallable<T, R>(
    getFunctions(getApp(), process.env.NEXT_PUBLIC_FIREBASE_REGION),
    name
  );
  return await callable(data);
};
