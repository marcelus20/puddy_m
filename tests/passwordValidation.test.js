import { PasswordValidationError } from "../src/models/errors";
import { validatePassword } from "../src/validators/complexValidators";


test("validatePassword will reject if string only has lower cases.", () =>
  expect(validatePassword("asdfjfnvntbvhgj")).rejects.toThrow(new PasswordValidationError()));

  test("validatePassword will reject if string only has lower and upper cases.", () =>
  expect(validatePassword("asdfjfnvntbvhgjG")).rejects.toThrow(new PasswordValidationError()));

  test("validatePassword will reject if string only has lower and upper cases and digits.", () =>
  expect(validatePassword("asdfjfnvn3tbvhgjG")).rejects.toThrow(new PasswordValidationError()));

  test("validatePassword will reject if string has lower and upper cases and digits and symbol, but less than 12 characters", () =>
  expect(validatePassword("aF1^")).rejects.toThrow(new PasswordValidationError()));

  test("validatePassword will resolve if string has lower and upper cases and digits and symbol, and has exactly 12 characters", () =>
  expect(validatePassword("F1Pass1234!^")).resolves.toBe("F1Pass1234!^"));

  test("validatePassword will resolve if string has lower and upper cases and digits and symbol, and has more than 12 characters", () =>
  expect(validatePassword("F1Pass1234!_^")).resolves.toBe("F1Pass1234!_^"));

  test("validatePassword will reject if string has lower and upper cases and digits and symbol, but has exactly 11 characters", () =>
  expect(validatePassword("F1Pass124!^")).rejects.toThrow(new PasswordValidationError()));

  test("validatePassword will validate string without trimming its sides.", () =>
  expect(validatePassword("  F1Pass124!^    ")).resolves.toBe("  F1Pass124!^    "));