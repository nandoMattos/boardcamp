import connection from "../../database/db.js";

export default async function customerIdExistsValidationMiddleware(
  req,
  res,
  next
) {
  const { customerId } = req.rentalInfo;

  try {
    const customerExists = await connection.query(
      `
      SELECT *
      FROM customers
      WHERE id = $1;
    `,
      [customerId]
    );

    if (!customerExists.rows[0]) {
      res.status(400).send("Cliente não existente.");
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
