# Game Shell - Reusable 16-Button Menu Template

A flexible and responsive React application template featuring a 16-button main menu with dynamic layout switching capabilities. Perfect for game applications where you need consistent navigation with customizable content.

## Features

- **16 Interactive Buttons**: Pre-configured grid of 16 customizable buttons
- **Flexible Layouts**: Switch between 1, 2, or 4 column layouts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Easy Customization**: Simple configuration system for quick adaptation
- **Reusable Template**: Consistent shell for multiple game projects

## Layout Options

- **1 Column**: Vertical stack layout (ideal for mobile or simple navigation)
- **2 Columns**: Balanced layout (good for tablets or medium screens)
- **4 Columns**: Compact grid layout (perfect for desktop or when space is limited)

## Quick Start

1. **Install Dependencies**
   ```bash
   cd game-shell
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Customize for Your Game**
   - Edit the button configuration in `src/App.jsx`
   - Modify button labels, actions, and styling
   - Add your game-specific logic

## Customization Guide

### Button Configuration

In `src/App.jsx`, find the buttons array and customize it for your specific game:

```javascript
const buttons = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  label: `Your Game Option ${i + 1}`,
  action: () => {
    // Add your custom action here
    console.log(`Button ${i + 1} clicked!`)
    // Navigate to game screen, show modal, etc.
  }
}))
```

### Styling Customization

- **Colors**: Modify the color scheme in `src/App.css`
- **Button Styles**: Adjust button appearance in the Button component props
- **Layout**: Customize spacing and sizing using Tailwind CSS classes

### Adding Game Logic

Replace the placeholder `action` functions with your actual game logic:

```javascript
{
  id: 1,
  label: "Start New Game",
  action: () => startNewGame()
},
{
  id: 2,
  label: "Load Game",
  action: () => showLoadGameDialog()
},
// ... more buttons
```

## Project Structure

```
game-shell/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   └── ui/            # shadcn/ui components
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── README.md              # This documentation
├── package.json           # Dependencies and scripts
└── vite.config.js         # Build configuration
```

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Reusing This Template

1. **Copy the entire `game-shell` directory**
2. **Rename the directory** to your new game name
3. **Update `package.json`** with your new project name
4. **Modify the title** in `index.html`
5. **Customize the buttons** in `src/App.jsx`
6. **Add your game-specific components** and logic

## Technical Details

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React icons
- **State Management**: React useState hooks
- **Responsive**: Mobile-first responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This template is designed to be easily modified and extended. Feel free to:
- Add new layout options
- Enhance the styling
- Add animation effects
- Implement additional features

## License

This template is provided as-is for your game development projects.

