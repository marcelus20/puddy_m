import { validateFunction } from "../src/validators";

test("validateFunction will reject when param is null", () => {
    return expect(validateFunction(null)).rejects.toThrow(
      "The given parameter isn't a function."
    );
  });
  
  test("validateFunction will resolve when param is a function", () => {
    return expect(validateFunction(()=>{}).then(isFunction=>true)).resolves.toBe(true);
  });
  
  test("validateFunction will resolve when param is a function", () => {
    return expect(validateFunction("()=>{}").then(isFunction=>true)).rejects.toThrow("The given parameter isn't a function.");
  });

  test("validateFunction will resolve when param is not a function", () => {
    return expect(validateFunction(1)).rejects.toThrow("The given parameter isn't a function.");
  });
  