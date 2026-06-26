const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM employees";

  db.query(sql, (err, result) => {
    if (err) {
  console.log("Employee Route Error:", err);

  return res.status(500).json({
    message: err.message,
    error: err,
  });
}

    res.status(200).json(result);
  });
});

module.exports = router;