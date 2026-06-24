require("dotenv").config();
const express = require("express");
const cors = require("cors");
const storeFeedbackRoutes = require("./routes/storeFeedbackRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const staffReviewRoutes =
  require("./routes/staffReviewRoutes");

require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/api/store-feedback",
  storeFeedbackRoutes
);
app.use("/api/employees", employeeRoutes);
app.use(
  "/api/staff-reviews",
  staffReviewRoutes
);

app.get("/", (req, res) => {
  res.send("VMM Feedback Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const exportRoutes =
  require("./routes/exportRoutes");
app.use(
  "/api/export",
  exportRoutes
);
const adminRoutes =
  require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);