import dayjs from "dayjs";
import connection from "../database/db.js";

export async function postRental(req, res) {
  const { daysRented } = req.rentalInfo;
  const { pricePerDay } = req.pricePerDay;

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
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
