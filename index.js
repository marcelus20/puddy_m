const {default: validateNotNull} = require("./lib/utils/validations/validateNotNull");
const {default: validateString} = require("./lib/utils/validations/validateString");
const {default: readFile} = require("./lib/utils/readFile");
const {default: validateNumber} = require("./lib/utils/validations/validateNumber");

const puddy_m = { validateNotNull, validateString, readFile, validateNumber };


module.exports = puddy_m;
