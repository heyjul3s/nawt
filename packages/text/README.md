# @nawt/text

A text styled component with built-in props to specify overflow handling and also truncation via number of lines.

### **Install**

```sh
# For NPM
npm install @nawt/text

# For Yarn
yarn add @nawt/text

# For PNPM
pnpm install @nawt/text
```

---

## **API**

### <**Text** \/>

Text component with built-in text truncation capabilities. By default, renders as a `p` tag.

| Parameter      | Default Value | Type               | Description                                                   |
| :------------- | :------------ | :----------------- | :------------------------------------------------------------ |
| `trim`         | `n/a`         | `boolean`          | Defines whether or not to truncate text.                      |
| `noOfLines`    | `n/a`         | `number`           | Defines the allowed number of lines of text before truncating |
| `textOverflow` | `ellipsis`    | `clip \| ellipsis` | Defines what how hidden overflow content is presented         |

```ts
import { Text } from '@nawt/text';

// Regular text
export function MyText() {
  return (
    <Text>
      In fermentum consequat nulla, vitae consequat ante pharetra quis.
    </Text>
  );
}

// Single line text truncation
export function MyTrimmedText() {
  return (
    <Text trim={true}>
      In fermentum consequat nulla, vitae consequat ante pharetra quis.
    </Text>
  );
}

// Constrain multi-line text by 2 lines
export function MyLimitedLinesText() {
  return (
    <Text noOfLines={2}>
      In fermentum consequat nulla, vitae consequat ante pharetra quis. Maecenas
      imperdiet sit amet sapien et viverra. Vivamus tempor lobortis dolor, sed
      hendrerit odio tempor sed. Pellentesque tempor pretium orci vel maximus.
      Etiam eu tortor a nunc efficitur tincidunt. Nullam molestie tristique
      nulla. Vivamus semper, ipsum dapibus venenatis molestie, justo risus
      accumsan dolor, ut pulvinar mauris tortor non elit. Integer pulvinar ut
      eros et laoreet. Nullam tempus augue vitae auctor pulvinar. Praesent sit
      amet porta sem, non dignissim elit. Sed turpis nisi, dictum ut elit at,
      pretium vestibulum arcu. Sed lacinia congue nibh vitae semper. In
      efficitur, quam eleifend vulputate malesuada, diam mauris tincidunt quam,
      ut iaculis leo nisl vel leo. Mauris sed orci et lacus semper rutrum. Proin
      eu nunc eget sapien gravida aliquam eu vitae sapien.
    </Text>
  );
}
```
