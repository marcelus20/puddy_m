import {
  AllArgsNoArgsValidationError,
  AllArgsValidationError,
  NumberValidationError,
} from "../src/models/errors";
import { validateAllArgs } from "../src/validators/complexValidators";
import {
  validateBoolean,
  validateNumber,
  validateString,
} from "../src/validators";

test("validateAllArgs should resolve when the list of args are of the type string", () => {
  return expect(
    validateAllArgs(validateString, "a", "b", "c")
  ).resolves.toEqual(["a", "b", "c"]);
});

test("validateAllArgs should reject when at least one parameter isn't of type number when the validateNumber function rule is applied.", () => {
  return expect(validateAllArgs(validateNumber, "a", 4, "c")).rejects.toThrow(
    new NumberValidationError().message
  );
});

test("validateAllArgs should resolve when all args are boolean and validate boolean was applied.", () => {
  return expect(validateAllArgs(validateBoolean, true, false)).resolves.toEqual(
    [true, false]
  );
});

test("validateAllArgs should reject when validation function is passed, but it has no args to validate.", () => {
  return expect(validateAllArgs(validateBoolean)).rejects.toThrow(
    new AllArgsNoArgsValidationError().message
  );
});

test("validateAllArgs should reject when validation function is not passed, but it has args to validate.", () => {
  return expect(validateAllArgs(1)).rejects.toThrow(
    new AllArgsValidationError().message
  );
});

test("validateAllArgs should reject when validation function is not passed, but it has args to validate.", () => {
  return expect(validateAllArgs()).rejects.toThrow(
    new AllArgsValidationError().message
  );
});
