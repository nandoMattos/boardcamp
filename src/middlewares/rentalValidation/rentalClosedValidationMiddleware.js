import connection from "../../database/db.js";

export default async function rentalClosedValidationMiddleware(req, res, next) {
  try {
    const isRentalClosed = await connection.query(
      `
      SELECT "returnDate", "rentDate", "daysRented", "originalPrice"
      FROM rentals
      WHERE id=$1;
    `,
      [req.params.id]
    );

    if (isRentalClosed.rows[0].returnDate != null) {
      res.status(400).send("Jogo já devolvido.");
      return;
    }
    req.rentInfo = {
      originalPrice: isRentalClosed.rows[0].originalPrice,
      rentDate: isRentalClosed.rows[0].rentDate,
      daysRented: isRentalClosed.rows[0].daysRented,
    };
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
