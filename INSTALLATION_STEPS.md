# Installation Steps for Scan Bill Feature

## Step 1: Install Required Packages

Run these commands in your terminal:

```bash
npx expo install expo-camera
npx expo install expo-image-picker
```

## Step 2: Restart Expo Server

After installing the packages, restart your Expo development server:

```bash
# Press Ctrl+C to stop the current server, then:
npx expo start
```

Or if you want to clear cache:

```bash
npx expo start -c
```

## Step 3: Test the Feature

1. Open your app
2. On the Home screen, you'll see three ways to access the Scan Bill screen:
   - Click the purple "Scan a bill" card at the top
   - Click the "Scan Bill" button in the quick actions grid
   - Click the camera icon in the bottom navigation

3. When you first open the Scan Bill screen, it will ask for camera permissions
4. Grant the permissions to use the camera

## Troubleshooting

### If the screen doesn't open:
1. Check the terminal for any error messages
2. Make sure you've installed both packages
3. Restart the Expo server with cache clear: `npx expo start -c`

### If you get "Camera not available" error:
1. Make sure you're testing on a physical device (camera doesn't work in iOS Simulator)
2. For Android Emulator, make sure virtual camera is enabled
3. Check that camera permissions are granted in device settings

### If packages fail to install:
```bash
# Try installing with npm directly:
npm install expo-camera expo-image-picker

# Or with yarn:
yarn add expo-camera expo-image-picker
```

## Testing on Different Platforms

### iOS (Physical Device or Simulator)
- Camera works on physical devices only
- Simulator will show permission denied (this is expected)
- Gallery picker works on both

### Android (Physical Device or Emulator)
- Camera works on both physical devices and emulators
- Make sure emulator has virtual camera enabled
- Gallery picker works on both

### Web
- Camera requires HTTPS or localhost
- Browser will ask for camera permissions
- Gallery picker uses browser file picker

## Current Navigation Setup

The Scan Bill screen is accessible from:
1. **Home Screen** → Purple "Scan a bill" card → ScanBill
2. **Home Screen** → "Scan Bill" quick action button → ScanBill
3. **Bottom Navigation** → Camera icon → ScanBill (if you add it)

All navigation is properly configured and should work once the packages are installed.
