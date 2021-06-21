# puddy-m

Puddy-m is a JavaScript library to deal with simple utility validation checks, using the promise-based approach.

## Introduction

### Why this lib was created
To reduce the number of inline validations and re-assignment to variables. Using puddy-m, you will carry out the same task using a promise-based approach, making your code more legible, having control of what's going on in each step. 

### Example
Say you received different variables and you want to check if the they are string, or not undefined, or boolean, etc, an approach without this library would be to reassign the variable making a series of ternary expression check, like so:

```javascript
// Not using puddy-m library
function f(a, b, c, d, e, callbackSuccess, callbackError){
  a = typeof a != "undefined" ? a : false;
  b = typeof b == "string" ? b : false;
  c = typeof c == "number" ? c : false;
  d = typeof d == "boolean" ? d : false;
  e = typeof e != null ? e : false;
  callbackSuccess = typeof callbackSuccess == "function" ? callbackSuccess : false;
  callbackError = typeof callbackError == "function" ? callbackError : false;

  if(x && y && c && d && e, callbackSuccess){
    calbackSuccess();
  }else{
    if(callBackError){
      callbackError("Worked");
    }
  }
}

```
The problem with the approach above is that you make re-assignments to a variable, the least you could do to avoid it was to create a new variable (validatedX and validatedY) using const, but still the ternary expression can get more complex as the number of validations increases.

With puddy-m, the idea is to break down validations into separate steps using promises and you have an idea of the chronological validations checks happening . For the example bellow, the code would change like so:

```javascript

// Using puddy-m library
import {
  validateNotUndefined, 
  validateString, 
  validateNumber, 
  validateBoolean, 
  validateFunction, 
  validateNotNull
} from "puddy-m/lib/validators";


function f(a, b, c, d, e, callbackSuccess, callbackError){
  validateNotUndefined(a, [])
    .then(tuple=>validateString(b, tuple)) // tuple at this point is [ a ]
    .then(tuple=>validateNumber(c, tuple)) // tuple at this point is [ a, b ]
    .then(tuple=>validateBoolean(d, tuple)) // tuple at this point is [ a, b, c ]
    .then(tuple=>validateNotNull(e, tuple)) // tuple at this point is [ a, b, c, d ]
    .then(tuple=>validateFunction(callbackSuccess, tuple)) // tuple at this point is [ a, b, c, d, e ]
    .then([a, b, c, d, e, callbackSuccess] =>callbackSuccess("Worked")) // Tuple was distructured to [a, b, c, d, e, callbackSuccess]
    .catch(e=>{
      validateFunction(callbackError).then(callbackError)
      return e
    })
}

```
If the validation fails in any of the chained promises, you can easily include the error handling logic in the catch function.


## Installation - PS: The published version in NPM is out of dated, the lib is still in development.

Use the package manager npm to install puddy-m.

```bash
npm install puddy-m
#or
npm i puddy-m
```

## Usage

Coming...

## Documentation
Coming...

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
