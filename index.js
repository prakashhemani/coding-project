const express = require("express");
const app = express();
const router = require("./routes/apis");
const path = require("path");

const port = 8080;

// Configure EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

// Serve availability EJS template
app.get("/views/availability", (req, res) => {
  res.render("availability");
});

// API routes
app.use("/api", router);

app.listen(port, () => {
  console.log("server running at port ", port);
});

module.exports = app;