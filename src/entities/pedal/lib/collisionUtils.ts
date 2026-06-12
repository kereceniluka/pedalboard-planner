import type { BoardPedal, Footprint } from '../model/types';

/** Actual dimensions on the board – 90/270° rotation swaps width and depth */
export function getFootprint(pedal: BoardPedal): Footprint {
    const rotated = pedal.rotation === 90 || pedal.rotation === 270;
    return {
        x: pedal.position.x,
        y: pedal.position.y,
        w: rotated ? pedal.depth_cm : pedal.width_cm,
        d: rotated ? pedal.width_cm : pedal.depth_cm,
    };
}

/** AABB overlap test with minimum gap (default 0.5cm for patch cables) */
export function overlaps(a: Footprint, b: Footprint, gap = 0.5): boolean {
    return (
        a.x < b.x + b.w + gap &&
        a.x + a.w + gap > b.x &&
        a.y < b.y + b.d + gap &&
        a.y + a.d + gap > b.y
    );
}

/** Checks candidate position for collisions against all other pedals on the board */
export function hasCollision(
    candidate: Footprint,
    instanceId: string,
    boardPedals: BoardPedal[],
    gap = 0.5
): boolean {
    return boardPedals.some(
        (p) => p.instanceId !== instanceId && overlaps(candidate, getFootprint(p), gap)
    );
}

/** Whether the footprint is within the usable board area */
export function isInsideBoard(
    fp: Footprint,
    usableWidth: number,
    usableDepth: number
): boolean {
    return fp.x >= 0 && fp.y >= 0 && fp.x + fp.w <= usableWidth && fp.y + fp.d <= usableDepth;
}

/** % of usable area occupied – for SpaceIndicator */
export function getSpaceUsage(boardPedals: BoardPedal[], usableArea: number): number {
    if (usableArea <= 0) return 0;
    const used = boardPedals.reduce((sum, p) => {
        const fp = getFootprint(p);
        return sum + fp.w * fp.d;
    }, 0);
    return Math.min(100, Math.round((used / usableArea) * 100));
}