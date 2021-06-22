import { NumberValidationError } from "../src/models/errors"
import { validateAllArgsNumber } from "../src/validators/complexValidators"

test("validateEverythingNumber should resolve when the list of params are of the type string", ()=>{
    return expect(
        validateAllArgsNumber(1, 2, -7)
    ).resolves.toEqual([1, 2, -7])
})


test("validateEverythingNumber should rejet when at least one parameter isn't of type string.", ()=>{
    return expect(
        validateAllArgsNumber("a", 4, "c")
    ).rejects.toThrow(new NumberValidationError().message)
})

test("validateEverythingNumber should rejet when at least one parameter isn't of type string.", ()=>{
    return expect(
        validateAllArgsNumber(true, "f", "c")
    ).rejects.toThrow(new NumberValidationError().message)
})

test("validateEverythingNumber should rejet when at least one parameter isn't of type string.", ()=>{
    return expect(
        validateAllArgsNumber("true", "f", {})
    ).rejects.toThrow(new NumberValidationError().message)
})