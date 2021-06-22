import { BooleanValidationError } from "../src/models/errors"
import { validateAllArgsBoolean } from "../src/validators/complexValidators"

test("validateEverythingBoolean should resolve when the list of params are of the type boolean", ()=>{
    return expect(
        validateAllArgsBoolean(true, false, true)
    ).resolves.toEqual([true, false, true])
})


test("validateEverythingBoolean should rejet when at least one parameter isn't of type boolean.", ()=>{
    return expect(
        validateAllArgsBoolean("a", 4, "c")
    ).rejects.toThrow(new BooleanValidationError().message)
})

test("validateEverythingBoolean should rejet when at least one parameter isn't of type boolean.", ()=>{
    return expect(
        validateAllArgsBoolean(true, "f", "c")
    ).rejects.toThrow(new BooleanValidationError().message)
})

test("validateEverythingBoolean should rejet when at least one parameter isn't of type boolean.", ()=>{
    return expect(
        validateAllArgsBoolean("true", "f", {})
    ).rejects.toThrow(new BooleanValidationError().message)
})

test("validateEverythingBoolean should rejet when at least one parameter isn't of type boolean.", ()=>{
    return expect(
        validateAllArgsBoolean(true, null, true)
    ).rejects.toThrow(new BooleanValidationError().message)
})