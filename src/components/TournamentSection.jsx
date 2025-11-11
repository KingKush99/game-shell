import React from 'react';

const TournamentSection = ({ language, userSubscriptions }) => {
  const tournaments = [
    {
      id: 1,
      name: "🏆 Championship Series",
      prize: 10000,
      entryFee: 500,
      players: 32,
      maxPlayers: 32,
      status: "Starting in 2 hours"
    },
    {
      id: 2,
      name: "⚡ Daily Sprint",
      prize: 2500,
      entryFee: 100,
      players: 15,
      maxPlayers: 16,
      status: "Starting in 30 min"
    },
    {
      id: 3,
      name: "🎯 Weekend Eliminator",
      prize: 5000,
      entryFee: 250,
      players: 8,
      maxPlayers: 64,
      status: "Registration open"
    }
  ];

  const handleJoinTournament = (tournament) => {
    if (!userSubscriptions.youtube || !userSubscriptions.instagram) {
      alert('You must subscribe to YouTube AND follow us on Instagram to join tournaments!');
      return;
    }

    if (tournament.entryFee > 1250) { // Example coin balance check
      alert(`You need ${tournament.entryFee} coins to enter!`);
      return;
    }

    alert(`Successfully registered for ${tournament.name}! Good luck! 🏆`);
  };

  return (
    <div className="tournament-section">
      <h3>🏆 Championship Tournaments</h3>

      <div className="tournament-requirements">
        <h4>Entry Requirements:</h4>
        <div className={`requirement-item ${userSubscriptions.youtube ? 'met' : 'unmet'}`}>
          ✓ Subscribe to YouTube
        </div>
        <div className={`requirement-item ${userSubscriptions.instagram ? 'met' : 'unmet'}`}>
          ✓ Follow on Instagram
        </div>
      </div>

      <div className="tournament-list">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="tournament-card">
            <div className="tournament-header">
              <h4>{tournament.name}</h4>
              <span className="prize-pool">Prize: {tournament.prize.toLocaleString()} coins</span>
            </div>

            <div className="tournament-details">
              <p>Players: {tournament.players}/{tournament.maxPlayers}</p>
              <p>Entry Fee: {tournament.entryFee} coins</p>
              <p>Status: {tournament.status}</p>
            </div>

            <button
              onClick={() => handleJoinTournament(tournament)}
              disabled={!userSubscriptions.youtube || !userSubscriptions.instagram}
              className="join-tournament-btn"
            >
              Join Tournament
            </button>
          </div>
        ))}
      </div>

      <div className="tournament-info">
        <h4>How Tournaments Work</h4>
        <ul>
          <li>Single elimination bracket format</li>
          <li>Finals streamed live on YouTube</li>
          <li>Winners receive coins instantly</li>
          <li>Leaderboard points awarded based on placement</li>
        </ul>
      </div>
    </div>
  );
};

export default TournamentSection;
