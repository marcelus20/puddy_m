import { StringLengthGreaterEqualError, StringLengthGreaterThanError, StringLengthLowerEqualError, StringValidationError } from "../src/models/errors";
import { validateStringLengthLowerEqual } from "../src/validators/complexValidators";

test("validateStringLengthGreaterThan should resolve if string length is greater than the integer length", () => {
    return expect(validateStringLengthLowerEqual("fooo", 3)).rejects.toThrow(new StringLengthLowerEqualError("fooo", 3));
  });

  test("validateStringLengthGreaterThan should resolve if the string has same length as parameter.", () => {
    return expect(validateStringLengthLowerEqual("foo", 3)).resolves.toBe("foo");
  });

  test("validateStringLengthGreaterThan should resolve if the string length is smaller than length param.", () => {
    return expect(validateStringLengthLowerEqual("fo", 3)).resolves.toBe("fo");
  });

  test("validateStringLengthGreaterThan should reject if parameter isn't a string.", () => {
    return expect(validateStringLengthLowerEqual(null, 3)).rejects.toThrow(new StringValidationError().message);
  });