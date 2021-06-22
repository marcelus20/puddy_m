import { HashingAlgorithms } from "../src/enums"
import { hash } from "../src/helpers"
import { HashingAlgorithmError, StringValidationError } from "../src/models/errors"

test("hash function should reject if the hashing algorithm passed isn't an open SSL algorithm.", ()=>{
    return expect(hash("Foobar", "", HashingAlgorithms.MD4)).resolves.toBe("cc45dc16464b0c0b0ee6a33423d2a989")
})

test("hash function should resolve if the hashing algorithm passed is an open SSL algorithm.", ()=>{
    return expect(hash("Foobar", "fizzbuzz", HashingAlgorithms["SHA3-224"])).resolves.toBe("ced119d8487c2cf2995971429f9cdb56fff21169726c2e3039fea179")
})

test("hash function should resolve if the hashing algorithm passed is an open SSL algorithm.", ()=>{
    return expect(hash("Foobar", "fizzbuzz", HashingAlgorithms.SM3)).resolves.toBe("b525bb28b7e28385af6b58208a06c5b921847cb556045cc3637ebde87a149e79")
})

test("hash function should resolve if the hashing algorithm passed is an open SSL algorithm.", ()=>{
    return expect(hash("Foobar", "fizzbuzz", HashingAlgorithms["id-rsassa-pkcs1-v1_5-with-sha3-224"])).resolves.toBe("ced119d8487c2cf2995971429f9cdb56fff21169726c2e3039fea179")
})

test("hash function should resolve if the hashing algorithm passed is an open SSL algorithm.", ()=>{
    return expect(hash("Foobar", "fizzbuzz", HashingAlgorithms["SHA3-256"])).resolves.toBe("36cd8936f6c91c236926ed8602e6c94b3060f902135f303e75bbb019d26fc685")
})

test("hash function should resolve if the hashing algorithm passed is an open SSL algorithm.", ()=>{
    return expect(hash("Foobar", "fizzbuzz", HashingAlgorithms.SHA512)).resolves.toBe("08305f5735423a88980f04fdf2f569910172d236c491993ef18d9f1893f2822e4040b841e20acaef46ae863ef23126d1c0e13e2f1fbeca273fa526fe13b9f8ec")
})

test("hash function should reject HashingAlgorithmError if the hashing algorithm passed isn't a supported Open SSL.", ()=>{
    return expect(hash("Foobar", "fizzbuzz", "whatever")).rejects.toThrow(new HashingAlgorithmError())
})

test("hash function should reject StringValidationError if any parameter isn't a string.", ()=>{
    return expect(hash(1, "fizzbuzz", "whatever")).rejects.toThrow(new StringValidationError())
})