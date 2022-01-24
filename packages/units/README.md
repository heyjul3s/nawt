# @nawt/units

A library for unit conversion and other unit related utilities.

### **Install**

```sh
# For NPM
npm install @nawt/units

# For Yarn
yarn add @nawt/units

# For PNPM
pnpm install @nawt/units
```

## **API**

### **pxToEm**(value: `string`, baseSize: `number`)

Converts px to em string.

```ts
import { pxToEm } from '@nawt/units';

pxToEm('48px'); // returns 3em
```

---

### **pxToRem**(value: `string`, baseSize: `number`)

Converts px to rem string.

```ts
import { pxToRem } from '@nawt/units';

pxToRem('48px'); // returns 3rem
```

---

### **emToPx**(value: `string`, baseSize: `number`)

Converts em to px string.

```ts
import { emToPx } from '@nawt/units';

emToPx('3em'); // returns 48px
```

---

### **remToPx**(value: `string`, baseSize: `number`)

Converts em to px string.

```ts
import { remToPx } from '@nawt/units';

remToPx('3em'); // returns 48px
```
