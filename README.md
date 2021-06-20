# puddy-m

Puddy-m is a JavaScript library to deal with simple utility validation checks, using the promise-based approach.

## Introduction

### Why this lib was created
To reduce the number of inline validations and re-assignment to variables. Using puddy-m, you will carry out the same task using a promise-based approach, making your code more legible, having control of what's going on in each step. 

#### Example
Say you received a variable and you want to check if the variable isn't undefined or null, an approach would be to reassign the variable making a series of ternary expression check, like so:

```javascript

function f(x, y){
  x = typeof x != "undefined" && x != null ? x : false
  b = typeof y != "undefined" && y != null ? y : false

  if(x && y){/** Do your logic here if x passed the test*//}
}

```
The problem with the approach above is that you make re-assignments to a variable, the least you could do to avoid it was to create a new variable (validatedX and validatedY) using const, but still the ternary expression can get more complex as the number of validations increases.

With puddy-m, the idea is to break down validations into separate steps using promises and you have an idea of the chronological validations checks happening . For the example bellow, the code would change like so:

```javascript

function f(x, y){
  validateNotUndefined(x)
    .then(validateNotNull)
    .then(() => validateNotUndefined(y))
    .then(validateNotNull)
    .then(()=>{
        // if code gets here, it's because validation went through. 
        // Do your logic
    }).catch(e=>{
       //Handle if validation above failed. 
    })

}

// Also works with await
async function g(x, y) {
  const { validatedX, validatedY } = await validateNotUndefined(x)
    .then(validateNotNull)
    .then(() => validateNotUndefined(y))
    .then(validateNotNull)
    .then(() => ({
      validatedX: x,
      validatedY: y,
    })).catch(e=>e);

  if(validatedX && validatedY){
    // Do your logic here. 
  }
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
