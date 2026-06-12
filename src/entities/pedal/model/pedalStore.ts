import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BoardPedal, Pedal, Rotation } from './types';

interface PedalState {
    boardPedals: BoardPedal[];
    selectedInstanceId: string | null;

    addPedal: (pedal: Pedal, position: { x: number; y: number }) => string;
    removePedal: (instanceId: string) => void;
    updatePosition: (instanceId: string, position: { x: number; y: number }) => void;
    updatePositions: (updates: { instanceId: string; x: number; y: number }[]) => void;
    rotatePedal: (instanceId: string) => void;
    selectPedal: (instanceId: string | null) => void;
    clearBoard: () => void;
}

const NEXT_ROTATION: Record<Rotation, Rotation> = { 0: 90, 90: 180, 180: 270, 270: 0 };

export const usePedalStore = create<PedalState>()(
    persist(
        (set) => ({
            boardPedals: [],
            selectedInstanceId: null,

            addPedal: (pedal, position) => {
                const instanceId = crypto.randomUUID();
                set((s) => ({
                    boardPedals: [...s.boardPedals, { ...pedal, instanceId, position, rotation: 0 }],
                    selectedInstanceId: instanceId,
                }));
                return instanceId;
            },

            removePedal: (instanceId) =>
                set((s) => ({
                    boardPedals: s.boardPedals.filter((p) => p.instanceId !== instanceId),
                    selectedInstanceId:
                        s.selectedInstanceId === instanceId ? null : s.selectedInstanceId,
                })),

            updatePosition: (instanceId, position) =>
                set((s) => ({
                    boardPedals: s.boardPedals.map((p) =>
                        p.instanceId === instanceId ? { ...p, position } : p
                    ),
                })),

            updatePositions: (updates) =>
                set((s) => ({
                    boardPedals: s.boardPedals.map((p) => {
                        const u = updates.find((x) => x.instanceId === p.instanceId);
                        return u ? { ...p, position: { x: u.x, y: u.y } } : p;
                    }),
                })),

            rotatePedal: (instanceId) =>
                set((s) => ({
                    boardPedals: s.boardPedals.map((p) =>
                        p.instanceId === instanceId
                            ? { ...p, rotation: NEXT_ROTATION[p.rotation] }
                            : p
                    ),
                })),

            selectPedal: (instanceId) => set({ selectedInstanceId: instanceId }),
            clearBoard: () => set({ boardPedals: [], selectedInstanceId: null }),
        }),
        { name: 'app:pedals' }
    )
);