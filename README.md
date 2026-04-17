# Bill Split App

A modern, feature-rich React Native mobile application for splitting bills and managing group expenses. Built with Expo, featuring AI-powered bill scanning, real-time expense tracking, and intuitive group management.

## 🌟 Features

### Core Functionality
- **AI-Powered Bill Scanning**: Capture receipts with your camera and let AI automatically extract merchant details, items, and amounts
- **Smart Expense Splitting**: Easily split bills among friends with flexible splitting options
- **Group Management**: Create and manage expense groups with custom emojis and member tracking
- **Real-time Balance Tracking**: See who owes what at a glance with color-coded indicators
- **Activity History**: Track all expenses and settlements with detailed transaction history
- **AI Assistant**: Get insights and help with expense management through an integrated AI chat

### User Experience
- **Premium Fintech UI**: Modern, gradient-based design inspired by top fintech apps
- **Responsive Design**: Optimized for all screen sizes from small to large devices
- **Smooth Animations**: Polished interactions with gradient effects and micro-animations
- **Intuitive Navigation**: Bottom tab navigation with stack-based screen flows
- **Dark Status Bar**: Professional appearance with proper status bar styling

## 📱 Screenshots

The app features:
- Dynamic greeting header (Good Morning/Afternoon/Evening)
- Quick action banner for bill scanning
- 4 action cards with unique gradient designs
- Horizontal scrollable group cards
- Recent activity feed with status indicators

## 🏗️ Project Structure

```
BillSplitApp/
├── .expo/                          # Expo configuration and cache
├── .git/                           # Git repository
├── assets/                         # Static assets
│   ├── adaptive-icon.png          # Android adaptive icon
│   ├── favicon.png                # Web favicon
│   ├── icon.png                   # App icon
│   └── splash-icon.png            # Splash screen icon
├── node_modules/                   # Dependencies
├── src/                           # Source code
│   ├── components/                # Reusable components
│   │   ├── AIAssistantModal.js   # AI chat modal with slide-up animation
│   │   └── BillCard.js           # Bill display card component
│   ├── screens/                   # Screen components
│   │   ├── HomeScreen.js         # Main dashboard with premium UI
│   │   ├── CreateBillScreen.js   # Bill creation form with fintech design
│   │   ├── CreateGroupScreen.js  # Group creation with emoji selector
│   │   ├── GroupDetailsScreen.js # Group expense details and balances
│   │   ├── ScanBillScreen.js     # Camera screen for navigation stack
│   │   ├── ScanTabScreen.js      # Camera screen for tab navigation
│   │   ├── ReviewBillScreen.js   # AI-detected bill review
│   │   ├── BillDetailsScreen.js  # Individual bill details
│   │   └── HistoryScreen.js      # Activity and transaction history
│   └── utils/                     # Utility functions (empty, for future use)
├── App.js                         # Main app entry with navigation setup
├── index.js                       # Expo entry point
├── app.json                       # Expo app configuration
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Locked dependency versions
├── .gitignore                     # Git ignore rules
├── README.md                      # This file
└── [Documentation Files]          # Setup and feature guides
    ├── INSTALLATION_STEPS.md     # Installation guide
    ├── QUICK_START.md            # Quick start guide
    ├── CAMERA_SETUP.md           # Camera setup instructions
    ├── CAMERA_FIX.md             # Camera troubleshooting
    ├── SCAN_FEATURE_SUMMARY.md   # Scan feature documentation
    ├── PROJECT_STRUCTURE.md      # Project structure details
    └── demo-instructions.md      # Demo instructions
```

## 🛠️ Technology Stack

### Core Technologies
- **React Native**: 0.81.5 - Cross-platform mobile framework
- **React**: 19.1.0 - UI library
- **Expo**: ~54.0.33 - Development platform and tooling

### Navigation
- **@react-navigation/native**: 7.2.2 - Navigation framework
- **@react-navigation/stack**: 7.8.9 - Stack navigator for screen flows
- **@react-navigation/bottom-tabs**: 7.15.9 - Bottom tab navigation
- **react-native-screens**: 4.24.0 - Native screen optimization
- **react-native-safe-area-context**: 5.7.0 - Safe area handling

### UI & Styling
- **expo-linear-gradient**: 55.0.11 - Gradient backgrounds and effects
- **@expo/vector-icons**: 15.1.1 - Icon library (Ionicons)
- **expo-status-bar**: 3.0.9 - Status bar management

### Camera & Media
- **expo-camera**: 17.0.10 - Camera access and photo capture
- **expo-image-picker**: 17.0.10 - Image selection from gallery

### Storage
- **@react-native-async-storage/async-storage**: 3.0.2 - Local data persistence

### Platform Support
- **react-native-web**: 0.21.0 - Web platform support
- **react-dom**: 19.1.0 - Web rendering

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd BillSplitApp
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on your platform**
```bash
# iOS (Mac only)
npm run ios

# Android
npm run android

# Web
npm run web
```

### Camera Setup
The camera feature requires additional permissions:
- iOS: Camera permission is requested automatically
- Android: Camera permission is requested automatically
- Web: Browser camera access permission required

For detailed camera setup, see [CAMERA_SETUP.md](CAMERA_SETUP.md)

## 🚀 Getting Started

### First Launch
1. The app opens to the Home screen with a personalized greeting
2. Tap the "Scan a bill" banner to try the camera feature
3. Grant camera permissions when prompted
4. Explore the 4 quick action cards for different features

### Creating Your First Group
1. Tap "Create Group" from the home screen
2. Enter a group name and select an emoji
3. Add members by typing their names
4. Tap "Create Group" to save

