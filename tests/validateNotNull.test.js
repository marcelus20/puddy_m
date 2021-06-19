import {validateNotNull} from "../src/validators";

test("validateNotNull will reject when param is null", () => {
  return expect(validateNotNull(null)).rejects.toThrow(
    "The passed argument can't be null."
  );
});

test("validateNotNull will resolve when param is not null", () => {
  return expect(validateNotNull(1)).resolves.toBe(1);
});

test("validateNotNull will resolve when param is not null", () => {
  return expect(validateNotNull("")).resolves.toBe("");
});
