import {
  IntegerValidationError,
  NegativeIntegersError,
  NumberValidationError,
} from "../src/models/errors";
import { validateNegativeIntegers } from "../src/validators/complexValidators";

test("validateNegativeIntegers should resolve if number is 0.", () => {
  return expect(validateNegativeIntegers(0)).rejects.toThrow(
    new NegativeIntegersError()
  );
});

test("validateNegativeIntegers should rejects if number is greater than 0.", () => {
  return expect(validateNegativeIntegers(10)).rejects.toThrow(
    new NegativeIntegersError()
  );
});

test("validateNegativeIntegers should resolve if number is lower than 0.", () => {
  return expect(validateNegativeIntegers(-1)).resolves.toBe(-1);
});

test("validateNegativeIntegers should reject NumberValidationError if parameter isn't a number.", () => {
  return expect(validateNegativeIntegers("Hello")).rejects.toThrow(
    new NumberValidationError().message
  );
});

test("validateNegativeIntegers should reject IntegerValidationError if parameter isn't a number greater or equal 0, but not an integer.", () => {
  return expect(validateNegativeIntegers(1.3)).rejects.toThrow(
    new IntegerValidationError().message
  );
});
