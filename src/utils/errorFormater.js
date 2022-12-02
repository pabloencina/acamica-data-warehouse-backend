export function formatValidationErrors(error) {
  const properties = Object.keys(error.errors);
  const errorToReturn = {};
  properties.forEach((property) => {
    errorToReturn[property] = error.errors[property].message;
  });
  return errorToReturn;
}
