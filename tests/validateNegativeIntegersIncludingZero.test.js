import {
  IntegerValidationError,
  IntegerValidationErrorFromValue,
  IntegerValidationErrorToValue,
  NegativeIntegersError,
  NegativeIntegersIncludingZeroValidationError,
  NumberValidationError,
} from "../src/models/errors";
import { validateNegativeIntegersIncludingZero } from "../src/validators/complexValidators";

test("validateNegativeIntegersIncludingZero should resolve if number is 0.", () => {
  return expect(validateNegativeIntegersIncludingZero(0)).resolves.toBe(0);
});

test("validateNegativeIntegersIncludingZero should reject if number is greater than 0.", () => {
  return expect(validateNegativeIntegersIncludingZero(10)).rejects.toThrow(
    NegativeIntegersIncludingZeroValidationError
  );
});

test("validateNegativeIntegersIncludingZero resolve reject if number is lower than 0.", () => {
  return expect(validateNegativeIntegersIncludingZero(-1)).resolves.toBe(-1);
});

test("validateNegativeIntegersIncludingZero should reject NumberValidationError if parameter isn't a number.", () => {
  return expect(validateNegativeIntegersIncludingZero("Hello")).rejects.toThrow(
    new NumberValidationError().message
  );
});

test("validateNegativeIntegersIncludingZero should reject IntegerValidationError if parameter isn't a number greater or equal 0, but not an integer.", () => {
  return expect(validateNegativeIntegersIncludingZero(1.3)).rejects.toThrow(
    new IntegerValidationError().message
  );
});

test("validateNegativeIntegersIncludingZero should reject if it receives a positive 1.", () => {
  return expect(validateNegativeIntegersIncludingZero(1)).rejects.toThrow(
    NegativeIntegersIncludingZeroValidationError
  );
});