import {
    IntegerValidationError,
  NumberValidationError,
  PositiveIncludingZeroValidationError,
} from "../src/models/errors";
import { validatePositiveIntegersIncludingZero } from "../src/validators/complexValidators";

test("validatePositiveIntegersIncludingZero should resolve if number is 0.", () => {
  return expect(validatePositiveIntegersIncludingZero(0)).resolves.toBe(0);
});

test("validatePositiveIntegersIncludingZero should resolve if number is greater than 0.", () => {
  return expect(validatePositiveIntegersIncludingZero(10)).resolves.toBe(10);
});

test("validatePositiveIntegersIncludingZero should reject if number is lower than 0.", () => {
  return expect(validatePositiveIntegersIncludingZero(-1)).rejects.toThrow(
    new PositiveIncludingZeroValidationError().message
  );
});

test("validatePositiveIntegersIncludingZero should reject NumberValidationError if parameter isn't a number.", () => {
  return expect(validatePositiveIntegersIncludingZero("Hello")).rejects.toThrow(
    new NumberValidationError().message
  );
});

test("validatePositiveIntegersIncludingZero should reject IntegerValidationError if parameter isn't a number greater or equal 0, but not an integer.", () => {
    return expect(validatePositiveIntegersIncludingZero(1.3)).rejects.toThrow(
      new IntegerValidationError().message
    );
  });
