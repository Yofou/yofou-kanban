import Joi from "joi";

export default Joi.object({
	"Board name": Joi.string().required(),
	"columns-names": Joi.array().items(Joi.string()).required(),
	"columns-id": Joi.array().items(Joi.string()).required(),
});
