import Joi from "joi";

export default Joi.object({
  Email: Joi.string().required().messages({
    "string.empty": "Can't be empty",
  }),
  Password: Joi.string().required().messages({
    "string.empty": "Can't be empty",
  }),
});
