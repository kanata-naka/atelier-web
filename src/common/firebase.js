import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/functions";
import getConfig from "next/config";

// 環境設定を取得する
const { publicRuntimeConfig } = getConfig();

/**
 * Firebaseを初期化する
 */
export const initializeFirebase = isServer => {
  if (firebase.apps.length) {
    return;
  }
  firebase.initializeApp(publicRuntimeConfig.FIREBASE_CONFIG);
  if (!isServer) {
    firebase.analytics();
  }
  if (publicRuntimeConfig.ENVIRONMENT !== "production") {
    // ローカル環境の場合
    firebase.functions().useFunctionsEmulator("http://localhost:5000");
  }
};

/**
 * Firebase Functionsの関数を実行する
 */
export const callFunction = async (name, data) => {
  try {
    const callable = firebase
      .app()
      .functions(publicRuntimeConfig.FIREBASE_REGION)
      .httpsCallable(name);
    return await callable({ ...data });
  } catch (error) {
    throw error;
  }
};
