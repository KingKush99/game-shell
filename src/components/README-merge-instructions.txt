
This zip contains ONLY the updated/added components, not the whole repo.

Place each file into your existing Vite/React project using the same paths:

  src/components/EnhancedMiniSlots.jsx
  src/components/EnhancedMiniSlots.css
  src/components/ExactOdometer.jsx
  src/components/ExactOdometer.css
  src/components/SinglePlayerLobby.jsx
  src/components/SinglePlayerLobby.css
  src/components/CampaignMode.jsx
  src/components/CampaignMode.css

Notes:

1. Mini‑slots:
   - App.jsx should already import EnhancedMiniSlots and toggle it with the
     bottom‑right circular 🎰 button. This version makes it a bottom‑right
     modal, with:
       * PUSH circular button centered on bottom
       * Left drop‑up for bet: 10 / 25 / 50 / 100 / 500
       * Right drop‑up for reels: 3–6
       * Red ❌ in top‑right, no background, not rotating
       * Double‑click on the dimmed backdrop closes the modal.

2. Odometer:
   - ExactOdometer now renders white digits, with a horizontal white bar behind
     them, and the LAST digit gets a red background (like your reference image).
   - You already import ExactOdometer in App.jsx for ONLINE NOW and ALL TIME
     VISITORS; just replace your existing component files with these.

3. Single Player Lobby:
   - Provides difficulty picker + 10 characters.
   - First 3 characters are FREE, then costs are:
       #4 = 100  #5 = 200  #6 = 400  #7 = 800
       #8 = 1600 #9 = 3200 #10 = 6400 coins
   - App.jsx already renders <SinglePlayerLobby ...> when
     showSinglePlayerLobby is true. This component reports
     { difficulty, character, characterIndex, characterCost }
     via onStartGame.

4. Campaign Mode:
   - Shows a vertical "path" with 10 city nodes on the left,
     and a big table‑style preview on the right (inspired by
     Governor of Poker 3 and your second screenshot).
   - App.jsx already renders <CampaignMode ...> when
     showCampaignMode is true. Replace your existing files with these
     and you get the new layout.

If you drop these over your existing repo, keep your current
App.jsx, App.css, translations, etc. exactly as they are.
