import { ArrayEmptyValidationError, ArrayValidationError } from "../src/models/errors";
import { validateEmptyArray } from "../src/validators/complexValidators";

test("validateEmptyArray will resolve if array is empty.", () =>
  expect(validateEmptyArray([])).resolves.toEqual([]));

test("validateEmptyArray will reject ArrayEmptyValidationError if array is not empty.", () =>
  expect(validateEmptyArray([1])).rejects.toThrow(
    new ArrayEmptyValidationError()
  ));

  test("validateEmptyArray will reject ArrayValidationError if array is not an array.", () =>
  expect(validateEmptyArray(true)).rejects.toThrow(
    new ArrayValidationError()
  ));
