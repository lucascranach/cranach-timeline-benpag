# Conventions

## Git Commit Messages

- Git Commit Messages auf Englisch
- kurz und einfach halten
- Präsens nutzen
```
add feature     // ok

added feature   // avoid
```
- im Imperativ formulieren
```
move cursor to...   // ok

moves cursor to...  // avoid
```

## Issues

Es existiert ein vorgefertigtes [Issue Template](https://github.com/BenPag/cranach/blob/master/docs/issue_template.md), an das sich gehalten werden sollte.

## Dokumentation

### ADR

Alle Architektur- und Designentscheidungen müssen mittels ADR dokumentiert werden. 
Jede Dokumentationsdatei verwendet das [ADR Template](https://github.com/BenPag/cranach/blob/master/docs/adr/template.md) als Vorlage und wird anschließend in den [ADR Index](https://github.com/BenPag/cranach/blob/master/docs/adr/index.md) integriert.
Die ADR-Dokumentation wird in Markdown geschrieben. Es ist wichtig, jede Entscheidung zu dokumentieren, sodass die Evaluation und die untersuchten Optionen nachvollzogen werden können.

Die Benennung der einzelnen Dateien sollte diesem Muster folgen: "0001-general-topic.md"


## Coding

### Aussagekräftiges Naming 
Variablen und Funktionen müssen so aussagekräftig benannt werden, dass ihre Funktion aus dem Namen abgeleitet werden kann.

**Richtig**
```javascript
let isEmpty: true;
function getData(){};
```
**Falsch**
```javascript
let x: true;
function data(){};
```

### Prototype Functions nutzen
Soweit möglich sollen [Prototype Functions](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/Prototypen) aus der Standard JavaScript Library genutzt werden.

**Richtig**
```javascript
let array1: [1,2,3];
let array2: array1.map(x => x * 2);
```
**Falsch**
```javascript
let array1: [1,2,3];
let array2: [];

for(let i = 0; i < array1.length; i++){
    array2[i] = array1[i] * 2;
}
```

### Curly braces in derselben Zeile 

Curly braces sollten immer in der selben Zeile wie das zugehörige Keyword stehen.

**Richtig**
```javascript
if(x < 1){

}
```
**Falsch**
```javascript
if(x < 1)
{

}
```

### String Templates
Um Variablen innerhalb eines Strings zu verwenden, sollten String Templates verwendet werden.

**Richtig**
```javascript
const number: 3;
console.log(`Number: ${number}`);
```
**Falsch**
```javascript
const number: 3;
console.log('Number: ' + number);
```

### Kommata am Ende der Zeile

Kommata, die zum Trennen von mehrerer Elemente verwendet werden, sollten immer am Ende der Zeile stehen. Dies gilt nicht für das letzte Element.

**Richtig**
```javascript
const object: {
    element1: 1,
    element2: 2,
    element3: 3,
}
```
**Falsch**
```javascript
const object: {
    element1: 1
    ,element2: 2
    ,element3: 3
}
```
### Magic Numbers / Strings

Strings und Numbers sollten nicht im Code hinterlegt, sondern in eine Konfigurationsdatei ausgelagert werden.

**Richtig**
```json
{
    hostUrl: 'http://localhost:3000'
}
```

```javascript
await axios.get(`${hostUrl}/images`)
```
**Falsch**
```javascript
await axios.get('http://localhost:3000/images')
```

### CamelCase beim Naming

Bei der Benenung von Variablen oder Funktionen wird der erste Buchstabe klein geschrieben und jeder weitere Anfangsbuchstabe groß. 

**Richtig**
```javascript
const someObject: {}
```
**Falsch**
```javascript
const someobject: {}
const SoMeObJeCt: {}
```

### Async / Await

Wenn eine Promise erwartet wird, soll mit Async / Await anstatt Callbacks gearbeitet werden.

**Richtig**
```javascript
try {
const res = await axios.get(`${hostUrl}/images`)
} catch(e) {
    // Error handling
}
```
**Falsch**
```javascript
axios.get(`${hostUrl}/images`)
    .then((res) => {
        // Response Handling
    })
    .error((e) => {
        // Error Handling
    });
```

### Englische Benennung

Variablen und Funktionsnamen sollten immer auf Englisch verfasst sein. 

**Richtig**
```javascript
const number: 3
function getData(){}
```
**Falsch**
```javascript
const zahl: 3
function kriegeDaten(){}
```
