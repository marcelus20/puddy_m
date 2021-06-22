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

export class IntegerValidationError extends CustomError {
  constructor() {
    super(`The parameter must be an number Integer.`);
  }
}

export class IntegerValidationErrorFromValue extends CustomError {
  constructor() {
    super(
      `The parameter must be an number Integer greater or equal what was specified in the from parameter.`
    );
  }
}

export class IntegerValidationErrorToValue extends CustomError {
  constructor() {
    super(
      `The parameter must be an number Integer lower or equal what was specified in the limit parameter.`
    );
  }
}

export class EmailValidationError extends CustomError {
  constructor() {
    super(`The parameter must be a valid email format: foo@bar.com`);
  }
}

export class StringLengthGreaterThanError extends CustomError {
  constructor(str, len) {
    super(
      `The string length is not greater than the length passed as parameter. String Length: ${str.length} - Length Parameter ${len}`
    );
  }
}

export class StringLengthGreaterEqualError extends CustomError {
  constructor(str, len) {
    super(
      `The string length is not greater or equal the length passed as parameter. String Length: ${str.length} - Length Parameter ${len}`
    );
  }
}

export class StringLengthLowerThanError extends CustomError {
  constructor(str, len) {
    super(
      `The string length is not lower than the length passed as parameter. String Length: ${str.length} - Length Parameter ${len}`
    );
  }
}

export class StringLengthLowerEqualError extends CustomError {
  constructor(str, len) {
    super(
      `The string length is not lower or equal the length passed as parameter. String Length: ${str.length} - Length Parameter ${len}`
    );
  }
}

export class PositiveIntegersError extends CustomError {
  constructor(){
    super("The number passed as parameter must be positive, and should not be 0.")
  }
}

export class NegativeIntegersError extends CustomError {
  constructor(){
    super("The number passed as parameter must be negative, and should not be 0.")
  }
}


export class AllArgsValidationError extends CustomError {
  constructor() {
    super(
      `Failed to validate args. The validation function is invalid or wasn't passed.`
    );
  }
}

//AllArgsNoArgsValidationError
export class AllArgsNoArgsValidationError extends CustomError {
  constructor() {
    super(
      `Failed to validate args. The function received 0 args to validate. `
    );
  }
}

export class HashingAlgorithmError extends CustomError{
  constructor(){
    super("The hashing algorithm specified is invalid or not supported with the current version of the Open SSL. Issue the openssl list -digest-algorithms in the terminal to see available supported open SSL hashing algorithms.")
  }
}

export class ListDirContentError extends CustomError{
  constructor(dirLocation){
    super(`No files or folders were found in this directory. Directory location: ${dirLocation}`);
  }
}

export class TruncateFileError extends CustomError{
  constructor(){
    super(`Error truncating file.`);
  }
}


export class UpdateFileError extends CustomError{
  constructor(){
    super(`Cannot update the file. It may not exist.`);
  }
}

export class NotExistingFileError extends CustomError{
  constructor(){
    super(`File doesn't exist.`);
  }
}

export class DeletingFileError extends CustomError{
  constructor(){
    super(`Error deleting file. It may not exist.`);
  }
}

export class CreatingFileError extends CustomError{
  constructor(){
    super(`Could not create the new file. It may already exist.`);
  }
}


export class ExistingFileError extends CustomError{
  constructor(){
    super(`The file exists.`);
  }
}


export class DirectoryNotFoundError extends CustomError{
  constructor(dirPath){
    super(`The given directory wasn't found. Directory: ${dirPath}`);
  }
}


export class IsDirectoryError extends CustomError{
  constructor(dirPath){
    super(`The ${dirPath} isn't a directory!`);
  }
}


export class ExistingDirError extends CustomError{
  constructor(dirPath){
    super(`Directory already exists.`);
  }
}


export class CreatingDirError extends CustomError{
  constructor(dirPath){
    super(`Cannot create the directory. It may already exist.`);
  }
}


export class DeletingDirError extends CustomError{
  constructor(dirPath){
    super(`Could not delete the folder. It may not exist.`);
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

  _if = (errorName) => {
    if (this.e) {
      const numberOfConditions = this.conditions.size;
      this.conditions.set(numberOfConditions, [this.e.name == errorName, null]);
      return this
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
    return this
  };

  withError = (e) => {
    this.e = e;
    return this
  };

  defaultsTo = (defaultError) => {
    this.defaultError = defaultError;
    return this
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

export class ConditionalByMessageError extends ConditionalByNameError{
  
  static factory(
    conditions = new Map(),
    conditionWithNoValueKey = 0,
    e,
    defaultError
  ) {
    
    
    return new ConditionalByMessageError(
      (conditions = new Map()),
      (conditionWithNoValueKey = 0),
      e,
      defaultError
    );

  }

  // Overriding the _if method. 
  _if = (messagePortion) => {
    console.log({messagePortion})
    if (this.e) {
      const numberOfConditions = this.conditions.size;
      this.conditions.set(numberOfConditions, [this.e.message.includes(messagePortion), null]);
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
  }
}