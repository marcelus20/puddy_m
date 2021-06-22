import { validateBoolean } from "../src/validators/validators";

test("validateBoolean should resolve boolean (true) when the parameter is of type boolean (true).", () => {
  return expect(validateBoolean(true)).resolves.toBe(true);
});

test("validateBoolean should resolve boolean (false) when the parameter is of type boolean (false).", () => {
  return expect(validateBoolean(false)).resolves.toBe(false);
});

test("validateBoolean should reject isn't of type boolean.", () => {
  return expect(validateBoolean({})).rejects.toThrow(
    "Parameter must be a boolean."
  );
});
