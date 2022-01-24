# @nawt/styled

Styled Components library with styledObject and styledSet utitlities for creation of Styled Components.

### **Install**

```sh
# For NPM
npm install @nawt/styled

# For Yarn
yarn add @nawt/styled

# For PNPM
pnpm install @nawt/styled
```

## **API**

### **`styledObject`**(element: `TStyledElement`, styles: `CSSObject`, props: `Partial<TStyledObjectProps>`)

A utility function to help create styled objects complemented with Styled System properties. As the function name implies, this function only accepts styles that are in object literal syntax.

```ts
import { styledObject } from '@nawt/styled';

// Basic creation of a styled component with styledObject
export const MyStyledObject = styledObject('div', {
  display: 'flex'
});

// To which after, it can be used like a component
...
  <MyStyledObject>
    This is my styled object.
  </MyStyledObject>
...
```

### Typings

```ts
type TStyledElement =
  | keyof JSX.IntrinsicElements
  | StyledComponent<keyof JSX.IntrinsicElements, any, any, keyof any>;

type TStyledObjectProps = {
  attrs: any;
  compose: styleFn[];
  variants: VariantArgs;
  system: Config;
};
```

---

### **`styledSet`**(config: `TStyledSetConfig`, baseElement: `keyof JSX.IntrinsicElements`)

Similar to `styledObject` with the difference that this utility function creates bulk Styled Components as per the config that you provide.

```ts
import { styledSet } from '@nawt/styled';

export const { P, H1 } = styledSet(
  {
    base: {
      styles: {
        color: 'black'
      },
      element: 'p'
    },
    components: {
      P: {
        lineHeight: '1.2',
        as: 'p'
      },
      H1: {
        lineHeight: '1.3',
        as: 'h1'
      }
    }
  },
  'div'
);
```

### Typings

```ts
type TStyledConfig = Partial<{
  base: {
    styles: CSSObject;
    element: keyof JSX.IntrinsicElements;
    attrs?: any;
    compose?: styleFn[];
    variants?: VariantArgs;
    system?: Config;
  };
  components: Record<string, TStyledSetComponent>;
}>;

type TStyledSetComponent = Partial<{
  attrs: any;
  as: keyof JSX.IntrinsicElements;
  compose: styleFn[];
  variants: VariantArgs;
  system: Config;
}> &
  CSSObject;
```
