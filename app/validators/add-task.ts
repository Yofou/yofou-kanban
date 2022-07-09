import Joi from "joi";

export default Joi.object({
	Title: Joi.string().required(),
	Description: Joi.string().required(),
	"sub-tasks": Joi.array().items(Joi.string()).required(),
	"sub-tasks-id": Joi.array().items(Joi.string()),
	status: Joi.string().required(),
});
