# @artefakt/flex

A flex-grid Styled Component with the option to define the number of columns for your flex grid.

### **Install**

```sh
# For NPM
npm install @artefakt/flex

# For Yarn
yarn add @artefakt/flex

# For PNPM
pnpm install @artefakt/flex
```

## **API**

### <**`FlexRow`** \/>

Typically used in lieu with FlexCol, you can also reverse the order of items with the `isReverse` prop with FlexRow.

| Parameter   | Default Value | Type      | Description                           |
| :---------- | :------------ | :-------- | :------------------------------------ |
| `isReverse` | `false`       | `boolean` | Defines whether to reverse item order |

```ts
import { FlexRow, FlexCol } from '@artefakt/flex';

// Typical FlexRow usage
export const MyFlexGrid = () => {
  return (
    <FlexRow>
      <FlexCol columnSize={[12, 6, 4]}>Column 1</FlexCol>
      <FlexCol columnSize={[12, 6, 4]}>Column 2</FlexCol>
      <FlexCol columnSize={[12, 6, 4]}>Column 3</FlexCol>
    </FlexRow>
  );
};

// FlexRow usage with 'isReverse'
export const MyReversedFlexGrid = () => {
  return (
    <FlexRow isReverse={true}>
      <FlexCol columnSize={[12, 6, 4]}>Column 1</FlexCol>
      <FlexCol columnSize={[12, 6, 4]}>Column 2</FlexCol>
      <FlexCol columnSize={[12, 6, 4]}>Column 3</FlexCol>
    </FlexRow>
  );
};
```

---

### <**`FlexCol`** \/>

Staple flex column component where you can define the following:

| Parameter      | Default Value | Type                 | Description                                                                          |
| :------------- | :------------ | :------------------- | :----------------------------------------------------------------------------------- |
| `totalColumns` | `12`          | `number`             | Defines the total number of columns as the basis for the calculation of 'columnSize' |
| `columnSize`   | `n/a`         | `number \| number[]` | Defines the size of the column                                                       |
| `offset`       | `n/a`         | `number \| number[]` | Defines the size of the column                                                       |
| `gutterWidth`  | `n/a`         | `number \| number[]` | Defines the left/right padding of a column                                           |
| `gap`          | `n/a`         | `number`             | Defines the gap value of a column                                                    |

Typical usage is as follows

```ts
import { FlexRow, FlexCol } from '@artefakt/flex';

// Typical usage of FlexCol
export const MyFlexGrid = () => {
  return (
    <FlexRow>
      <FlexCol columnSize={[12, 6, 4]}>Column 1</FlexCol>
      <FlexCol columnSize={[12, 6, 4]}>Column 2</FlexCol>
      <FlexCol columnSize={[12, 6, 4]}>Column 3</FlexCol>
    </FlexRow>
  );
};

// Usage of FlexColwith offset
export const MyOffsetFlexGrid = () => {
  return (
    <FlexRow>
      <FlexCol columnSize={[1, 2, 3]} offset={[11, 10, 9]}>
        Column 1
      </FlexCol>

      <FlexCol columnSize={[1, 2, 3]} offset={[11, 10, 9]}>
        Column 2
      </FlexCol>

      <FlexCol columnSize={[1, 2, 3]} offset={[11, 10, 9]}>
        Column 3
      </FlexCol>
    </FlexRow>
  );
};
```

A custom total columns can be used as the basis for columnSize. This is to allow for a bit more flexibility to accommodate designs. Currently, it is required to create a wrapper for it for the sake of not repeating it everytime you need it.

```ts
import { FlexRow, FlexCol } from '@artefakt/flex';

// Usage with totalColumns property, say a total of 16 columns as basis is required
export const Col = ({ children, totalColumns = 16 }) => {
  return <FlexCol totalColumns={totalColumns}>{children}</FlexCol>;
};

// Then Col can be used as per usual
export const MyFlexGrid = () => {
  return (
    <FlexRow>
      <Col columnSize={[16, 8, 4]}>Column 1</Col>
      <Col columnSize={[16, 8, 4]}>Column 2</Col>
      <Col columnSize={[16, 8, 4]}>Column 3</Col>
    </FlexRow>
  );
};
```
