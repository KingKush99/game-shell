import React from 'react';

const CasualSection = ({ language }) => {
  const casualGames = [
    { id: 1, name: "Quick Race", mode: "Race", players: 124, maxPlayers: 8 },
    { id: 2, name: "Team Battle", mode: "Battle", players: 67, maxPlayers: 10 },
    { id: 3, name: "Free Roam", mode: "Explore", players: 89, maxPlayers: 20 },
    { id: 4, name: "Practice Arena", mode: "Training", players: 45, maxPlayers: 4 }
  ];

  const handleJoinCasualGame = (gameId) => {
    alert(`Joining casual game #${gameId}! Good luck! 🎮`);
  };

  const handleHostCasualGame = () => {
    alert("Hosting new casual game room! Share the code with friends. 🏠");
  };

  return (
    <div className="casual-section">
      <h3>🎮 Casual Multiplayer</h3>
      <p className="section-description">Play for fun! No entry requirements or fees.</p>

      <div className="casual-games-list">
        {casualGames.map((game) => (
          <div key={game.id} className="game-card casual">
            <div className="game-info">
              <h4>{game.name}</h4>
              <span className="game-mode">{game.mode}</span>
              <span className="player-count">{game.players}/{game.maxPlayers} players</span>
            </div>
            <button
              onClick={() => handleJoinCasualGame(game.id)}
              className="join-casual-btn"
            >
              Join Game
            </button>
          </div>
        ))}
      </div>

      <div className="host-game-section">
        <button onClick={handleHostCasualGame} className="host-game-btn">
          Host Game
        </button>
      </div>

      <div className="casual-info">
        <h4>Free to Play</h4>
        <ul>
          <li>Practice and improve your skills</li>
          <li>Meet other players</li>
          <li>No entry fees or requirements</li>
        </ul>
      </div>
    </div>
  );
};

export default CasualSection;
