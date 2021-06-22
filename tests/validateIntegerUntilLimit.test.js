import { validateIntegerUntilLimit } from "../src/validators/complexValidators";
import {
  IntegerValidationErrorToValue,
  NumberValidationError,
} from "../src/models/errors";

test("validateIntegerFrom should resolve the integer if the number is an Integer and lower or equal the limit param", () => {
  return expect(validateIntegerUntilLimit(-4, undefined, -3)).resolves.toBe(-4);
});

test("validateIntegerUntilLimit should reject if the integer is greater than the limit parameter.", () => {
  return expect(validateIntegerUntilLimit(8, [], 7)).rejects.toThrow(
    new IntegerValidationErrorToValue().message
  );
});

test("validateIntegerUntilLimit should resolve if the integer is equals the limit parameter.", () => {
  return expect(validateIntegerUntilLimit(-13, undefined, -13)).resolves.toBe(
    -13
  );
});

test("validateIntegerUntilLimit should resolve if the integer is equals the limit parameter.", () => {
  return expect(validateIntegerUntilLimit(100, undefined, 100)).resolves.toBe(
    100
  );
});

test("validateIntegerUntilLimit should resolve if the integer is equals the limit parameter.", () => {
  return expect(
    validateIntegerUntilLimit(100, undefined, -100)
  ).rejects.toThrow(new IntegerValidationErrorToValue().message);
});

test("validateIntegerUntilLimit should resolve if the integer is lower than the limit parameter.", () => {
  return expect(validateIntegerUntilLimit(99, undefined, 100)).resolves.toBe(
    99
  );
});

test("validateIntegerUntilLimit should reject NumberValidationError parameter isn't a number", () => {
  return expect(validateIntegerUntilLimit({}, [], -12)).rejects.toThrow(
    new NumberValidationError().message
  );
});
