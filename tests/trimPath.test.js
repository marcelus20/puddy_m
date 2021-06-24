import { trimPath } from "../src/helpers";

test("trimPath should resolve abc when string passed was /abc/", () =>
  expect(trimPath("/abc/")).resolves.toBe("abc"));

test("trimPath should resolve abc when string passed was /abc", () =>
  expect(trimPath("/abc/")).resolves.toBe("abc"));

test("trimPath should resolve abc when string passed was abc/", () =>
  expect(trimPath("/abc/")).resolves.toBe("abc"));

test("trimPath should resolve ab/c when string passed was ab/c/", () =>
  expect(trimPath("ab/c")).resolves.toBe("ab/c"));

test("trimPath should resolve a/b/c when string passed was a/b/c/", () =>
  expect(trimPath("a/b/c/")).resolves.toBe("a/b/c"));

test("trimPath should resolve a/b/c when string passed was /a/b/c/", () =>
  expect(trimPath("/a/b/c/")).resolves.toBe("a/b/c"));

test("trimPath should resolve -a/b-/c- when string passed was /-a/b-/c-m/", () =>
  expect(trimPath("/-a/b-/c-m/")).resolves.toBe("-a/b-/c-m"));

test("trimPath should resolve '' when string passed was empty", () =>
  expect(trimPath("")).resolves.toBe(""));