const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;
const dataPath = path.join(__dirname, "data", "data.json");

app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/data", express.static(path.join(__dirname, "data")));
app.get("/vendor/three.module.js", (_req, res) =>
  res.sendFile(path.join(__dirname, "node_modules", "three", "build", "three.module.js")),
);

function readPortfolioData() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch (error) {
    return { name: "Prakash Swarnkar", error: "Portfolio data could not be loaded." };
  }
}

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/resume", (_req, res) => res.sendFile(path.join(__dirname, "data", "resume.pdf")));
app.get("/api/portfolio", (_req, res) => res.json(readPortfolioData()));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/data") || req.path.startsWith("/vendor")) {
    return next();
  }
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Portfolio server running on port ${port}`);
  });
}

module.exports = app;
