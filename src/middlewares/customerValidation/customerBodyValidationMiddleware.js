import customerSchema from "../../models/customerSchema.js";

export default function customerBodyValidationMiddleware(req, res, next) {
  const { error } = customerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((d) => d.message));
    return;
  }

  req.customer = req.body;
  next();
}
