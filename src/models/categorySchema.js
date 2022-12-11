import joi from "joi";

const categorySchema = joi.object({
  name: joi.string().max(15).required(),
});

export default categorySchema;
