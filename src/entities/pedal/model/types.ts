export type PedalCategory = | 'distortion' | 'overdrive' | 'fuzz'
    | 'delay' | 'reverb'
    | 'chorus' | 'flanger' | 'phaser'
    | 'wah' | 'compressor' | 'eq' | 'tuner'
    | 'power' | 'other';

export type PedalEnclosure = | 'boss_compact'   // 7.3 × 12.9 cm
    | 'mxr_box'        // 6.5 × 11.7 cm
    | '125b'           // Hammond standard
    | 'mini'
    | 'large'          // Strymon multi
    | 'wah'
    | 'custom';

export interface Knob {
    name: string;
}

/** Pedal from the catalog (database or custom entry) */
export interface Pedal {
    id: string;
    name: string;
    brand: string;
    category: PedalCategory;
    enclosure: PedalEnclosure;
    width_cm: number;
    depth_cm: number;
    height_cm: number;
    weight_g: number;
    voltage: 9 | 12 | 18;
    current_ma: number;
    connector: 'center_negative' | 'center_positive';
    true_bypass: boolean;
    color: string;
    knobs: string[];
    /** true if the user entered it manually */
    isCustom?: boolean;
    /** Photo URL (Reverb) – fallback is PedalGraphic SVG */
    imageUrl?: string;
}

export type Rotation = 0 | 90 | 180 | 270;

/** Pedal instance placed on the board */
export interface BoardPedal extends Pedal {
    /** unique instance ID (the same pedal can appear on the board 2×) */
    instanceId: string;
    /** position of the top-left corner IN CENTIMETERS, relative to the usable board area */
    position: { x: number; y: number };
    rotation: Rotation;
}

/** Pedal footprint on the board – dimensions depending on rotation */
export interface Footprint {
    x: number;
    y: number;
    w: number;
    d: number;
}