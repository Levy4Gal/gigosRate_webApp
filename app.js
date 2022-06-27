const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/index.html"));
});

app.listen(port, () => console.info("Listening on port " % { port }));
