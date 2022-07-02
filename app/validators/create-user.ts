import Joi from "joi";

export default Joi.object({
  Username: Joi.string().required().messages({
    "string.empty": "Can’t be empty",
    "any.required": "Can’t be empty",
  }),
  Email: Joi.string().email(),
  Password: Joi.string().min(8),
  "Confirm Password": Joi.any().valid(Joi.ref("Password")).required().messages({
    "any.only": "Password must match",
  }),
});
