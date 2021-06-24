import { NonRepeatedConsecutiveCharsInStringValidationError, PasswordValidationError, StringValidationError } from "../src/models/errors";
import { validatePassword } from "../src/validators/complexValidators";

test("validatePassword will reject StringValidationError if parameter of validatePassword isn't a string type", () =>
  expect(validatePassword()).rejects.toThrow(new StringValidationError()));

test("validatePassword will reject if parameter of validatePassword contains only lower cases", () =>
  expect(validatePassword("aaaaaaaaaaaa")).rejects.toThrow(new PasswordValidationError()));

test("validatePassword will reject if parameter of validatePassword contains only upper cases", () =>
  expect(validatePassword("AAAAAAAAAAAA")).rejects.toThrow(new PasswordValidationError()));

test("validatePassword will reject if parameter of validatePassword contains only digits", () =>
  expect(validatePassword("123456789101112")).rejects.toThrow(new PasswordValidationError()));

test("validatePassword will reject if parameter of validatePassword contains only symbols", () =>
  expect(validatePassword("@@@@@@@@@@@@")).rejects.toThrow(new PasswordValidationError()));

test("validatePassword will reject if parameter of validatePassword contains only upper and lower cases", () =>
  expect(validatePassword("AAAAAAaaaaaa")).rejects.toThrow(new PasswordValidationError()));

test("validatePassword will reject if parameter of validatePassword contains only upper and lower digits", () =>
  expect(validatePassword("AAAAAAaaaaa1")).rejects.toThrow(new PasswordValidationError()));

test("validatePassword will reject if parameter of validatePassword contains only lower and digits", () =>
  expect(validatePassword("aaaaaaaaaaaa1")).rejects.toThrow(new PasswordValidationError()));

test("validatePassword will reject if parameter of validatePassword contains only upper and digits", () =>
  expect(validatePassword("AAAAAAAAAAAA1")).rejects.toThrow(new PasswordValidationError()));

test("validatePassword will reject if parameter of validatePassword contains only symbols and digits", () =>
  expect(validatePassword("@@@@@@@@@@@@1")).rejects.toThrow(new PasswordValidationError()));

test("validatePassword will reject if parameter of validatePassword it contains symbols, digits, lower and upper, however it has less than 12 characters", () =>
  expect(validatePassword("@1jH")).rejects.toThrow(new PasswordValidationError()));

test("validatePassword will resolve if parameter of validatePassword it contains symbols, digits, lower and upper, it has more than 12 characters", () =>
  expect(validatePassword("@1jH1jgrithawlr")).resolves.toBe("@1jH1jgrithawlr"));

test("validatePassword will reject NonRepeatedConsecutiveCharsInStringValidationError if parameter of validatePassword contains more than 2 repeating chars (1+2 = 3 same char appearin in a roll)", () =>
  expect(validatePassword("@1jH1jaaaaagrithawlr")).rejects.toThrow(new PasswordValidationError()));