import firebaseAdmin from "firebase-admin";
import { config } from "./configs.js";

export const firebase = firebaseAdmin.initializeApp(config.firebaseConfig);
console.log("Firebase initialized, Project is: ", firebase.options.projectId);

export const createIfNotExists = async (userInfo) => {
  try {
    const user = await firebase.auth().getUserByEmail(userInfo.mail);
    if (!user) {
      console.debug("Creating user", userInfo.mail);
      // Create if not exists
      await firebase.auth().createUser({
        displayName: userInfo.displayName,
        email: userInfo.mail,
        uid: userInfo.id,
      });
    }
  } catch (error) {
    console.error("Failed to create firebase user", { error, userInfo });
    throw Error("Failed to create firebase user");
  }
};

export const loginToFirebase = async (userInfo) => {
  try {
    const token = await firebase
      .auth()
      .createCustomToken(userInfo.id, userInfo);
    console.debug("Login to firebase successful", userInfo.mail);
    return token;
  } catch (error) {
    console.error("Failed to create custom token", { error, userInfo });
    throw Error("Failed to create custom token");
  }
};
