# @nawt/colors

A collection of colour value conversion utilities and other colour related functions.

## **API**

### **hexToRgb**(hex: string): string

This function converts a hex colour value to rgb.

```ts
hexToRgb('#000'); // returns string 'rgb(0, 0, 0)'
```

---

### **hexToRgba**(hex: string, alpha: number): string

Similar to hexToRgb with the difference that this function also returns an alpha value.

```ts
hexToRgba('#000', 0.5); // returns string 'rgba(0, 0, 0, 0.5)'
```

---

### **rgbToHex**(value: any): string

Converts a RGB colour values to a hex colour value.

```ts
// you can pass in 3 separate numbers each indicating R, G and B respectively as arguments
rgbToHex(97, 58, 136); // returns string '#613a88'

// or your can pass in a single string with a format like 'rgb(111,  147, 11)'
rgbToHex('rgb(111,  147, 11)'); // returns string '#6f930b'
```
