const express = require("express");

const app = express();

const PORT = 5000;
app.use(express.json());

app.use("/api/auth", require("./api/auth"));

app.use("/api/trip", require("./api/trip"));

app.listen(PORT, () => console.log("Listening on PORT 5000"));
