import { ArrayValidationError } from "../src/models/errors"
import { validateAllArgsArray } from "../src/validators/complexValidators"

test("validateEverythingArray should resolve when the list of params are of the type string", ()=>{
    return expect(
        validateAllArgsArray(["a", "b", "c"], ["a", "b", "c"], ["a", "b", "c"])
    ).resolves.toEqual([["a", "b", "c"], ["a", "b", "c"], ["a", "b", "c"]])
})


test("validateEverythingArray should rejet when at least one parameter isn't of type string.", ()=>{
    return expect(
        validateAllArgsArray("a", 4, "c")
    ).rejects.toThrow(new ArrayValidationError().message)
})

test("validateEverythingArray should rejet when at least one parameter isn't of type string.", ()=>{
    return expect(
        validateAllArgsArray(true, "f", "c")
    ).rejects.toThrow(new ArrayValidationError().message)
})

test("validateEverythingArray should rejet when at least one parameter isn't of type string.", ()=>{
    return expect(
        validateAllArgsArray("true", "f", {})
    ).rejects.toThrow(new ArrayValidationError().message)
})