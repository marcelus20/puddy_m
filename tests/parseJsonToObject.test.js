import { parseJsonToObject } from "../src/helpers";

test("parseJsonToObject should resolve the an empty object if the value passed isn't a valid JSON format.", () =>
  expect(parseJsonToObject("{")).resolves.toEqual({}));

test("parseJsonToObject should resolve the an empty object if the value passed isn't a valid JSON format.", () =>
  expect(parseJsonToObject("{+")).resolves.toEqual({}));

test("parseJsonToObject should resolve the an empty object if the value passed isn't a valid JSON format.", () =>
  expect(parseJsonToObject("")).resolves.toEqual({}));

test("parseJsonToObject should resolve the object version of the json valid if the value passed is a valid JSON format.", () =>
  expect(parseJsonToObject(`{"foo":"bar"}`)).resolves.toEqual({ foo: "bar" }));
