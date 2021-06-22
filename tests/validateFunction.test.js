import { validateFunction } from "../src/validators/validators";

test("validateFunction will reject when param is null", () => {
  return expect(validateFunction(null)).rejects.toThrow(
    "Parameter must be a function."
  );
});

test("validateFunction will resolve when param is a function", () => {
  return expect(
    validateFunction(() => {}).then((isFunction) => true)
  ).resolves.toBe(true);
});

test("validateFunction will resolve when param is a function", () => {
  return expect(
    validateFunction("()=>{}").then((isFunction) => true)
  ).rejects.toThrow("Parameter must be a function.");
});

test("validateFunction will resolve when param is not a function", () => {
  return expect(validateFunction(1)).rejects.toThrow(
    "Parameter must be a function."
  );
});

test("validateFunction will resolve an Array of function when the tuple param is passed as an array.", () => {
  return expect(
    validateFunction(() => {}, []).then((tuple) => tuple.length)
  ).resolves.toBe(1);
});

test("validateFunction will resolve an Array of function when the tuple param is passed as an array.", () => {
  return expect(
    validateFunction(() => {}, [])
      .then((tuple) => validateFunction(() => {}, tuple))
      .then((tuple) => validateFunction(() => {}, tuple))
      .then((tuple) => tuple.length)
  ).resolves.toBe(3);
});
