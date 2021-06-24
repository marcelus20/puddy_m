import { generateRandomString } from "../src/helpers";

test("generateRandomString should generate random strings of 12 of length if paramter is 12.", () =>
  expect(generateRandomString(12).then((str) => str.length)).resolves.toBe(12));

test("generateRandomString should generate two different random strings even if the length of both is the same.", () =>
  expect(
    generateRandomString(12, [])
      .then((tuple) => generateRandomString(12, tuple))
      .then(([s1, s2]) => s1 != s2)
  ).resolves.toBe(true));
