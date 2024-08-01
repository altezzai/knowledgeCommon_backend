const express = require("express");
const bodyParser = require("body-parser");
const models = require("./models");
const path = require("path");
const submissionsRouter = require("./routes/submissions");
const departmentRouter = require("./routes/departments");
const collegeRouter = require("./routes/colleges");
const universityRouter = require("./routes/university");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());

app.use("/submissions", submissionsRouter);
app.use("/departments", departmentRouter);
app.use("/colleges", collegeRouter);
app.use("/universities", universityRouter);

app.get("/", (req, res) => {
  res.send("Hello, Sequelize!");
});

models.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;
