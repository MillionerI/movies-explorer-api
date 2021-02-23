const urlRegEx = /^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/;
const requiredValidationMessage = (name) => `Поле "${name}" обязательно`;
const urlValidatorMessage = 'Строка должна содержать ссылку!';

module.exports = {
  urlRegEx,
  requiredValidationMessage,
  urlValidatorMessage,
};
