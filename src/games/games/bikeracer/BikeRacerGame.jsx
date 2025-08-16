import React, { useEffect, useRef, useState } from "react";
import "./bikeracer.css";
import { BikeRacerEngine } from "./engine";

export default function BikeRacerGame({
  finishX = 5000,
  seed = 12345,
  gravity = 0.45,
  speedCap = 12,
  power = 0.12,
  wheelBase = 60,
  title = "Bike Racer — Single Player",
}) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [lastFinish, setLastFinish] = useState(null);

  useEffect(()=>{
    const canvas = canvasRef.current;
    const engine = new BikeRacerEngine(canvas, {
      finishX, gravity, speedCap, power, wheelBase, seed,
      onFinish: (time)=> {
        setLastFinish(time);
        try {
          const key = "bikeracer_best_times";
          const raw = localStorage.getItem(key);
          const map = raw ? JSON.parse(raw) : {};
          const lvlName = `${finishX}-${seed}`;
          if (!map[lvlName] || time < map[lvlName]) {
            map[lvlName] = time;
            localStorage.setItem(key, JSON.stringify(map));
          }
        } catch {}
      }
    });
    engineRef.current = engine;
    engine.start();
    return ()=> engine.destroy();
  }, [finishX, gravity, speedCap, power, wheelBase, seed]);

  const restart = ()=> engineRef.current?.start();

  return (
    <div className="bikeracer-wrap p-3">
      <div className="bikeracer-toolbar">
        <div className="font-medium">{title}</div>
        <button onClick={restart} className="px-3 py-1 rounded bg-black text-white">Restart</button>
        <div className="bikeracer-help text-sm opacity-80">Controls: ↑ accelerate, ←/→ tilt, Space jump, P pause</div>
      </div>
      <canvas ref={canvasRef} className="bikeracer-canvas" />
      {lastFinish != null && (
        <div className="mt-2 rounded bg-green-50 border border-green-200 p-3 text-green-800">
          Finished in <b>{lastFinish.toFixed(2)}s</b> — press Restart to try again.
        </div>
      )}
    </div>
  );
}