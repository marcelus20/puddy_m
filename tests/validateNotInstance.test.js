import { NotInstanceValidationError } from "../src/models/errors";
import { validateNotInstance } from "../src/validators";

class User {}
const user = new User();

class Machine {}
const machine = new Machine();

test("validateNotInstance should reject if the the value passed is instance of the reference.", () => {
  expect(validateNotInstance(User, user)).rejects.toThrow(
    NotInstanceValidationError
  );
});

test("validateNotInstance should resolve if the the value passed is instance of another reference.", () => {
  expect(validateNotInstance(User, machine)).resolves.toBe(machine);
});
