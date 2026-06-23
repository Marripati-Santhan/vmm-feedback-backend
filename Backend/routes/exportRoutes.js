const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");
const db = require("../config/db");

router.get("/reviews", async (req, res) => {
  const sql = `
    SELECT
      employee_id,
      customer_name,
      rating,
      comment,
      created_at
    FROM staff_reviews
  `;

  db.query(sql, async (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet =
      workbook.addWorksheet("Staff Reviews");

    worksheet.columns = [
      {
        header: "Employee ID",
        key: "employee_id",
        width: 15,
      },
      {
        header: "Customer Name",
        key: "customer_name",
        width: 20,
      },
      {
        header: "Rating",
        key: "rating",
        width: 10,
      },
      {
        header: "Comment",
        key: "comment",
        width: 40,
      },
      {
        header: "Date",
        key: "created_at",
        width: 25,
      },
    ];

    results.forEach((row) => {
      worksheet.addRow(row);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=reviews.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();
  });
});

module.exports = router;