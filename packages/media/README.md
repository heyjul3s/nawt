# @nawt/media

A media query utility for Styled Components. This was created to introduce some programming operators into the mix and also an attempt to make writing media queries just a little bit less tedious for Styled Components.

### **Install**

```sh
# For NPM
npm install @nawt/media

# For Yarn
yarn add @nawt/media

# For PNPM
pnpm install @nawt/media
```

---

## **API**

### **`mq`**(query: `string`, mediaType: `TMediaTypes`)

Primary function to help in writing styles with media queries.

```ts
import { mq } from '@nawt/media';
import styled from 'styled-components';

// Via string literal styling
export const Button = styled.button`
  display: flex;
  background: red;

  ${mq('width >= 1200px')`
    display: none;
  `}
`;
```

For range based media queries, below is an example of how to create those types of queries.

```ts
// for min queries, below will return a string '@media (min-width: 768px)
mq('width >= 768px');

// for max queries, below will return a string '@media (max-width: 768px)'
mq('width <= 768px');

// for in between queries, below will return a string '@media (min-width: 468px) and (max-width: 768px)'
mq('480px >= width <= 768px');

// Or for some reason, it has to be a specific value, this example will return '@media (resolution: 300dpi)'
mq('res == 300dpi');
```

Apart from the typical min/max queries, other types of media queries are also available.

```ts
// To concatenate queries, you can use the '&&' operator. Below will return a string '@media (orientation: landscape) and (min-height: 480px)'
mq('landscape && height >= 480px');

// For "or" based queries, you can use the '||' operator. Below will return a string '@media (min-height: 680px), (orientation: portrait)'
mq('height >= 680px || portrait');

// Parentheses are also allowed if you wish to add them
mq('(height >= 680px) || (portrait)');

// Definition of media type is also available
mq('(height >= 680px)', 'screen');
```

As you may have noticed from the above example, certain keywords return a certain media query string eg. landscape, portrait, screen, etc. [Here](#keywords-and-operators) is a full list of currently available keywords or scroll down to the **Keywords and Operators** section.

### Typings

```ts
type TMediaTypes = {
  | 'all'
  | 'screen'
  | 'onlyScreen'
  | 'speech'
  | 'onlySpeech'
  | 'print'
  | 'onlyPrint';
}
```

---

### **`mqo`**(query: `string`, styles: `CSSObject`, mediaType: `TMediaTypes`)

An object based version of `mq` with the primary differences being styles will need to be passed as an object and invocation of `mqo` is required to be spread into the styled component object.

```ts
import { mqo } from '@nawt/media';
import styled from 'styled-components';

// Via object styles
export const Button = styled.button(() => ({
  display: 'flex',
  background: 'red',
  ...mqo('width >= 1200px', {
    display: 'none'
  })
}));
```

Query wise, functionally, is exactly the same as `mq` so refer to `mq` above for formulating media queries. Note that for `mqo`, by default the `mediaType` argument is set to `screen`.

### Typings

```ts
type TMediaTypes = {
  | 'all'
  | 'screen'
  | 'onlyScreen'
  | 'speech'
  | 'onlySpeech'
  | 'print'
  | 'onlyPrint';
}
```

---

### **`createMq`**(query: `string`, mediaType?: `TMediaTypes`)

This function accepts a single query string and parses it to a media query string.

```ts
// 'mediaType' param is optional
createMq('width >= 480px'); // returns '@media (min-width: 480px)'

// 'mediaType' param is optional
createMq('width >= 480px', 'screen'); // returns '@media screen and (min-width: 480px)'
```

### Typings

```ts
type TMediaTypes = {
  | 'all'
  | 'screen'
  | 'onlyScreen'
  | 'speech'
  | 'onlySpeech'
  | 'print'
  | 'onlyPrint';
}
```

---

### **`createMqs`**(queries: `TCreateMediaQueries[]`)

This function accepts an array of objects with each describing a media query and returns an object with the parsed media queries in accordance to its assigned keys.

```ts
// Pass in an array of objects. Note property "mediaType" is optional and you can choose not to declare it.
createMqs([
  {
    key: 'tablet',
    query: 'width >= 768px',
    mediaType: 'screen'
  },
  {
    key: 'desktop',
    query: 'width >= 1200px',
    mediaType: 'screen'
  }
]);

// This will return an object:
// {
//  tablet: '@media screen and (min-width: 768px)',
//  desktop: '@media screen and (min-width: 1200px)'
// }
```

### Typings

```ts
export type TCreateMediaQueries = {
  key: string;
  query: string;
  mediaType?: TMediaTypes;
};
```

---

## Keywords And Operators

Below is a list of keywords and operators. Take note that "not", "only", "less than" and "more than" operators will be added in the near future including potential new and stable media queries.

### **Logical Operators**

| Key    | Value |
| :----- | :---- |
| `&&`   | `and` |
| `\|\|` | `,`   |

### **Relational Operators**

| Key  | Description                                     |
| :--- | :---------------------------------------------- |
| `>=` | `"more than or equal", denotes a mininum value` |
| `<=` | `"less than or equal", denotes a maximum value` |
| `==` | `"equal", denotes an is equal`                  |

### **Media Types**

| Key          | Value         |
| :----------- | :------------ |
| `all`        | `all`         |
| `screen`     | `screen`      |
| `onlyScreen` | `only screen` |
| `speech`     | `speech`      |
| `onlySpeech` | `only speech` |
| `print`      | `print`       |
| `onlyPrint`  | `only print`  |

### **Media Input**

| Key                | Value                 |
| :----------------- | :-------------------- |
| `anyHover`         | `any-hover: hover`    |
| `anyHoverNone`     | `any-hover: none`     |
| `hover`            | `hover: hover`        |
| `hoverNone`        | `hover: none`         |
| `anyPointerCoarse` | `any-pointer: coarse` |
| `anyPointerFine`   | `any-pointer: fine`   |
| `anyPointerNone`   | `any-pointer: none`   |
| `pointerCoarse`    | `pointer: coarse`     |
| `pointerFine`      | `pointer: fine`       |
| `pointerNone`      | `pointer: none`       |

### **Media Display**

| Key          | Value                    |
| :----------- | :----------------------- |
| `browser`    | `display-mode: browser`  |
| `fullScreen` | `display-mode: browser`  |
| `minUI`      | `display-mode: browser`  |
| `standalone` | `display-mode: browser`  |
| `landscape`  | `orientation: landscape` |
| `portrait`   | `orientation: portrait`  |

## **Media Boundaries**

| Key      | Value          |
| :------- | :------------- |
| `width`  | `width`        |
| `height` | `height`       |
| `ratio`  | `aspect-ratio` |
| `res`    | `resolution`   |

## **Media Accessibility**

| Key                | Value                                   |
| :----------------- | :-------------------------------------- |
| `darkColorScheme`  | `prefers-color-scheme: dark`            |
| `lightColorScheme` | `prefers-color-scheme: light`           |
| `reducedMotion`    | `prefers-reduced-motion: reduce`        |
| `reducedMotionAny` | `prefers-reduced-motion: no-preference` |
