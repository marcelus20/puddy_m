import { validateNotUndefined } from "../src/validators/validators";

test("validateNotUndefined will resolve when param is not undefined", () => {
  return expect(validateNotUndefined(1)).resolves.toBe(1);
});

test("validateNotUndefined will resolve when param is not undefined", () => {
  return expect(validateNotUndefined("Hello, World")).resolves.toBe(
    "Hello, World"
  );
});

test("validateNotUndefined will throw when param is undefined", () => {
  return expect(validateNotUndefined()).rejects.toThrow(
    "The passed argument can't be undefined."
  );
});

test("validateNotUndefined will throw when param is undefined", () => {
  return expect(validateNotUndefined(undefined)).rejects.toThrow(
    "The passed argument can't be undefined."
  );
});
