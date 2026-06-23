const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql =
    "SELECT * FROM admins WHERE username = ? AND password = ?";

  db.query(
    sql,
    [username, password],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database Error" });
      }

      if (results.length > 0) {
        return res.json({
          success: true,
          message: "Login Successful",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  );
});

module.exports = router;