# @nawt/block

A flex-grid Styled Component with the option to define the number of columns for your flex grid.

### **Install**

```sh
# For NPM
npm install @nawt/block

# For Yarn
yarn add @nawt/block

# For PNPM
pnpm install @nawt/block
```

## **API**

### <**`Block`** \/>

Basic Block component which comprises of the following styled-system properties

- background
- border
- color
- display
- flexbox
- grid
- layout
- position
- shadow
- space
- typography

```ts
import { Block } from '@nawt/block';

export const MyBlock = () => {
  return (
    <Block p={5} fontSize="4rem" color="white" bg="red">
      My Block
    </Block>
  );
};
```
