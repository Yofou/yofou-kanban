import Joi from "joi";

export default (errors: Joi.ValidationError) =>
  Object.fromEntries(
    errors?.details.map((err) => [
      err.context?.key ?? "unknown",
      err.message ?? "unknown error",
    ]) ?? []
  );
