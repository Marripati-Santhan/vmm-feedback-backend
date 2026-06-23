const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Submit Staff Review
router.post("/submit", (req, res) => {
  const {
    employee_id,
    customer_name,
    rating,
    comment,
  } = req.body;

  const sql = `
    INSERT INTO staff_reviews
    (employee_id, customer_name, rating, comment)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      employee_id,
      customer_name,
      rating,
      comment,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error saving review",
        });
      }

      res.status(200).json({
        message:
          "Review submitted successfully",
      });
    }
  );
});

// Average Ratings
router.get("/ratings", (req, res) => {
  const sql = `
    SELECT
      employee_id,
      ROUND(AVG(rating),1) AS average_rating,
      COUNT(*) AS total_reviews
    FROM staff_reviews
    GROUP BY employee_id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message:
          "Error fetching ratings",
      });
    }

    res.status(200).json(result);
  });
});

// Total Staff Reviews
router.get(
  "/total-staff-reviews",
  (req, res) => {
    const sql =
      "SELECT COUNT(*) AS total FROM staff_reviews";

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    });
  }
);

// Top Rated Employee
router.get("/top-employee", (req, res) => {
  const sql = `
    SELECT
      e.employee_name,
      ROUND(AVG(sr.rating),1) AS average_rating
    FROM employees e
    JOIN staff_reviews sr
      ON e.id = sr.employee_id
    GROUP BY e.id
    ORDER BY average_rating DESC
    LIMIT 1
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
});

// Recent Reviews
router.get("/recent-reviews", (req, res) => {
  const sql = `
    SELECT
      customer_name,
      comment,
      created_at
    FROM staff_reviews
    ORDER BY created_at DESC
    LIMIT 5
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});
router.get("/review-counts", (req, res) => {
  const sql = `
    SELECT
      employee_id,
      COUNT(*) AS review_count
    FROM staff_reviews
    GROUP BY employee_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

module.exports = router;