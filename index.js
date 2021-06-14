const {default: validateNotNull} = require("./lib/utils/validations/validateNotNull");
const {default: validateString} = require("./lib/utils/validations/validateString");
const {default: validateNumber} = require("./lib/utils/validations/validateNumber");
const { default: fileFunctions } = require("./src/fileFunctions");


const puddy_m = { validateNotNull, validateString, fileFunctions, validateNumber };


module.exports = puddy_m;
