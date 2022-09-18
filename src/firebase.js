import firebaseAdmin from "firebase-admin";
import { config } from "./configs.js";

export const firebase = firebaseAdmin.initializeApp(config.firebaseConfig);
console.log("Firebase initialized, Project is: ", firebase.options.projectId);
