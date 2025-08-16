import React, { useState } from "react";
import BikeRacerGame from "./BikeRacerGame";
import { LEVELS } from "./levels";

export default function Variations() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [gravity, setGravity] = useState(0.45);
  const [speedCap, setSpeedCap] = useState(12);
  const [power, setPower] = useState(0.12);
  const [wheelBase, setWheelBase] = useState(60);

  const lvl = LEVELS[levelIdx];

  return (
    <div className="p-3">
      <div className="grid sm:grid-cols-2 gap-4 mb-3">
        <div className="rounded border p-3">
          <div className="font-medium mb-2">Versions / Variations</div>
          <div className="flex flex-col gap-2 text-sm">
            <label>Level
              <select className="border rounded px-2 py-1 ml-2" value={levelIdx} onChange={(e)=> setLevelIdx(parseInt(e.target.value))}>
                {LEVELS.map((l,i)=> <option key={l.name} value={i}>{l.name} ({l.finishX}m)</option>)}
              </select>
            </label>
            <label>Gravity <input type="range" min="0.2" max="1" step="0.01" value={gravity} onChange={(e)=> setGravity(parseFloat(e.target.value))} /></label>
            <label>Top Speed <input type="range" min="8" max="20" step="0.5" value={speedCap} onChange={(e)=> setSpeedCap(parseFloat(e.target.value))} /></label>
            <label>Power <input type="range" min="0.05" max="0.3" step="0.005" value={power} onChange={(e)=> setPower(parseFloat(e.target.value))} /></label>
            <label>Wheelbase <input type="range" min="40" max="90" step="1" value={wheelBase} onChange={(e)=> setWheelBase(parseFloat(e.target.value))} /></label>
          </div>
          <div className="text-xs opacity-70 mt-2">Tip: Adjust sliders and test in real time.</div>
        </div>
        <div className="rounded border p-3">
          <div className="font-medium mb-2">Preset Info</div>
          <div className="text-sm">
            <div>Selected: <b>{lvl.name}</b></div>
            <div>Finish: {lvl.finishX}m</div>
            <div>Seed: {lvl.seed}</div>
          </div>
        </div>
      </div>

      <BikeRacerGame
        key={`${levelIdx}-${gravity}-${speedCap}-${power}-${wheelBase}`}
        finishX={lvl.finishX}
        seed={lvl.seed}
        gravity={gravity}
        speedCap={speedCap}
        power={power}
        wheelBase={wheelBase}
        title="Bike Racer — Variations Test"
      />
    </div>
  );
}