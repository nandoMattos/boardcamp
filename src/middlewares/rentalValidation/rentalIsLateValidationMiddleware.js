import dayjs from "dayjs";
import connection from "../../database/db.js";

export default async function rentalIsLateValidationMiddleware(req, res, next) {
  const { daysRented, rentDate, originalPrice } = req.rentInfo;
  const daysPassed = dayjs(dayjs()).diff(rentDate, "days");

  if (daysRented < daysPassed) {
    const fee = (daysPassed - daysRented) * originalPrice;
    try {
      await connection.query(
        `
        UPDATE rentals 
        SET "delayFee"=$1, "returnDate"=$2
        WHERE id=$3;
      `,
        [fee, dayjs().format("YYYY-MM-DD"), req.params.id]
      );

      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
    return;
  }
  next();
}
