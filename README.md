# polylang
Small library for handling multi language support using JavaScript

## Installation
```
npm install 
```

## Usage
```javascript
const Polylang = require('polylang'); // or if you are using ES6 imports, import Polylang from 'polylang';

const polylang = new Polylang(); // create a new instance
polylang.add('en', {
    welcome: 'welcome',
    title: 'Someone is always watching us',
    errors: {
        invalid_email: '<<email>> is not a valid email because <<reason>>'.
    }
});
polylang.add('ro', {
    welcome: 'salutare',
    title: 'Cineva ne urmareste in permanenta',
    errors: {
        invalid_email: '<<email>> nu este un email valid deoarece <<motiv>>'.
    }
});
```





## API

* [Polylang](#Polylang)
    * [new Polylang({defaultLang, accessDelimiter, startInterpolationDelimiter, endInterpolationDelimiter})](#new_Polylang_new)
    * [.add(language, data)](#Polylang+add)
    * [.remove(language)](#Polylang+remove)
    * [.t(selector, interpolationValues)](#Polylang+t)
    * [.translate(selector, language, interpolationValues)](#Polylang+translate)

<a name="new_Polylang_new"></a>

### new Polylang({defaultLang, accessDelimiter, startInterpolationDelimiter, endInterpolationDelimiter})

| Param | Type | Description |
| --- | --- | --- |
| {defaultLang | <code>string</code> | the default language that will be used to translate the text |
| accessDelimiter | <code>string</code> | delimiter used to represent levels in the translation object (ex: 'errors.password.too_short') |
| startInterpolationDelimiter | <code>string</code> | delimiter used to interpolate custom string into the translation at the start of the word |
| endInterpolationDelimiter} | <code>string</code> | delimiter used to interpolate custom string into the translation at the start of the word |

**Example**
```js
polylang = new Polylang({
    defaultLang: 'en'
    accessDelimiter: '.',
    startInterpolationDelimiter: '<<',
    endInterpolationDelimiter: '>>'
});
```
<a name="Polylang+add"></a>

### polylang.add(language, data)
Add a translation

**Kind**: instance method of [<code>Polylang</code>](#Polylang)

| Param | Type | Description |
| --- | --- | --- |
| language | <code>string</code> | language |
| data | <code>object</code> | translation object |

**Example**
```js
polylang.add('en',{
            errors: {
                invalid_email: 'The email "<<email>>" is invalid',
                password: {
                    too_short: 'The password is too short',
                    one_digit: 'The passowrd must contain at least one digit'
                },
            }
        });
```
<a name="Polylang+remove"></a>

### polylang.remove(language)
Remove a translation

**Kind**: instance method of [<code>Polylang</code>](#Polylang)

| Param | Type | Description |
| --- | --- | --- |
| language | <code>string</code> | language name that wil be removeed |

**Example**
```js
polylang.remove('en');
```
<a name="Polylang+t"></a>

### polylang.t(selector, interpolationValues)
Translate

**Kind**: instance method of [<code>Polylang</code>](#Polylang)

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | translation path |
| interpolationValues | <code>string</code> \| <code>object</code> | value/s to be replaced between interpolation delimiters |

**Example**
```js
polylang.t('errors.invalid_email', 'test@test.com');
polylang.t('errors.invalid_email', {email: 'test@test.com', reason: 'it is taken!'}); //if invalid_email string would be 'The email "<<email>>" is invalid because <<reason>>'
```
<a name="Polylang+translate"></a>

### polylang.translate(selector, language, interpolationValues)
Translate in custom language

**Kind**: instance method of [<code>Polylang</code>](#Polylang)

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | translation path |
| language | <code>string</code> | translation language |
| interpolationValues | <code>string</code> \| <code>object</code> | value/s to be replaced between interpolation delimiters |

**Example**
```js
polylang.t('errors.invalid_email', 'en', 'test@test.com');
```