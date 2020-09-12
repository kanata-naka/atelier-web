import firebase from "firebase/app";
import "firebase/functions";
import { Globals } from "./models";

/**
 * Firebaseを初期化する
 */
export const initializeFirebase = ({
  ENVIRONMENT,
  API_BASE_URL,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID
}) => {
  if (firebase.apps.length) {
    return;
  }
  firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID
  });
  if (ENVIRONMENT !== "production") {
    // ローカル環境の場合
    firebase.functions().useFunctionsEmulator(API_BASE_URL);
  }
};

/**
 * Firebase Functionsの関数を実行する
 */
export const callFunction = async ({ name, data, globals: { env } }) => {
  try {
    let callable;
    if ((env ? env.ENVIRONMENT : Globals.env.ENVIRONMENT) !== "production") {
      // ローカル環境の場合
      callable = firebase.functions().httpsCallable(name);
    } else {
      callable = firebase
        .app()
        .functions(env ? env.FIREBASE_REGION : Globals.env.FIREBASE_REGION)
        .httpsCallable(name);
    }
    return await callable({ ...data });
  } catch (error) {
    throw error;
  }
};
