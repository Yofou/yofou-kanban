import Joi from "joi";

export default Joi.object({
	"task-id": Joi.string().required(),
	title: Joi.string(),
	description: Joi.string(),
	status: Joi.string(),
});
