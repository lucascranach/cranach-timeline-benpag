# Conventions

## Git Commit Messages

- Git commit messages must be in english
- Keep it short and simple
- Use the present tense
```
add feature     // ok

added feature   // avoid
```
- Use the imperative formulation
```
move cursor to...   // ok

moves cursor to...  // avoid
```

## Issues
For declaring issues, use the given [Issue Template](https://github.com/BenPag/cranach/blob/master/docs/issue_template.md).

## Documentation

### ADR

All architecture and design decisions must be documented using ADR. 
Every ADR document must use the given [ADR Template](https://github.com/BenPag/cranach/blob/master/docs/adr/template.md) and must be added to the [ADR Index](https://github.com/BenPag/cranach/blob/master/docs/adr/index.md).
Markdown is used for the ADR-Documentation. It is important to document every decision to so that the evaluation and the options studied can be understood.
The names of the individual files should follow the given pattern: "0001-general-topic.md"


## Coding

The guidelines are implemented via [ESLint](https://eslint.org/). The rules are mainly adapted from the [Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) ruleset and adjusted to fit the project's individual needs.

###  Meaningful Naming 
Variables and functions must be named in such a meaningful way that their function can be derived from the name.

**Correct**
```javascript
let isEmpty =  true;
function getData(){};
```
**Wrong**
```javascript
let x =  true;
function data(){};
```

### Use prototype functions
When possible, [Prototype Functions](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/Prototypen) should be used.

**Correct**
```javascript
let array1 =  [1,2,3];
let array2 = array1.map(x => x * 2);
```
**Wrong**
```javascript
let array1 = [1,2,3];
let array2: [];

for(let i = 0; i < array1.length; i++){
    array2[i] = array1[i] * 2;
}
```

### Curly braces in the same line

Curly braces should always be in the same line as the corresponding keyword.

**Correct**
```javascript
if(x < 1){

}
```
**Wrong**
```javascript
if(x < 1)
{

}
```

### String Templates
To use variables within a string, string templates should be used.

**Correct**
```javascript
const number = 3;
console.log(`Number: ${number}`);
```
**Wrong**
```javascript
const number = 3;
console.log('Number: ' + number);
```

### Commas at the end of the line

Commas, which are used to separate multiple elements, should always be at the end of the line. This does not apply to the last element.

**Correct**
```javascript
const object = {
    element1: 1,
    element2: 2,
    element3: 3,
}
```
**Wrong**
```javascript
const object = {
    element1: 1
    ,element2: 2
    ,element3: 3
}
```
### Magic Numbers / Strings

Strings and Numbers should not be placed in the code, but stored in a configuration file.

**Correct**
```json
{
    hostUrl : 'http://localhost:3000';
}
```

```javascript
await axios.get(`${hostUrl}/images`);
```
**Wrong**
```javascript
await axios.get('http://localhost:3000/images');
```

### CamelCase beim Naming

When naming variables or functions, the first letter is written in lower case and every further initial letter in upper case. 

**Correct**
```javascript
const someObject = {};
```
**Wrong**
```javascript
const someobject = {};
const SoMeObJeCt = {};
```

### Async / Await

If a promise is expected,  Async / Await should be used instead of callbacks.

**Correct**
```javascript
try {
const res = await axios.get(`${hostUrl}/images`);
} catch(e) {
    // Error handling
}
```
**Wrong**
```javascript
axios.get(`${hostUrl}/images`)
    .then((res) => {
        // Response Handling
    })
    .error((e) => {
        // Error Handling
    });
```

### English naming

Variables and function names should always be written in english. 

**Correct**
```javascript
const number = 3;
function getData(){}
```
**Wrong**
```javascript
const zahl = 3;
function kriegeDaten(){}
```
