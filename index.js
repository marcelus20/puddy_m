const {
  default: validateNotNull,
} = require("./lib/validations/validateNotNull");
const { default: validateString } = require("./lib/validations/validateString");
const { default: validateNumber } = require("./lib/validations/validateNumber");
const { default: fileFunctions } = require("./lib/fileFunctions");

const puddy_m = {
  validateNotNull,
  validateString,
  fileFunctions,
  validateNumber,
};

module.exports = puddy_m;
