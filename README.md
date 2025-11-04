# Interactive Children's Book App

An iOS interactive book application for children aged 0-6 with realistic page-turning animations, sound effects, and dual reading modes.

## Features

- **Realistic Page-Turning**: Smooth 3D page flip animations with swipe gestures
- **Page Turn Sound Effects**: Audio feedback when turning pages
- **Auto-Read Mode**: Text-to-speech narration that automatically advances pages
- **Self-Reading Mode**: Let children explore at their own pace
- **Book-Like UI**: Designed to feel like reading a real book with proper page spreads
- **Landscape Orientation**: Optimized for tablets and phones in landscape mode

## Technology Stack

- **React Native** with Expo
- **react-native-reanimated**: Smooth page-turning animations
- **react-native-gesture-handler**: Touch gestures for page turning
- **expo-av**: Audio playback for page turn sounds
- **expo-speech**: Text-to-speech for auto-read mode

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

### iOS (Mac required)
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

### Using Expo Go App
```bash
npm start
```
Then scan the QR code with Expo Go app on your device.

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Book.js          # Main book component with gestures and reading modes
│   │   └── BookPage.js      # Individual page component
│   ├── data/
│   │   └── bookData.js      # Story content (customize your stories here)
│   └── assets/
│       └── sounds/          # Page turn sound effects
├── App.js                   # Main app entry point
├── app.json                 # Expo configuration
└── package.json
```

## Customizing Content

To add your own stories, edit `src/data/bookData.js`:

```javascript
export const bookStory = [
  {
    id: 1,
    text: "Your story title",
    content: "Your story content...",
    backgroundColor: "#FFF8E7",
    image: "🌟" // Use emojis or update to use image URLs
  },
  // Add more pages...
];
```

## Deployment to Expo

### Option 1: EAS Build (Recommended)

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Login to Expo:
   ```bash
   eas login
   ```

3. Configure the build:
   ```bash
   eas build:configure
   ```

4. Build for iOS:
   ```bash
   eas build --platform ios
   ```

### Option 2: Classic Expo Publish

1. Login to Expo:
   ```bash
   npx expo login
   ```

2. Publish the app:
   ```bash
   npx expo publish
   ```

### Using Access Token

If you have an Expo access token, set it as an environment variable:

```bash
export EXPO_TOKEN="your-token-here"
```

Then run the build/publish commands. Note: Make sure your token is valid and has the necessary permissions.

## iOS-Specific Configuration

The app is configured in `app.json` with:
- Landscape orientation (better for book reading)
- Tablet support
- Audio background modes for continuous playback
- Bundle identifier: `com.childrenbook.interactive`

## Features Overview

### Auto-Read Mode
- Activates text-to-speech for the current page
- Automatically turns to the next page after reading
- Can be paused at any time

### Self-Reading Mode
- Default mode where children control page turning
- Swipe left/right to turn pages
- Tap navigation buttons to move between pages

### Page Turning Animation
- 3D flip effect simulating real book pages
- Smooth transitions using react-native-reanimated
- Visual depth with shadows and spine effects

## Known Issues & Token Error

If you encounter a "Forbidden" error when deploying:
- Verify your Expo access token is valid
- Check token permissions in your Expo dashboard
- Try generating a new access token at: https://expo.dev/accounts/[username]/settings/access-tokens
- Ensure you're logged into the correct Expo account

## Future Enhancements

- Add custom illustrations/images instead of emojis
- Multiple story books library
- Parental controls
- Progress tracking
- Interactive elements (tap to reveal animations)
- Background music
- Multiple language support

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
