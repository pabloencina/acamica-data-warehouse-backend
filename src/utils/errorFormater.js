export function formatValidationErrors(error) {
  const properties = Object.keys(error.errors);
  const errosToReturn = {};
  properties.forEach((property) => {
    errosToReturn[property] = error.errors[property].message;
  });
  return errosToReturn;
}
