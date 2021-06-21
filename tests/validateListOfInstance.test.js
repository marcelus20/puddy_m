import { validateListOfInstance } from "../src/listValidators";

class User {}

test("validateListOfInstance will resolve when all elements of the array are instance of Instance Ref", () => {
  return expect(
    validateListOfInstance(User, [
      new User(),
      new User(),
      new User(),
      new User(),
    ])
  ).resolves.toEqual([new User(), new User(), new User(), new User()]);
});

test("validateListOfInstance will reject when any element of the array are NOT an instance of Instance Ref", () => {
  return expect(
    validateListOfInstance(User, [
      new User(),
      new User(),
      [],
      new User(),
    ])
  ).rejects.toThrow(`The supposed instance isn't instance of the Instance Reference. Reference: ${User}, Supposed Instance: [].`);
});

test("validateListOfInstance will reject when Instance Ref is undefined.", () => {
  return expect(
    validateListOfInstance(undefined, [
      new User(),
      new User(),
      [],
      new User(),
    ])
  ).rejects.toThrow(`The passed argument can't be undefined.`);
});

