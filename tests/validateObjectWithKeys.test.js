import { validateObjectWithKeys } from "../src/complexValidators";

test("validateObjectWithKeys will reject when the keys foo and bar aren't valid for the object.", () => {
  return expect(
    validateObjectWithKeys({}, undefined, "foo", "bar")
  ).rejects.toThrow(
    "The object doesn't contain some/all keys passed as argument."
  );
});

test("validateObjectWithKeys will reject when any key from the list isn't a string.", () => {
  return expect(
    validateObjectWithKeys({}, undefined, "foo", 2)
  ).rejects.toThrow("Parameter must be a string.");
});

test("validateObjectWithKeys will reject when any key from the list isn't a string.", () => {
  return expect(
    validateObjectWithKeys({}, undefined, "foo", 2)
  ).rejects.toThrow("Parameter must be a string.");
});
