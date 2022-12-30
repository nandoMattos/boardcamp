import connection from "../../database/db.js";

export default async function rentalExistsValidationMiddleware(req, res, next) {
  try {
    const rentalExists = await connection.query(
      `
      SELECT *
      FROM rentals
      WHERE id=$1
    `,
      [req.params.id]
    );

    if (!rentalExists.rows[0]) {
      res.status(404).send("Aluguél não encontrado.");
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
