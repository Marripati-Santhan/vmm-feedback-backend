const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Submit Store Feedback
router.post("/", (req, res) => {

  const {
    customer_name,
    comment,
    suggestion,
    rating
  } = req.body;

  const sql = `
    INSERT INTO store_feedback
    (customer_name, comment, suggestion, rating)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customer_name,
      comment,
      suggestion,
      rating
    ],
    (err, result) => {

      if (err) {
        console.log("Store Feedback Error:", err);

return res.status(500).json({
  message: err.message,
  error: err,
});
      }

      res.status(200).json({
        message: "Feedback Submitted Successfully",
      });

    }
  );

});
router.get("/stats", (req, res) => {

  const sql = `
    SELECT
      ROUND(AVG(rating),1) AS averageRating,
      COUNT(*) AS totalReviews
    FROM store_feedback
    WHERE rating > 0
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Error fetching stats",
      });
    }

    res.status(200).json(result[0]);
  });

});

// Recent Store Feedbacks
router.get("/", (req, res) => {
  const sql = `
    SELECT *
    FROM store_feedback
    ORDER BY created_at DESC
    LIMIT 5
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message:
          "Error fetching feedback",
      });
    }

    res.json(result);
  });
});

// Total Store Feedbacks
router.get(
  "/total-store-feedbacks",
  (req, res) => {
    const sql =
      "SELECT COUNT(*) AS total FROM store_feedback";

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    });
  }
);

module.exports = router;