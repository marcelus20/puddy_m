import { ObjectValidationError } from "../src/models/errors"
import { validateAllArgsObject } from "../src/validators/complexValidators"

test("validateEverythingObject should resolve when the list of params are of the type object", ()=>{
    return expect(
        validateAllArgsObject({}, {"b": 5}, {})
    ).resolves.toEqual([{}, {"b": 5}, {}])
})


test("validateEverythingObject should rejet when at least one parameter isn't of type object.", ()=>{
    return expect(
        validateAllArgsObject("a", 4, "c")
    ).rejects.toThrow(new ObjectValidationError().message)
})

test("validateEverythingObject should rejet when at least one parameter isn't of type object.", ()=>{
    return expect(
        validateAllArgsObject(true, "f", "c")
    ).rejects.toThrow(new ObjectValidationError().message)
})

test("validateEverythingObject should rejet when at least one parameter isn't of type object.", ()=>{
    return expect(
        validateAllArgsObject("true", "f", {})
    ).rejects.toThrow(new ObjectValidationError().message)
})