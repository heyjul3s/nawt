# @artefakt/grid

A simple grid Styled Component that allows for easy setting of repeatable columns.

### **Install**

```sh
# For NPM
npm install @artefakt/grid

# For Yarn
yarn add @artefakt/grid

# For PNPM
pnpm install @artefakt/grid
```

## **API**

### <**`Grid`** \/>

The Grid component.

| Parameter      | Default Value | Type                 | Description                                                                                                       |
| :------------- | :------------ | :------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `columnWidth`  | `n/a`         | `string \| string[]` | This will distribute column widths evenly across its immediate children eg. '200px' or ['50px', '100px', '150px'] |
| `columnLength` | `n/a`         | `number \| number[]` | This will distribute item widths automagically via the number of columns you set eg. 3 or [1, 2, 3]               |
| `gap`          | `1em`         | `string \| string[]` | Defines the gap width.                                                                                            |

```ts
import { Grid, GridItem } from '@artefakt/flex';

// With columnWidths
export const MyFlexGrid = () => {
  return (
    <Grid columnWidth={["120px", "210px", "240px"]}>
      <GridItem}>Column 1</GridItem>
      <GridItem}>Column 2</GridItem>
      <GridItem}>Column 3</GridItem>
    </Grid>
  );
};

//  With columnLengths
export const MyFlexGrid = () => {
  return (
    <Grid columnLength={[1, 2, 3]}>
      <GridItem>Column 1</GridItem>
      <GridItem>Column 2</GridItem>
      <GridItem>Column 3</GridItem>
    </Grid>
  );
};

//  With gap
export const MyFlexGrid = () => {
  return (
    <Grid gap="2em">
      <GridItem>Column 1</GridItem>
      <GridItem>Column 2</GridItem>
      <GridItem>Column 3</GridItem>
    </Grid>
  );
};
```

---

### <**`GridItem`** \/>

As its name implies, this is the child component of the Grid component with several system props included. Typical usage is as follows

```ts
import { Grid, GridItem } from '@artefakt/flex';

export const MyFlexGrid = () => {
  return (
    <Grid>
      <GridItem alignItems="center">Column 1</GridItem>
      <GridItem alignItems="center">Column 2</GridItem>
      <GridItem alignItems="center">Column 3</GridItem>
    </Grid>
  );
};
```
