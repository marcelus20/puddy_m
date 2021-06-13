import validateNumber from "../src/utils/validations/validateNumber";

test("validateNumber will resolve when param is 1", () => {
  return expect(validateNumber(1)).resolves.toBe(1);
});

test("validateNumber will resolve when param is 0", () => {
  return expect(validateNumber(0)).resolves.toBe(0);
});

test("validateNumber will resolve when param is -10", () => {
  return expect(validateNumber(-10)).resolves.toBe(-10);
});

test("validateNumber will reject when param is 'Hello World'", () => {
  return expect(validateNumber("Hello World")).rejects.toThrow(
    "The passed argument isn't a number."
  );
});

test("validateNumber will reject when param is ''", () => {
  return expect(validateNumber("")).rejects.toThrow(
    "The passed argument isn't a number."
  );
});

test("validateNumber will reject when param is an object", () => {
  return expect(validateNumber({})).rejects.toThrow(
    "The passed argument isn't a number."
  );
});

test("validateNumber will reject when param is an array", () => {
  return expect(validateNumber([])).rejects.toThrow(
    "The passed argument isn't a number."
  );
});

test("validateNumber will resolve when param is an decimal number", () => {
  return expect(validateNumber(0.5)).resolves.toBe(0.5);
});
