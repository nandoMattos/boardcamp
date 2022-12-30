import dayjs from "dayjs";
import connection from "../database/db.js";

export async function getRentals(req, res) {
  let rentals = req.rentals;

  if (rentals === undefined) {
    try {
      rentals = await connection.query(
        `
      SELECT 
        r.*, c.id as "cId", c.name as "customerName", g.id as "gameId",
        g.name as "gameName" , g."categoryId", cat.name
      FROM rentals r
      JOIN customers c ON r."customerId" = c.id
      JOIN games g ON r."gameId" = g.id
      JOIN categories cat ON g."categoryId" = cat.id;
      `
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  const formatedRents = rentals.rows.map((r) => {
    return {
      id: r.id,
      customerId: r.cId,
      gameId: r.gameId,
      rentDate: r.rentDate,
      daysRented: r.daysRented,
      returnDate: r.returnDate,
      originalPrice: r.originalPrice,
      delayFee: r.delayFee,
      customer: {
        customerId: r.cId,
        name: r.customerName,
      },
      game: {
        id: r.gameId,
        name: r.gameName,
        categoryId: r.categoryId,
        categoryName: r.name,
      },
    };
  });

  res.send(formatedRents);
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

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postRentalReturn(req, res) {
  try {
    await connection.query(
      `
      UPDATE rentals
      SET "returnDate" = $1
      WHERE id = $2
    `,
      [dayjs().format("YYYY-MM-DD"), req.params.id]
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteRental(req, res) {
  try {
    await connection.query(
      `
      DELETE FROM rentals
      WHERE id =$1;
    `,
      [req.params.id]
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
