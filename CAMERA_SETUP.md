# Camera Setup Instructions

To use the Scan Bill feature, you need to install the following Expo packages:

## Installation

Run these commands in your project directory:

```bash
npx expo install expo-camera
npx expo install expo-image-picker
```

## Permissions

The app will automatically request camera permissions when you open the Scan Bill screen.

### iOS
No additional configuration needed. The app will request permissions at runtime.

### Android
No additional configuration needed. The app will request permissions at runtime.

## Usage

1. Install the packages using the commands above
2. Restart your Expo development server
3. Navigate to the Scan Bill screen from the home screen
4. Grant camera permissions when prompted
5. Use the camera to scan bills or select from gallery

## Features

- **Selfie/Bill Mode Toggle**: Switch between front and back camera
- **Flash Control**: Toggle flash on/off
- **Camera Flip**: Switch between front and back camera
- **Gallery Picker**: Select images from your device gallery
- **Permission Handling**: Graceful handling of denied permissions

## Troubleshooting

If you encounter issues:

1. Make sure you've installed both packages
2. Restart the Expo development server
3. Clear the app cache: `npx expo start -c`
4. Rebuild the app if using a custom development build
