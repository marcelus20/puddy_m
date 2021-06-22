import { StringValidationError } from "../src/models/errors"
import { validateAllArgsString } from "../src/validators/complexValidators"

test("validateEverythingString should resolve when the list of params are of the type string", ()=>{
    return expect(
        validateAllArgsString("a", "b", "c")
    ).resolves.toEqual(["a", "b", "c"])
})


test("validateEverythingString should rejet when at least one parameter isn't of type string.", ()=>{
    return expect(
        validateAllArgsString("a", 4, "c")
    ).rejects.toThrow(new StringValidationError().message)
})

test("validateEverythingString should rejet when at least one parameter isn't of type string.", ()=>{
    return expect(
        validateAllArgsString(true, "f", "c")
    ).rejects.toThrow(new StringValidationError().message)
})

test("validateEverythingString should rejet when at least one parameter isn't of type string.", ()=>{
    return expect(
        validateAllArgsString("true", "f", {})
    ).rejects.toThrow(new StringValidationError().message)
})