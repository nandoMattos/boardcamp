import joi from "joi";

const categorySchema = joi.object({
  name: joi.string().required().max(15),
});

export default categorySchema;
