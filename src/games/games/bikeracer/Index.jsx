import React, { useState } from "react";
import BikeRacerGame from "./BikeRacerGame";
import MultiplayerHotseat from "./Multiplayer";
import Variations from "./Variations";
import Leaderboard from "./Leaderboard";
import BikeFAQ from "./FAQ";

// Submenu wrapper so the main shell only adds one new entry: "Bike Racer"
export default function BikeRacerIndex() {
  const [tab, setTab] = useState("single"); // single | multi | variations | leaderboard | faq

  const TabButton = ({id, children}) => (
    <button
      onClick={()=> setTab(id)}
      className={`px-3 py-1 rounded border ${tab===id ? "bg-black text-white" : ""}`}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto p-3">
      <div className="mb-3 flex flex-wrap gap-2">
        <TabButton id="single">Single Player</TabButton>
        <TabButton id="multi">Multiplayer</TabButton>
        <TabButton id="variations">Versions / Variations</TabButton>
        <TabButton id="leaderboard">Leaderboard</TabButton>
        <TabButton id="faq">FAQ</TabButton>
      </div>

      {tab === "single" && <BikeRacerGame />}
      {tab === "multi" && <MultiplayerHotseat />}
      {tab === "variations" && <Variations />}
      {tab === "leaderboard" && <Leaderboard />}
      {tab === "faq" && <BikeFAQ />}
    </div>
  );
}