# Game Shell Template - Complete Usage Guide

## Overview

This is a professional, reusable React application template designed specifically for game applications that need a consistent 16-button main menu interface. The template provides flexible layout options and easy customization capabilities.

## Key Features Delivered

✅ **16 Interactive Buttons** - Fully functional button grid
✅ **3 Layout Options** - 1, 2, or 4 column layouts with smooth switching
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
✅ **Easy Customization** - Configuration-based button setup
✅ **Modern UI** - Built with Tailwind CSS and shadcn/ui components
✅ **Reusable Template** - Quick project creation script included
✅ **Professional Documentation** - Complete setup and usage instructions

## What You Get

### Core Files
- `src/App.jsx` - Main application component with layout logic
- `src/gameConfig.js` - Easy-to-edit configuration file for buttons and actions
- `src/App.css` - Styling with Tailwind CSS integration
- `README.md` - Comprehensive documentation
- `create-new-game.sh` - Script to create new projects from this template

### Layout System
The template supports three layout modes:
1. **1 Column** - Vertical stack (perfect for mobile or simple navigation)
2. **2 Columns** - Balanced layout (ideal for tablets)
3. **4 Columns** - Compact grid (great for desktop)

Users can switch between layouts using the control buttons at the top of the interface.

## Quick Customization

### Method 1: Edit Configuration File (Recommended)
Edit `src/gameConfig.js` to customize:
- Application title and subtitle
- Button labels and descriptions
- Button actions (what happens when clicked)
- Default layout preference
- UI settings (colors, spacing, etc.)

### Method 2: Create New Project
Use the included script to create a new project:
```bash
./create-new-game.sh my-new-game
```

This automatically:
- Copies all template files
- Updates project name in package.json
- Updates HTML title
- Resets git history
- Provides setup instructions

## Example Customizations

### Math Quiz Game
```javascript
// In gameConfig.js
export const gameConfig = {
  title: "Math Quiz Challenge",
  subtitle: "Choose Your Difficulty Level",
  buttons: [
    { id: 1, label: "Addition Easy", action: "addEasy" },
    { id: 2, label: "Addition Hard", action: "addHard" },
    { id: 3, label: "Subtraction Easy", action: "subEasy" },
    // ... more buttons
  ],
  actions: {
    addEasy: () => startMathGame('addition', 'easy'),
    addHard: () => startMathGame('addition', 'hard'),
    // ... more actions
  }
}
```

### Card Game Menu
```javascript
// In gameConfig.js
export const gameConfig = {
  title: "Card Game Collection",
  subtitle: "Select Your Game",
  buttons: [
    { id: 1, label: "Poker", action: "poker" },
    { id: 2, label: "Blackjack", action: "blackjack" },
    { id: 3, label: "Solitaire", action: "solitaire" },
    // ... more buttons
  ]
}
```

## Technical Specifications

- **Framework**: React 18 with Vite build system
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React icon library
- **State Management**: React useState hooks
- **Responsive**: Mobile-first responsive design
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## File Structure
```
game-shell/
├── public/                    # Static assets
├── src/
│   ├── components/ui/         # shadcn/ui components
│   ├── App.jsx               # Main application component
│   ├── App.css               # Application styles
│   ├── gameConfig.js         # Configuration file (CUSTOMIZE THIS)
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles
├── README.md                 # Detailed documentation
├── TEMPLATE_GUIDE.md         # This guide
├── create-new-game.sh        # Project creation script
├── package.json              # Dependencies and scripts
└── vite.config.js            # Build configuration
```

## Development Workflow

1. **Initial Setup**
   ```bash
   npm install
   npm run dev
   ```

2. **Customize for Your Game**
   - Edit `src/gameConfig.js`
   - Test in browser at http://localhost:5173
   - Add your game logic

3. **Build for Production**
   ```bash
   npm run build
   ```

## Consistency Features

The template maintains consistency across projects through:
- **Standardized Layout**: Same 16-button grid structure
- **Unified Styling**: Consistent color scheme and typography
- **Reusable Components**: Same UI components across all projects
- **Configuration System**: Centralized customization approach

## Future Enhancements

The template is designed to be easily extended with:
- Additional layout options (3 columns, 6 columns, etc.)
- Animation effects and transitions
- Theme switching (dark/light mode)
- Sound effects for button interactions
- Custom button icons or images

## Support

This template includes:
- Complete documentation
- Example configurations
- Error handling
- Responsive design
- Modern development practices

Perfect for creating consistent game interfaces while allowing easy customization for different game rules and content.

