import { usePedalStore, PEDALS } from '@/entities/pedal';

function App() {
  const { boardPedals, addPedal, rotatePedal } = usePedalStore();

  return (
    <div className="p-8 space-y-4">
      <button
        className="bg-orange-500 text-white px-4 py-2 rounded"
        onClick={() => addPedal(PEDALS[0], { x: 2, y: 2 })}
      >
        Dodaj {PEDALS[0].name}
      </button>
      <ul className="text-sm font-mono">
        {boardPedals.map((p) => (
          <li key={p.instanceId} onClick={() => rotatePedal(p.instanceId)} className="cursor-pointer">
            {p.name} @ ({p.position.x}, {p.position.y}) cm · rot {p.rotation}° {p.instanceId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;