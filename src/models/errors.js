export class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ArrayValidationError extends CustomError {
  constructor() {
    super(`Parameter must be an array.`);
  }
}

export class BooleanValidationError extends CustomError {
  constructor() {
    super(`Parameter must be a boolean.`);
  }
}

export class FunctionValidationError extends CustomError {
  constructor() {
    super(`Parameter must be a function.`);
  }
}

export class InstanceValidationError extends CustomError {
  constructor(InstanceRef, supposedInstance) {
    super(
      `The supposed instance isn't instance of the Instance Reference. Reference: ${InstanceRef}, Supposed Instance: ${JSON.stringify(
        supposedInstance
      )}.`
    );
  }
}

export class NotInstanceValidationError extends CustomError {
  constructor(InstanceRef, supposedInstance) {
    super(
      `The supposed instance is instance of the Instance Reference when it was expecting not to be. Reference: ${InstanceRef}, Supposed Instance: ${JSON.stringify(
        supposedInstance
      )}.`
    );
  }
}

export class NotNullValidationError extends CustomError {
  constructor() {
    super(`The passed argument can't be null.`);
  }
}

export class NotTypeValidationError extends CustomError {
  constructor(arg, type) {
    super(
      `The arg has a valid type when it was expecting an invalid type. Arg: ${arg}, Type against: ${type}`
    );
  }
}

export class TypeValidationError extends CustomError {
  constructor(arg, type) {
    super(
      `The arg has an invalid type when it was expecting a valid ype. Arg: ${arg}, Type against: ${type}`
    );
  }
}

export class NotUndefinedValidationError extends CustomError {
  constructor() {
    super(`The passed argument can't be undefined.`);
  }
}

export class NumberValidationError extends CustomError {
  constructor() {
    super(`Parameter must be a number.`);
  }
}

export class ObjectValidationError extends CustomError {
  constructor() {
    super(`Parameter must be of type object and not be null.`);
  }
}

export class StringValidationError extends CustomError {
  constructor() {
    super(`Parameter must be a string.`);
  }
}

export class ObjectWithKeysValidationError extends CustomError {
  constructor() {
    super(`The object doesn't contain some/all keys passed as argument.`);
  }
}

export class ObjectWithExistingKeyValidationError extends CustomError {
  constructor() {
    super(
      `The type parameter should be a string pre-defined in the PrimitiveTypes enum. Accepted Values: 'symbol', 'object', 'string', 'number', 'boolean', 'function', 'bigint', 'undefined' and 'function'.`
    );
  }
}

export class ListOfTypeValidationError extends CustomError {
  constructor(type) {
    super(
      `The list passed as argument has at least one element that failed the validation against the type ${type}`
    );
  }
}

export class ListOfInstanceValidationError extends CustomError {
  constructor(InstanceRef) {
    super(
      `The list passed as argument has at least one element that failed the validation against the Instance Reference ${InstanceRef}`
    );
  }
}

export class ConditionalByNameError {
  static factory(
    conditions = new Map(),
    conditionWithNoValueKey = 0,
    e,
    defaultError
  ) {
    return new ConditionalByNameError(
      (conditions = new Map()),
      (conditionWithNoValueKey = 0),
      e,
      defaultError
    );
  }

  constructor(
    conditions = new Map(),
    conditionWithNoValueKey = 0,
    e,
    defaultError
  ) {
    this.conditions = conditions;
    this.conditionWithNoValueKey = conditionWithNoValueKey;
    this.e = e;
    this.defaultError = defaultError;
  }

  _if = (condition) => {
    if (this.e) {
      const numberOfConditions = this.conditions.size;
      this.conditions.set(numberOfConditions, [this.e.name == condition, null]);
      return new ConditionalByNameError(
        this.conditions,
        this.conditionWithNoValueKey,
        this.e,
        this.defaultError
      );
    } else {
      throw new Error(
        "Before invoking the _if method, you should have set up the 'e' attribute. The Method 'withError' should be invoked before _if."
      );
    }
  };

  _then = (value) => {
    if (this.conditionWithNoValueKey < this.conditions.size) {
      this.conditions.get(this.conditionWithNoValueKey)[1] = value;
      this.conditionWithNoValueKey++;
    } else {
      throw new Error(
        "The number of times the _then method should be invoked is the same number of times the _if was invoked."
      );
    }
    return new ConditionalByNameError(
      this.conditions,
      this.conditionWithNoValueKey,
      this.e,
      this.defaultError
    );
  };

  withError = (e) => {
    this.e = e;
    return new ConditionalByNameError(
      this.conditions,
      this.conditionWithNoValueKey,
      this.e,
      this.defaultError
    );
  };

  defaultsTo = (defaultError) => {
    this.defaultError = defaultError;
    return new ConditionalByNameError(
      this.conditions,
      this.conditionWithNoValueKey,
      this.e,
      this.defaultError
    );
  };

  decide = () => {
    // The first condition with the true flag will be the one to be fullfilled.

    const it = this.conditions.entries();

    for (let [condition, [flag, value]] of it) {
      if (flag) {
        return value;
      }
    }

    if (!this.defaultError) {
      throw new Error(
        "The 'decide' method cannot be invoked without having previously set a default error, using the 'defaultsTo' method, when all conditions aren't met."
      );
    }

    return this.defaultError;
  };
}
