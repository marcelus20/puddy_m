import {
  PositiveIntegersError,
  RepeatedConsecutiveCharsInStringValidationError,
  StringLengthGreaterThanError,
  StringValidationError,
} from "../src/models/errors";
import { validateRepeatedConsecutiveCharsInString } from "../src/validators/complexValidators";

test("validateRepeatedConsecutiveCharsInString should resolve if it finds 4 letters a in a roll with a tolerance of 3", () =>
  expect(validateRepeatedConsecutiveCharsInString("fraaaacv", 3)).resolves.toBe(
    "fraaaacv"
  ));

test("validateRepeatedConsecutiveCharsInString should reject if it finds 3 letters a in a roll (1 letter repeated twice) with a tolerance of 3", () =>
  expect(
    validateRepeatedConsecutiveCharsInString("fraaacv", 3)
  ).rejects.toThrow(new RepeatedConsecutiveCharsInStringValidationError()));

test("validateRepeatedConsecutiveCharsInString should reject if it finds 2 repeated letters a in a roll with a tolerance of 3", () =>
  expect(validateRepeatedConsecutiveCharsInString("fraacv", 3)).rejects.toThrow(
    new RepeatedConsecutiveCharsInStringValidationError()
  ));

test("validateRepeatedConsecutiveCharsInString should reject if it finds at least one consecutive repeated char and no tolerance is specified.", () =>
  expect(validateRepeatedConsecutiveCharsInString("fracv")).rejects.toThrow(
    new RepeatedConsecutiveCharsInStringValidationError()
  ));

test("validateRepeatedConsecutiveCharsInString should reject StringValidationError if it parameter isn't a string.", () =>
  expect(validateRepeatedConsecutiveCharsInString(true)).rejects.toThrow(
    new StringValidationError()
  ));

test("validateRepeatedConsecutiveCharsInString should reject StringLengthGreaterThanError if it parameter is an empty string", () =>
  expect(validateRepeatedConsecutiveCharsInString("")).rejects.toThrow(
    new StringLengthGreaterThanError("", 0)
  ));

test("validateRepeatedConsecutiveCharsInString should reject PositiveIntegersError if it parameter is an empty string", () =>
  expect(
    validateRepeatedConsecutiveCharsInString("ffrthhhhhhhhhhh", 0)
  ).rejects.toThrow(new PositiveIntegersError()));

test("validateRepeatedConsecutiveCharsInString should reject PositiveIntegersError if it parameter is negative string", () =>
  expect(
    validateRepeatedConsecutiveCharsInString("ffrthhhhhhhhhhh", -1)
  ).rejects.toThrow(new PositiveIntegersError()));

test("validateRepeatedConsecutiveCharsInString should reject PositiveIntegersError if it parameter is negative string", () =>
  expect(
    validateRepeatedConsecutiveCharsInString("ffrthhhhhhhhhhh", 6)
  ).resolves.toBe("ffrthhhhhhhhhhh"));
