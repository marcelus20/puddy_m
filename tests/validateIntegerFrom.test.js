import { validateIntegerFrom } from "../src/validators/complexValidators";
import {
  IntegerValidationErrorFromValue, NumberValidationError,
} from "../src/models/errors";

test("validateIntegerFrom should resolve the integer if the number is an Integer and greater or equal the from param", () => {
  return expect(validateIntegerFrom(1, undefined, -3)).resolves.toBe(1);
});

test("validateIntegerFrom should reject if the integer is lower than the from parameter.", () => {
  return expect(validateIntegerFrom(4, [], 7)).rejects.toThrow(new IntegerValidationErrorFromValue().message);
});

test("validateIntegerFrom should resolve the integer if the number is an Integer and greater or equal the from param", () => {
  return expect(validateIntegerFrom(-13, undefined, -13)).resolves.toBe(-13);
});

test("validateIntegerFrom should reject if the integer is lower than the from parameter.", () => {
  return expect(validateIntegerFrom(-13, [], -12)).rejects.toThrow(new IntegerValidationErrorFromValue().message);
});

test("validateIntegerFrom should reject NumberValidationError parameter isn't a number", () => {
  return expect(validateIntegerFrom({}, [], -12)).rejects.toThrow(new NumberValidationError().message);
});
