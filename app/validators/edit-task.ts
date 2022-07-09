import Joi from "joi";

export default Joi.object({
	"task-id": Joi.string().required(),
	Title: Joi.string(),
	Description: Joi.string(),
	status: Joi.string(),
	"sub-tasks": Joi.array().items(Joi.string()),
	"sub-tasks-id": Joi.array().items(Joi.string()),
	"removed-sub-tasks": Joi.array().items(Joi.string()),
});