### Scanning a Bill
1. Tap "Scan Bill" or the quick action banner
2. Grant camera permission if prompted
3. Point camera at receipt and tap capture
4. Review AI-detected details
5. Edit if needed and continue to split

### Adding an Expense
1. Tap "Add Expense" from home screen
2. Enter bill amount (most prominent field)
3. Add tip and tax if applicable
4. Select people to split with
5. Review per-person amount
6. Tap "Split Bill" to save

## 📐 Design System

### Color Palette
- **Primary Indigo**: #6366F1 - Main brand color
- **Purple**: #8B5CF6 - Secondary accent
- **Sky Blue**: #0EA5E9, #06B6D4 - Info and actions
- **Green**: #10B981, #059669 - Success and positive amounts
- **Red**: #EF4444 - Negative amounts and alerts
- **Neutral Grays**: #0F172A, #64748B, #94A3B8, #F1F5F9

### Typography
- **Headers**: 16-20px, Bold (700)
- **Body**: 12-14px, Medium (600) / Regular (400)
- **Captions**: 10-11px, Medium (600)
- **Labels**: 9-10px, Bold (700), Uppercase

### Spacing System (8pt Grid)
- **XS**: 8px
- **SM**: 12px
- **MD**: 16px
- **LG**: 20px
- **XL**: 24px

### Border Radius
- **Small**: 8-10px
- **Medium**: 14-16px
- **Large**: 18-20px
- **Cards**: 16px
- **Buttons**: 12px

### Shadows
- **Light**: shadowOpacity: 0.05, shadowRadius: 8
- **Medium**: shadowOpacity: 0.08, shadowRadius: 12
- **Heavy**: shadowOpacity: 0.3, shadowRadius: 16

## 🎨 Key Components

### HomeScreen
The main dashboard featuring:
- Dynamic time-based greeting
- Gradient profile button
- Premium banner with CTA
- 4 action cards with unique gradients
- Horizontal scrollable groups
- Recent activity feed

### CreateBillScreen
Modern bill creation form with:
- Large, prominent amount input
- Floating labels with icons
- Tip and tax fields
- People selector with avatars
- Summary card with gradient
- Per-person calculation

### ScanTabScreen
Camera interface with:
- Full-screen camera view
- Permission handling
- Flash toggle
- Gallery picker
- Capture button with animation

### AIAssistantModal
Slide-up modal featuring:
- Animated robot avatar
- Online status indicator
- Chat interface
- Quick action buttons
- Message input field

## 🔧 Configuration

### App Configuration (app.json)
```json
{
  "expo": {
    "name": "BillSplitApp",
    "slug": "billsplitapp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```

### Navigation Structure
```
TabNavigator (Bottom Tabs)
├── HomeTab (Stack Navigator)
│   ├── Home
│   ├── CreateBill
│   ├── CreateGroup
│   ├── GroupDetails
│   ├── ScanBill
│   ├── ReviewBill
│   └── BillDetails
└── Activity
```

## 🐛 Troubleshooting

### Common Issues

**1. Blank Home Screen**
- Clear Metro bundler cache: `npm start -- --reset-cache`
- Restart the development server
- Check for console errors

**2. Camera Not Working**
- Ensure camera permissions are granted
- Check that expo-camera is installed: `npm install expo-camera@17.0.10`
- Restart the app after granting permissions
- See [CAMERA_FIX.md](CAMERA_FIX.md) for detailed fixes

**3. Navigation Errors**
- Verify all screens are properly imported in App.js
- Check that navigation props are passed correctly
- Ensure react-navigation packages are installed

**4. Gradient Not Showing**
- Verify expo-linear-gradient is installed
- Check that LinearGradient is imported correctly
- Ensure colors array has at least 2 colors

### Development Tips
- Always clear cache when recreating files
- Use `expo start -c` for clean start
- Check terminal for runtime errors
- Use React DevTools for debugging

## 📝 Scripts

```bash
# Start development server
npm start

# Start with cache cleared
npm start -- --reset-cache

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Clean start with Expo
expo start -c
```

## 🔐 Permissions

### iOS (Info.plist)
- Camera: "We need camera access to scan bills"
- Photo Library: "We need photo access to select bills"

### Android (AndroidManifest.xml)
- CAMERA
- READ_EXTERNAL_STORAGE
- WRITE_EXTERNAL_STORAGE

## 🚧 Future Enhancements

### Planned Features
- [ ] Backend integration with REST API
- [ ] User authentication and profiles
- [ ] Real-time sync across devices
- [ ] Push notifications for settlements
- [ ] Receipt OCR with actual AI service
- [ ] Multiple currency support
- [ ] Export to PDF/CSV
- [ ] Payment integration (UPI, PayPal)
- [ ] Split by percentage or custom amounts
- [ ] Recurring expenses
- [ ] Budget tracking
- [ ] Analytics dashboard

### Technical Improvements
- [ ] Add TypeScript for type safety
- [ ] Implement Redux/Context for state management
- [ ] Add unit and integration tests
- [ ] Set up CI/CD pipeline
- [ ] Add error boundary components
- [ ] Implement offline mode
- [ ] Add accessibility features
- [ ] Performance optimization

## 📄 License

This project is private and proprietary.

## 👥 Contributors

- Development Team

## 📞 Support

For issues and questions:
- Check documentation files in the project root
- Review troubleshooting section above
- Check console logs for error messages

## 🙏 Acknowledgments

- Design inspired by Splitwise, Google Pay, and modern fintech apps
- Icons from @expo/vector-icons (Ionicons)
- Built with Expo and React Native

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Active Development
