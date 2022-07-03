import Joi from "joi";

export default Joi.object({
  "user-id": Joi.number().required(),
  "Board name": Joi.string().required(),
  columns: Joi.array().items(Joi.string()).required(),
});
