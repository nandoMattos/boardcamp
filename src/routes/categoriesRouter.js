import express, { Router } from "express";
import connection from "../database/db.js";

const router = Router();

router.get("/oi", async (req, res) => {
  const customers = await connection.query(`
    SELECT *
    FROM customers;
  `);

  res.send(customers.rows);
});

export default router;
