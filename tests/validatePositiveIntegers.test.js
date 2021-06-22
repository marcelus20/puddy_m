import {
    IntegerValidationError,
  IntegerValidationErrorFromValue,
  NumberValidationError,
  PositiveIntegersError,
} from "../src/models/errors";
import { validatePositiveIntegers } from "../src/validators/complexValidators";

test("validatePositiveIntegers should resolve if number is 0.", () => {
  return expect(validatePositiveIntegers(0)).rejects.toThrow(new PositiveIntegersError());
});

test("validatePositiveIntegers should resolve if number is greater than 0.", () => {
  return expect(validatePositiveIntegers(10)).resolves.toBe(10);
});

test("validatePositiveIntegers should reject if number is lower than 0.", () => {
  return expect(validatePositiveIntegers(-1)).rejects.toThrow(
    new PositiveIntegersError().message
  );
});

test("validatePositiveIntegers should reject NumberValidationError if parameter isn't a number.", () => {
  return expect(validatePositiveIntegers("Hello")).rejects.toThrow(
    new NumberValidationError().message
  );
});

test("validatePositiveIntegers should reject IntegerValidationError if parameter isn't a number greater or equal 0, but not an integer.", () => {
    return expect(validatePositiveIntegers(1.3)).rejects.toThrow(
      new IntegerValidationError().message
    );
  });
