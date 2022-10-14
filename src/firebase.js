import firebaseAdmin from "firebase-admin";
import { config } from "./configs.js";

export const firebase = firebaseAdmin.initializeApp(config.firebaseConfig);
console.log("Firebase initialized, Project is: ", firebase.options.projectId);

export const getUserByEmail = async (userInfo) => {
  try {
    return await firebase.auth().getUserByEmail(userInfo.mail);
  } catch (error) {
    // Failes when the error is not found. So continue to error creation.
    return;
  }
};

export const getOrCreateIfNotExists = async (userInfo) => {
  try {
    const user = await getUserByEmail(userInfo);
    if (!user) {
      console.debug("Creating user", userInfo.mail);
      // Create if not exists
      return await firebase.auth().createUser({
        displayName: userInfo.displayName,
        email: userInfo.mail,
        uid: userInfo.id,
      });
    }
    return user;
  } catch (error) {
    console.error("Failed to create firebase user", { error, userInfo });
    throw Error("Failed to create firebase user");
  }
};
/**
 *
 * @param {UserRecord} firebaseUserRecord
 * @returns
 */
export const loginToFirebase = async (firebaseUserRecord) => {
  try {
    const token = await firebase
      .auth()
      .createCustomToken(firebaseUserRecord.uid, firebaseUserRecord);
    console.debug("Login to firebase successful", firebaseUserRecord.email);
    return token;
  } catch (error) {
    console.error("Failed to create custom token", {
      error,
      firebaseUserRecord,
    });
    throw Error("Failed to create custom token");
  }
};
