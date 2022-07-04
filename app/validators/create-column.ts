import Joi from "joi";

export default Joi.object({
	"Column name": Joi.string().required(),
	"board-id": Joi.string().required(),
});
