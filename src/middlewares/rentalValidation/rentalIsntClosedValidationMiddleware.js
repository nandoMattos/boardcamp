import connection from "../../database/db.js";

export default async function rentalIsntClosedValidationMiddleware(
  req,
  res,
  next
) {
  try {
    const isRentalClosed = await connection.query(
      `
      SELECT "returnDate"
      FROM rentals
      WHERE id=$1;
    `,
      [req.params.id]
    );

    if (isRentalClosed.rows[0].returnDate === null) {
      res.status(400).send("Aluguél não finalizado.");
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
