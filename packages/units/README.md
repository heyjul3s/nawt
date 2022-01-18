# @artefakt/units

A library for unit conversion and other unit related utilities.

### **Install**

```sh
# For NPM
npm install @artefakt/units

# For Yarn
yarn add @artefakt/units

# For PNPM
pnpm install @artefakt/units
```

## **API**

### **`pxToEm`**(value: `string`, baseSize: `number`)

Converts px to em string.

```ts
import { pxToEm } from '@artefakt/units';

pxToEm('48px'); // returns 3em
```

---

### **`pxToRem`**(value: `string`, baseSize: `number`)

Converts px to rem string.

```ts
import { pxToRem } from '@artefakt/units';

pxToRem('48px'); // returns 3rem
```

---

### **`emToPx`**(value: `string`, baseSize: `number`)

Converts em to px string.

```ts
import { emToPx } from '@artefakt/units';

emToPx('3em'); // returns 48px
```

---

### **`remToPx`**(value: `string`, baseSize: `number`)

Converts em to px string.

```ts
import { remToPx } from '@artefakt/units';

remToPx('3em'); // returns 48px
```
