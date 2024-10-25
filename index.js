const express = require("express");
const app = express();
const router = require("./routes/apis");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");
const path = require("path");

const port = 8080;

// Set EJS as the template engine
app.set("view engine", "ejs");
// Set the 'views' directory for the EJS templates
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

// Serve EJS template
app.get("/views/availability", (req, res) => {
  res.render("availability");
});

app.use("/api", router);

// Route for Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log("server running at port ", port);
});

module.exports = app;
