#!/bin/bash

# Game Shell Template Creator
# This script creates a new game project from the game shell template

if [ $# -eq 0 ]; then
    echo "Usage: ./create-new-game.sh <new-game-name>"
    echo "Example: ./create-new-game.sh my-awesome-game"
    exit 1
fi

NEW_GAME_NAME=$1
CURRENT_DIR=$(pwd)
PARENT_DIR=$(dirname "$CURRENT_DIR")
NEW_GAME_DIR="$PARENT_DIR/$NEW_GAME_NAME"

echo "Creating new game project: $NEW_GAME_NAME"

# Check if directory already exists
if [ -d "$NEW_GAME_DIR" ]; then
    echo "Error: Directory $NEW_GAME_DIR already exists!"
    exit 1
fi

# Copy the entire game-shell directory
echo "Copying template files..."
cp -r "$CURRENT_DIR" "$NEW_GAME_DIR"

# Navigate to new directory
cd "$NEW_GAME_DIR"

# Update package.json with new name
echo "Updating package.json..."
sed -i "s/\"name\": \"game-shell\"/\"name\": \"$NEW_GAME_NAME\"/" package.json

# Update index.html title
echo "Updating HTML title..."
sed -i "s/<title>Game Shell - Reusable Menu Template<\/title>/<title>$NEW_GAME_NAME<\/title>/" index.html

# Update gameConfig.js with new title
echo "Updating game configuration..."
sed -i "s/title: \"Game Shell\"/title: \"$NEW_GAME_NAME\"/" src/gameConfig.js
sed -i "s/subtitle: \"Reusable 16-Button Menu Template\"/subtitle: \"Choose Your Game Option\"/" src/gameConfig.js

# Remove the creation script from the new project
rm create-new-game.sh

# Remove git history if it exists
if [ -d ".git" ]; then
    rm -rf .git
    echo "Removed git history (you can initialize a new repository if needed)"
fi

echo ""
echo "✅ New game project created successfully!"
echo ""
echo "Next steps:"
echo "1. cd $NEW_GAME_DIR"
echo "2. npm install"
echo "3. Edit src/gameConfig.js to customize your buttons"
echo "4. npm run dev to start development"
echo ""
echo "Happy coding! 🎮"

