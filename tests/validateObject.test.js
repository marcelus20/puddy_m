import { validateObject } from "../src/validators/complexValidators";

test("validateObject should resolve when the first parameter is an object.", () => {
  return expect(validateObject({})).resolves.toEqual({});
});
