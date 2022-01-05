export enum BoundaryTypes {
  'width' = 'width',
  'height' = 'height',
  'ratio' = 'ratio',
  'res' = 'res'
}

export const boundaryTypes = {
  [BoundaryTypes.width]: BoundaryTypes.width,
  [BoundaryTypes.height]: BoundaryTypes.height,
  [BoundaryTypes.ratio]: 'aspect-ratio',
  [BoundaryTypes.res]: 'resolution'
};

export type MediaBoundaries = {
  [key in BoundaryTypes]: string;
};
