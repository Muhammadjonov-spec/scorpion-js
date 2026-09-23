const { ApiError } = require('../utils/apiError');

/**
 * Joi sxemalari orqali request body, query va params'ni tekshirish
 * @param {Object} schema - { body?: Joi.ObjectSchema, query?: Joi.ObjectSchema, params?: Joi.ObjectSchema }
 */
const validate = (schema) => (req, res, next) => {
  const parts = ['body', 'query', 'params'];

  for (const part of parts) {
    if (schema[part]) {
      const { error, value } = schema[part].validate(req[part], {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errorDetails = error.details.map((d) => d.message).join('; ');
        return next(ApiError.badRequest(`Validatsiya xatosi (${part}): ${errorDetails}`));
      }

      req[part] = value;
    }
  }

  next();
};

module.exports = { validate };
