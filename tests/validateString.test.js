import { validateString } from "../src/validators";

test("validateString will reject when param is 1", () => {
  return expect(validateString(1)).rejects.toThrow(
    "Parameter must be a string."
  );
});

test("validateString will reject when param is boolean", () => {
  return expect(validateString(true)).rejects.toThrow(
    "Parameter must be a string."
  );
});

test("validateString will reject when param is an object", () => {
  return expect(validateString({})).rejects.toThrow(
    "Parameter must be a string."
  );
});

test("validateString will reject when param is an Array", () => {
  return expect(validateString([1, 4, 5])).rejects.toThrow(
    "Parameter must be a string."
  );
});

test("validateString will reject when param is function", () => {
  return expect(validateString(() => {})).rejects.toThrow(
    "Parameter must be a string."
  );
});

test("validateString will reject when param is class", () => {
  return expect(validateString(class {})).rejects.toThrow(
    "Parameter must be a string."
  );
});

test('validateString will resolve when param is "Hello World"', () => {
  return expect(validateString("Hello World")).resolves.toBe("Hello World");
});

test('validateString will resolve when param is ""', () => {
  return expect(validateString("")).resolves.toBe("");
});

test('validateString will resolve when param is " "', () => {
  return expect(validateString(" ")).resolves.toBe(" ");
});

test('validateString will resolve when param is " "+1', () => {
  return expect(validateString(" " + 1)).resolves.toBe(" " + 1);
});
