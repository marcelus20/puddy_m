import { validateEmail } from "../src/validators/complexValidators";
import {
  EmailValidationError,
  StringValidationError,
} from "../src/models/errors";

test("validateEmail should resolve the the email string if the it is in a valid email format.", () => {
  return expect(validateEmail("misha@hotmail.com")).resolves.toBe(
    "misha@hotmail.com"
  );
});

test("validateEmail should resolve the the email string if the it is in a valid email format.", () => {
  return expect(validateEmail("foo@bar.com")).resolves.toBe("foo@bar.com");
});

test("validateEmail should reject the string if the string is in a valid email format.", () => {
  return expect(validateEmail("misha@")).rejects.toThrow(
    new EmailValidationError().message
  );
});

test("validateEmail should reject the string if the string validation error if parameter isn't a string.", () => {
  return expect(validateEmail({})).rejects.toThrow(
    new StringValidationError().message
  );
});
