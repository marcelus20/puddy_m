import { isEmailFormated } from "../src/helpers";

test("isEmailFormated should resolve true if the string is foo@bar.com", () =>
  expect(isEmailFormated("foo@bar.com")).resolves.toBe(true));

test("isEmailFormated should resolve false if the string is foo@bar.", () =>
  expect(isEmailFormated("foo@bar.")).resolves.toBe(false));


test("isEmailFormated should resolve false if the string is foo@bar", () =>
  expect(isEmailFormated("foo@bar")).resolves.toBe(false));

test("isEmailFormated should resolve true if the string is foo@bar", () =>
  expect(isEmailFormated("foo@123.456")).resolves.toBe(true));

test("isEmailFormated should resolve true if the string is foo@bar", () =>
  expect(isEmailFormated("foo@123")).resolves.toBe(false));
