export function getErrorMessage(errors, path) {
  const error = errors[path];

  if (!error) {
    return null;
  }

  if (typeof error === 'string') {
    return error;
  }

  return error.join(',');
}

/**
 * Create errors object using an array
 * So that we can catch all the errors for some field
 *
 * @param {YUPSchema} schema 
 * @param {Object} values 
 */
export async function validateAll(schema, values) {
  const errors = {};
  let result;

  try {
    await schema.validate(values, {
      abortEarly: false,
    });
  } catch (err) {
    result = err;
  }

  if (!result) {
    return errors;
  }

  result.inner.forEach((err) => {
    if (!errors[err.path]) {
      errors[err.path] = [];
    }

    errors[err.path].push(err.message);
  });

  return errors;
}