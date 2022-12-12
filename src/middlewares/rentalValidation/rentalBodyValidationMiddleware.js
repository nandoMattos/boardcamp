import rentalSchema from "../../models/rentalSchema.js";

export default function rentalBodyValidationMiddleware(req, res, next) {
  const { error } = rentalSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((d) => d.message));
    return;
  }

  req.rentalInfo = req.body;
  next();
}
