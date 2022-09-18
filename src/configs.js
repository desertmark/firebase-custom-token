import firebaseAdmin from "firebase-admin";
const { PORT, FIREBASE_API_KEY, FIREBASE_BASE_64_SERVICE_ACCOUNT } =
  process.env;
const getServiceAccount = () => {
  try {
    const serviceAccount = JSON.parse(
      Buffer.from(FIREBASE_BASE_64_SERVICE_ACCOUNT, "base64").toString()
    );
    console.log("Service account parsed");
    return serviceAccount;
  } catch (error) {
    console.error("Failed to parse FIREBASE_BASE_64_SERVICE_ACCOUNT");
  }
};

export const config = {
  port: PORT || 80,
  firebaseConfig: {
    apiKey: FIREBASE_API_KEY,
    authDomain: "inno-lunch.firebaseapp.com",
    projectId: "inno-lunch",
    storageBucket: "inno-lunch.appspot.com",
    messagingSenderId: "475476904888",
    appId: "1:475476904888:web:fceffb5d327f675e38dd4d",
    measurementId: "G-GZGSXF7BLS",
    credential: firebaseAdmin.credential.cert(getServiceAccount()),
  },
};
