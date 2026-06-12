export type { Pedal, BoardPedal, PedalCategory, PedalEnclosure, Rotation, Footprint } from './model/types';
export { usePedalStore } from './model/pedalStore';
export { PEDALS, CATEGORY_LABELS } from './data/pedals';
export { getFootprint, overlaps, hasCollision, isInsideBoard, getSpaceUsage } from './lib/collisionUtils';