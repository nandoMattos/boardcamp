import connection from "../database/db.js";

async function getCustomerByCpf(cpf, res) {
  try {
    const customer = await connection.query(
      `
      SELECT * 
      FROM customers
      WHERE cpf LIKE $1;
    `,
      [cpf.concat("%")]
    );
    return customer.rows;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function getAllCustomers(res) {
  try {
    const customers = await connection.query(`
    SELECT *
    FROM customers;
  `);

    return customers.rows;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCustomers(req, res) {
  const { cpf } = req.query;

  if (cpf) {
    res.send(await getCustomerByCpf(cpf, res));
    return;
  }

  res.send(await getAllCustomers(res));
}

export async function getCustomersById(req, res) {
  try {
    const customersById = await connection.query(
      `
      SELECT * 
      FROM customers
      WHERE id = $1
    `,
      [req.params.id]
    );

    if (!customersById) {
      res.status(404).send("Cliente não encontrado.");
      return;
    }

    res.send(customersById.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.customer;

  try {
    await connection.query(
      `
      INSERT INTO customers
      (name, phone, cpf, birthday)
      VALUES
      ($1, $2, $3, $4);
    `,
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.customer;
  try {
    await connection.query(
      `
      UPDATE customers
      SET name=$1, phone=$2, cpf=$3, birthday=$4
      WHERE id = $5;
    `,
      [name, phone, cpf, birthday, req.params.id]
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
