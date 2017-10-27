/**
 * @returns {Object} validInput
 * @param {*} param
 */
const validateInput = ({
  name, description, ingredients, directions
}) => {
  if (name === undefined || name === '') return { valid: false, message: 'Name field is required.', status: 400 };
  if (description === undefined || description === '') return { valid: false, message: 'Description field is required.', status: 400 };
  if (ingredients === undefined || ingredients === '') return { valid: false, message: 'Input your your ingredients.', status: 400 };
  if (directions === undefined || directions === '') return { valid: false, message: 'Give your users some directions', status: 400 };
  return { valid: true };
};

export default validateInput;
