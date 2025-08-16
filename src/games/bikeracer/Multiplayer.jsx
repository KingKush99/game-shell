import React, { useEffect, useRef, useState } from "react";
import { BikeRacerEngine } from "./engine";
import "./bikeracer.css";

export default function MultiplayerHotseat() {
  const [phase, setPhase] = useState("p1");
  const [seed] = useState(()=> Math.floor(Math.random()*1e9));
  const [p1time, setP1time] = useState(null);
  const [p2time, setP2time] = useState(null);

  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(()=>{
    startRun();
    return ()=> engineRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, seed]);

  function startRun(){
    const canvas = canvasRef.current;
    engineRef.current?.destroy();
    const engine = new BikeRacerEngine(canvas, {
      seed,
      finishX: 5000,
      onFinish: (t)=> {
        if (phase === "p1") setP1time(t);
        else if (phase === "p2") setP2time(t);
      }
    });
    engineRef.current = engine;
    engine.start();
  }

  function nextPhase(){
    if (phase === "p1") setPhase("p2");
    else if (phase === "p2") setPhase("done");
  }

  function resetMatch(){
    setP1time(null); setP2time(null);
    setPhase("p1");
  }

  const winner = (p1time!=null && p2time!=null)
    ? (p1time < p2time ? "Player 1" : (p2time < p1time ? "Player 2" : "Tie"))
    : null;

  return (
    <div className="bikeracer-wrap p-3">
      <div className="bikeracer-toolbar">
        <div className="font-medium">Multiplayer — Hot-seat Time Trial</div>
        <button onClick={()=>engineRef.current?.start()} className="px-3 py-1 rounded bg-black text-white">Restart Run</button>
        <button onClick={nextPhase} className="px-3 py-1 rounded border">Next Phase</button>
        <button onClick={resetMatch} className="px-3 py-1 rounded border">New Match (new seed)</button>
        <div className="text-sm opacity-80">Seed: {seed}</div>
      </div>
      <canvas ref={canvasRef} className="bikeracer-canvas" />
      <div className="mt-2 text-sm">
        <div>Phase: <b>{phase}</b></div>
        <div>Player 1: {p1time ? `${p1time.toFixed(2)}s` : "-"}</div>
        <div>Player 2: {p2time ? `${p2time.toFixed(2)}s` : "-"}</div>
        {winner && <div className="mt-2 rounded bg-blue-50 border border-blue-200 p-2">Winner: <b>{winner}</b></div>}
      </div>
    </div>
  );
}