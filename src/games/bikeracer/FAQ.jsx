import React from "react";

export default function BikeFAQ() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="text-xl font-semibold mb-3">Bike Racer — FAQ</div>
      <div className="space-y-3 text-sm leading-6">
        <section>
          <h3 className="font-medium">How do I accelerate, jump, and tilt?</h3>
          <p>Press ↑ to accelerate, Space to jump when on the ground, and use ←/→ to tilt in air. Press P to pause.</p>
        </section>
        <section>
          <h3 className="font-medium">What do Single Player and Multiplayer do?</h3>
          <p>Single Player is a time trial to the finish flag. Multiplayer is a hot‑seat mode: Player 1 runs, then Player 2 runs on the same course; fastest time wins.</p>
        </section>
        <section>
          <h3 className="font-medium">What are Versions/Variations?</h3>
          <p>They let you pick levels and tweak physics (gravity, top speed, power, wheelbase). Use it to create your favorite handling profile and course length.</p>
        </section>
        <section>
          <h3 className="font-medium">Why doesn’t the global leaderboard update?</h3>
          <p>This demo stores best times locally in your browser. We can add a backend later for global scores.</p>
        </section>
      </div>
    </div>
  );
}