const express = require("express");
const app = express();
const submissionRoutes = require("./routes/submissionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { sequelize } = require("./models");

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/submissions", submissionRoutes);
app.use("/admin", adminRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected");
});
