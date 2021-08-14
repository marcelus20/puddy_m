import {
  NonRepeatedConsecutiveCharsInStringValidationError,
  PositiveIncludingZeroValidationError,
} from "../src/models/errors";
import { validateNonRepeatedConsecutiveCharsInString } from "../src/validators/complexValidators";

test("validateNonRepeatedConsecutiveCharsInString should resolve if it finds 4 letters a in a roll with a tolerance of 4", () =>
  expect(
    validateNonRepeatedConsecutiveCharsInString("fraaaacv", 3)
  ).resolves.toBe("fraaaacv"));

test("validateNonRepeatedConsecutiveCharsInString should resolve if it finds 3 letters a in a roll (1 letter repeated twice) with a tolerance of 3", () =>
  expect(
    validateNonRepeatedConsecutiveCharsInString("fraaacv", 3)
  ).resolves.toBe("fraaacv"));

test("validateNonRepeatedConsecutiveCharsInString should resolve if it finds 3 letters a in a roll (1 letter repeated twice) with a tolerance of 2", () =>
  expect(
    validateNonRepeatedConsecutiveCharsInString("fraaacv", 2)
  ).resolves.toBe("fraaacv"));

test("validateNonRepeatedConsecutiveCharsInString should reject if it finds 3 letters a in a roll (1 letter repeated twice) with a tolerance of 2", () =>
  expect(
    validateNonRepeatedConsecutiveCharsInString("fraaacv", 1)
  ).rejects.toThrow(new NonRepeatedConsecutiveCharsInStringValidationError()));

test("validateNonRepeatedConsecutiveCharsInString should resolve if it finds 2 letters a in a roll (1 letter repeated once) with a tolerance of 1", () =>
  expect(
    validateNonRepeatedConsecutiveCharsInString("fraacv", 1)
  ).resolves.toBe("fraacv"));

test("validateNonRepeatedConsecutiveCharsInString should resolve if consecutive repating letter is not found at all and no tolerance is passed.", () =>
  expect(validateNonRepeatedConsecutiveCharsInString("frarcv")).resolves.toBe(
    "frarcv"
  ));

test("validateNonRepeatedConsecutiveCharsInString should reject if consecutive repating letter is found and no tolerance is passed.", () =>
  expect(
    validateNonRepeatedConsecutiveCharsInString("fratttttttt---------rcv")
  ).rejects.toThrow(new NonRepeatedConsecutiveCharsInStringValidationError()));

test("validateNonRepeatedConsecutiveCharsInString should reject PositiveIntegersError if the tolerance parameter is below 0.", () =>
  expect(
    validateNonRepeatedConsecutiveCharsInString("fratttttttt---------rcv", -1)
  ).rejects.toThrow(new PositiveIncludingZeroValidationError()));

test("validateNonRepeatedConsecutiveCharsInString should reject if string is 111 and tolerance is 1.", () =>
  expect(validateNonRepeatedConsecutiveCharsInString("111", 1)).rejects.toThrow(
    NonRepeatedConsecutiveCharsInStringValidationError
  ));

test("validateNonRepeatedConsecutiveCharsInString should resolve an array if tuple is passed.", () =>
  expect(validateNonRepeatedConsecutiveCharsInString("111", 2, [])).resolves.toEqual(
    ["111"]
  ));
/*
  test("validateNonRepeatedConsecutiveCharsInString should reject if it finds 2 repeated letters a in a roll with a tolerance of 3", () =>
    expect(validateNonRepeatedConsecutiveCharsInString("fraacv", 3)).rejects.toThrow(
      new NonNonRepeatedConsecutiveCharsInStringValidationError()
    ));
  
  test("validateNonRepeatedConsecutiveCharsInString should reject if it finds at least one consecutive repeated char and no tolerance is specified.", () =>
    expect(validateNonRepeatedConsecutiveCharsInString("fracv")).rejects.toThrow(
      new NonRepeatedConsecutiveCharsInStringValidationError()
    ));
  
  test("validateNonRepeatedConsecutiveCharsInString should reject StringValidationError if it parameter isn't a string.", () =>
    expect(validateNonRepeatedConsecutiveCharsInString(true)).rejects.toThrow(
      new StringValidationError()
    ));
  
  test("validateNonRepeatedConsecutiveCharsInString should reject StringLengthGreaterThanError if it parameter is an empty string", () =>
    expect(validateNonRepeatedConsecutiveCharsInString("")).rejects.toThrow(
      new StringLengthGreaterThanError("", 0)
    ));
  
  test("validateNonRepeatedConsecutiveCharsInString should reject PositiveIntegersError if it parameter is an empty string", () =>
    expect(
      validateNonRepeatedConsecutiveCharsInString("ffrthhhhhhhhhhh", 0)
    ).rejects.toThrow(new PositiveIntegersError()));
  
  test("validateNonRepeatedConsecutiveCharsInString should reject PositiveIntegersError if it parameter is negative string", () =>
    expect(
      validateNonRepeatedConsecutiveCharsInString("ffrthhhhhhhhhhh", -1)
    ).rejects.toThrow(new PositiveIntegersError()));
  
  test("validateNonRepeatedConsecutiveCharsInString should reject PositiveIntegersError if it parameter is negative string", () =>
    expect(
      validateNonRepeatedConsecutiveCharsInString("ffrthhhhhhhhhhh", 6)
    ).resolves.toBe("ffrthhhhhhhhhhh"));
  */
