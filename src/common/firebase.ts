import { getApps, getApp, initializeApp } from "firebase/app";
import { initializeAnalytics } from "firebase/analytics";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
  HttpsCallableResult,
} from "firebase/functions";
import getConfig from "next/config";

// 環境設定を取得する
const { publicRuntimeConfig } = getConfig();

/**
 * Firebaseを初期化する
 */
export const initializeFirebase = (isServer: boolean) => {
  if (getApps().length) {
    return;
  }
  initializeApp(publicRuntimeConfig.FIREBASE_CONFIG);

  if (!isServer) {
    initializeAnalytics(getApp());
  }

  if (publicRuntimeConfig.ENVIRONMENT !== "production") {
    // ローカル環境の場合
    connectFunctionsEmulator(getFunctions(getApp()), "localhost", 5000);
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
    getFunctions(getApp(), publicRuntimeConfig.FIREBASE_REGION),
    name
  );
  return await callable(data);
};
