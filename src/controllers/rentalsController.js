import dayjs from "dayjs";
import connection from "../database/db.js";

export async function getRentals(req, res) {
  try {
    const rentals = await connection.query(`
      SELECT r.*, c.id, c.name, g.id, g.name , g."categoryId", cat.name
      FROM rentals r
      JOIN customers c ON r."customerId" = c.id
      JOIN games g ON r."gameId" = g.id
      JOIN categories cat ON g."categoryId" = cat.id;
    `);

    res.send(rentals.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postRental(req, res) {
  const { daysRented } = req.rentalInfo;
  const pricePerDay = req.pricePerDay;

  const rental = {
    ...req.rentalInfo,
    rentDate: dayjs().format("YYYY-MM-DD"),
    returnDate: null,
    originalPrice: pricePerDay * daysRented,
    delayFee: null,
  };

  try {
    await connection.query(
      `
    INSERT INTO rentals
    ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    `,
      [
        rental.customerId,
        rental.gameId,
        rental.rentDate,
        rental.daysRented,
        rental.returnDate,
        rental.originalPrice,
        rental.delayFee,
      ]
    );

    res.status(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
