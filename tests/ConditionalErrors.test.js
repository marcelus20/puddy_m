//import { ConditionalByNameError } from "../src/models/errors";
import {
  StringValidationError,
  ConditionalByNameError,
  IfWithoutEAttrError,
  OverInvokingThenMethod,
  DecisionWithourADefaultEError,
} from "../src/models/errors";

test("ConditionalByNameError.prototype.decide() should not throw when when an error and a default error have been set up.", () => {
  const conditionalbyNameError = new ConditionalByNameError()
    .withError(new StringValidationError())
    ._if("StringValidationError")
    ._then(new StringValidationError())
    .defaultsTo(new Error("default Error Here"));

  expect(conditionalbyNameError.decide()).toEqual(new StringValidationError());
});

test("ConditionalByNameError.prototype._if() should throw when it's invoked without having set up an error using the withError method.", () => {
  const conditionalbyNameError = new ConditionalByNameError();

  try {
    conditionalbyNameError._if("StringValidationError");
  } catch (e) {
    expect(e).toEqual(new IfWithoutEAttrError());
  }
});

test("ConditionalByNameError.prototype._then() should throw when it's invoked without having invoked the _if method.", () => {
  const conditionalbyNameError = new ConditionalByNameError();

  try {
    conditionalbyNameError._then("StringValidationError");
  } catch (e) {
    expect(e).toEqual(new OverInvokingThenMethod());
  }
});

test("ConditionalByNameError.prototype.decide() should throw when it's invoked without having invoked the 'defaultsTo' method.", () => {
  const conditionalbyNameError = new ConditionalByNameError();

  try {
    conditionalbyNameError.withError(new Error()).decide();
  } catch (e) {
    expect(e).toEqual(new DecisionWithourADefaultEError());
  }
});

test("ConditionalByNameError.prototype.defaultsTo should should not throw if the defaultsTo is invoked before the withError", () => {
  const conditionalbyNameError = new ConditionalByNameError();

  expect(
    conditionalbyNameError
      .defaultsTo(new Error("Default Error"))
      .withError(new Error("To compare Error"))
  ).toEqual(
    conditionalbyNameError
      .withError(new Error("To compare Error"))
      .defaultsTo(new Error("Default Error"))
  );
});

test("ConditionalByNameError.prototype.decide should return the default error if the 'withError', 'defaultsTo' without the '_if' and 'then' having been called before", () => {
  const conditionalbyNameError = new ConditionalByNameError();

  expect(
    conditionalbyNameError
      .defaultsTo(new Error("Default Error"))
      .withError(new Error("To compare Error"))
      .decide()
  );
});
