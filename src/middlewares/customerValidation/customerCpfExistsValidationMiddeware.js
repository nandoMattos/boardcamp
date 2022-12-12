import connection from "../../database/db.js";

export default async function customerCpfExistsValidationMiddeware(
  req,
  res,
  next
) {
  const { cpf } = req.customer;

  try {
    const customerExists = await connection.query(
      `
      SELECT * 
      FROM customers
      WHERE cpf=$1;
    `,
      [cpf]
    );

    if (customerExists.rows[0]) {
      res.status(409).send("Cliente já existe.");
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
