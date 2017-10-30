/**
 * @returns {Object} validInput
 * @param {*} param
 */
const validateInput = ({
  name, description, ingredients, directions
}) => {
  let output = '';
  if (name === undefined || name === '') output = { valid: false, message: 'Name field is required.', status: 400 };
  if (description === undefined || description === '') output = { valid: false, message: 'Description field is required.', status: 400 };
  if (ingredients === undefined || ingredients === '') output = { valid: false, message: 'Input your your ingredients.', status: 400 };
  if (directions === undefined || directions === '') output = { valid: false, message: 'Give your users some directions', status: 400 };
  output = { valid: true };
  return output;
};

export default validateInput;
