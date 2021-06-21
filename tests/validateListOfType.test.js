import { validateListOfType } from "../src/listValidators";

test("validateListOfType will resolve when all elements of the array is of type passed as parameter.", () => {
  return expect(
    validateListOfType("string", ["foo", "bar", "fizz", "buzz"])
  ).resolves.toEqual(["foo", "bar", "fizz", "buzz"]);
});

test("validateListOfType will reject when at least 1 element of the list isn't of the type specified.", () => {
  return expect(
    validateListOfType("string", ["foo", 2, "fizz", "buzz"])
  ).rejects.toThrow(
    `The list passed as argument has at least one element that failed the validation against the type string`
  );
});

test("validateListOfType will resolve when all elements of the array is of type object when the type passed is object", () => {
  return expect(
    validateListOfType("object", [{}, {}, {}, {}])
  ).resolves.toEqual([{}, {}, {}, {}]);
});

test("validateListOfType will reject when at least 1 element of the list isn't of the type object when it was passed object in the type arg.", () => {
  return expect(
    validateListOfType("object", [true, false, true, false])
  ).rejects.toThrow(
    `The list passed as argument has at least one element that failed the validation against the type object`
  );
});

test("validateListOfType will reject when the type parameter doesn't have a value pre-defined in the PrimitiveTypes enum.", () => {
  return expect(
    validateListOfType("foobar", [true, false, true, false])
  ).rejects.toThrow(
    "The type parameter should be a string pre-defined in the PrimitiveTypes enum. Accepted Values: 'symbol', 'object', 'string', 'number', 'boolean', 'function', 'bigint', 'undefined' and 'function'."
  );
});
