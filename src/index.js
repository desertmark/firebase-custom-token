import "dotenv/config";
import express from "express";
import { config } from "./configs.js";
import bodyParser from "body-parser";
import { firebase } from "./firebase.js";
const app = express();

app.use(bodyParser.json());
app.get("/", (req, res) =>
  res.json({
    ok: new Date().toISOString(),
    firebase: firebase.options.projectId,
  })
);
app.post("/token", async (req, res) => {
  console.debug("Generate token for", req.body);
  try {
    let user;
    try {
      user = await firebase.auth().getUserByEmail(req.body.claims.email);
    } catch (error) {}
    if (!user) {
      await firebase.auth().createUser({
        displayName: req.body.claims.displayName,
        email: req.body.claims.email,
        uid: req.body.uid,
      });
    }
    const token = await firebase
      .auth()
      .createCustomToken(req.body.uid, req.body.claims);
    res.json({ token });
  } catch (error) {
    console.log("Failed to generate firebase token", { error, body: req.body });
    res.json({ error });
  }
});

app.listen(config.port, () =>
  console.log(`🚀 Server running on port ${config.port} 🚀`)
);
