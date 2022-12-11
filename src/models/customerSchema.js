import joi from "joi";

const customerSchema = joi.object({
  name: joi.string().min(3).max(100).required(),
  phone: joi.string().regex(/^\d+$/).min(11).max(12).required(),
  cpf: joi.string().regex(/^\d+$/).length(11).required(),
  birthday: joi.date().required(),
});

export default customerSchema;
