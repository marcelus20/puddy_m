import { validateInteger } from "../src/validators/complexValidators";
import {
  IntegerValidationError,
  NumberValidationError,
} from "../src/models/errors";

test("validateInteger should resolve the integer if the number is an Integer", () => {
  return expect(validateInteger(1)).resolves.toBe(1);
});

test("validateInteger should resolve the integer if the number is an Integer", () => {
  return expect(validateInteger(-11110000)).resolves.toBe(-11110000);
});

test("validateInteger should reject a NumberValidationError message when the parameter is anything, but number.", () => {
  return expect(validateInteger("not number")).rejects.toThrow(
    new NumberValidationError().message
  );
});

test("validateInteger should reject a IntegerValidationError message when the parameter is a number, but not Integer.", () => {
  return expect(validateInteger(1.5)).rejects.toThrow(
    new IntegerValidationError().message
  );
});

test("validateInteger should reject a NumberValidationError message when the parameter is anything, but number.", () => {
  return expect(validateInteger(Number.NaN)).rejects.toThrow(
    new IntegerValidationError().message
  );
});

test("validateInteger should reject a NumberValidationError  message when the parameter is anything, but number.", () => {
  return expect(validateInteger("3")).rejects.toThrow(
    new NumberValidationError().message
  );
});

test("validateInteger should resolve if number is equal the from parameter", () => {
  return expect(validateInteger(4)).resolves.toBe(4);
});

test("validateInteger should resolve if number is greater than the from parameter", () => {
  return expect(validateInteger(5)).resolves.toBe(5);
});

test("validateInteger should resolve if number is greater than the from parameter", () => {
  return expect(validateInteger(1000000)).resolves.toBe(1000000);
});
