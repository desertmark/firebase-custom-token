import "dotenv/config";
import express from "express";
import { config } from "./configs.js";
import bodyParser from "body-parser";
import { createIfNotExists, firebase, loginToFirebase } from "./firebase.js";
import { validateToken } from "./azure.js";
const app = express();

app.use(bodyParser.json());
app.get("/", (req, res) => {
  const resBody = {
    ok: new Date().toISOString(),
    firebase: firebase.options.projectId,
  };
  console.debug("GET: / ", resBody);
  res.json(resBody);
});
app.post("/token", async (req, res) => {
  try {
    // Validate azure access token;
    const accessToken = req.headers?.authorization?.split(" ")?.[1];
    const userInfo = await validateToken(accessToken);
    console.info("Generating token for: ", userInfo);
    // create the user if it's new
    await createIfNotExists(userInfo);
    // Authenticate with firebase
    const token = await loginToFirebase(userInfo);
    res.json({ token });
  } catch (error) {
    console.log("Failed to generate firebase token", { error });
    res.json({ error: error.message });
  }
});

app.listen(config.port, () =>
  console.log(`🚀 Server running on port ${config.port} 🚀`)
);
