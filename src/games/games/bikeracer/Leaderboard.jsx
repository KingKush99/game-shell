import React, { useEffect, useState } from "react";
import { LEVELS } from "./levels";

export default function Leaderboard() {
  const [bestTimes, setBestTimes] = useState({});

  useEffect(()=>{
    try {
      const raw = localStorage.getItem("bikeracer_best_times");
      setBestTimes(raw ? JSON.parse(raw) : {});
    } catch { setBestTimes({}); }
  }, []);

  const rows = LEVELS.map(l => ({
    level: l.name,
    time: bestTimes[`${l.finishX}-${l.seed}`] ?? null
  })).sort((a,b)=> (a.time ?? Infinity) - (b.time ?? Infinity));

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="text-xl font-semibold mb-3">Leaderboard (Local)</div>
      <div className="rounded border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">Course</th>
              <th className="text-left p-2">Best Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i)=> (
              <tr key={i} className="odd:bg-white even:bg-slate-50">
                <td className="p-2">{i+1}</td>
                <td className="p-2">{LEVELS[i].name}</td>
                <td className="p-2">{r.time ? `${r.time.toFixed(2)}s` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-xs opacity-70 mt-2">Note: This leaderboard is per-browser using localStorage. For a global board, we can wire an API later.</div>
    </div>
  );
}