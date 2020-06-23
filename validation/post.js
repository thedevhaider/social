const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.author = !isEmpty(data.author) ? data.author : "";

  if (!Validator.isLength(data.text, { min: 10, max: 400 })) {
    errors.text = "Post must be 10 to 400 chracters long";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Post body required";
  }

  if (!Validator.isLength(data.author, { min: 2, max: 100 })) {
    errors.author = "Author must be 2 to 100 chracters long";
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = "Author body required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
