# Bill Split App - Project Structure

## 📁 Root Directory

```
BillSplitApp/
├── .expo/                      # Expo configuration and cache
├── .git/                       # Git version control
├── assets/                     # App icons and images
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── node_modules/               # Dependencies (auto-generated)
├── src/                        # Source code
│   ├── components/             # Reusable UI components
│   │   └── BillCard.js
│   ├── screens/                # Screen components
│   │   ├── BillDetailsScreen.js
│   │   ├── CreateBillScreen.js
│   │   ├── CreateGroupScreen.js
│   │   ├── GroupDetailsScreen.js
│   │   ├── HistoryScreen.js
│   │   ├── HomeScreen.js
│   │   └── ScanBillScreen.js
│   └── utils/                  # Utility functions (empty)
├── .gitignore                  # Git ignore rules
├── App.js                      # Main navigation setup
├── app.json                    # Expo app configuration
├── index.js                    # Entry point
├── package.json                # Dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── CAMERA_FIX.md              # Camera API fix documentation
├── CAMERA_SETUP.md            # Camera setup guide
├── INSTALLATION_STEPS.md      # Installation instructions
├── QUICK_START.md             # Quick start guide
├── SCAN_FEATURE_SUMMARY.md    # Scan feature documentation
└── README.md                   # Project overview
```

## 🎯 Core Files

### Entry Points
- **index.js** - App entry point, registers the root component
- **App.js** - Main navigation container with tab and stack navigators

### Configuration
- **app.json** - Expo configuration (app name, version, icons, splash screen)
- **package.json** - Project dependencies and npm scripts

## 📱 Screens Overview

### HomeScreen.js
**Route:** `Home` (default screen)
**Purpose:** Main dashboard with overview of groups, activities, and quick actions
**Features:**
- Custom status bar with time and indicators
- Greeting header with user profile
- Purple scan bill card (quick action)
- 4-button action grid (Add Expense, Create Group, Scan Bill, Reports)
- Groups section with active tags
- Recent activity timeline
- Bottom navigation bar

**Navigation:**
- → CreateBill (Add Expense button)
- → CreateGroup (Create Group button)
- → ScanBill (Scan Bill button/card)
- → GroupDetails (Group card tap)

### ScanBillScreen.js
**Route:** `ScanBill`
**Purpose:** Camera interface for scanning bills with AI processing
**Features:**
- Live camera preview with front/back toggle
- Selfie/Bill mode selector
- Flash control (on/off)
- Gallery image picker
- Animated scan line overlay
- Processing overlay with loading animation
- Scan frame with positioning guide

**Dependencies:**
- expo-camera@17.0.10
- expo-image-picker@17.0.10

**Navigation:**
- ← Back to previous screen after capture

### CreateGroupScreen.js
**Route:** `CreateGroup`
**Purpose:** Form to create new expense groups
**Features:**
- Group name input field
- 8 emoji selector (👨‍🎓, 🏠, ✈️, 🍺, 🏖️, 🍕, 🎮, ⚽)
- Members list with add/remove functionality
- Owner badge for current user
- Step indicator (Step 1 of 2)

**Navigation:**
- → GroupDetails (after creation)
- ← Back to Home

### GroupDetailsScreen.js
**Route:** `GroupDetails`
**Purpose:** View group expenses, balances, and manage settlements
**Features:**
- Group header with emoji and member count
- Quick actions (Add Expense, Settle Up)
- Balances section showing who owes/gets money
- Recent expenses list with split details
- Settings button

**Navigation:**
- → CreateBill (Add Expense button)
- ← Back to previous screen

### CreateBillScreen.js
**Route:** `CreateBill`
**Purpose:** Manual bill entry form
**Status:** Placeholder (not fully implemented)

### BillDetailsScreen.js
**Route:** `BillDetails`
**Purpose:** View individual bill details
**Status:** Placeholder (not fully implemented)

### HistoryScreen.js
**Route:** `History` (Tab)
**Purpose:** Transaction history view
**Status:** Placeholder (not fully implemented)

## 🧭 Navigation Structure

### Tab Navigator (Bottom Tabs)
```
TabNavigator
├── HomeTab (Stack Navigator)
│   └── Shows: HomeStack
└── History (Screen)
    └── Shows: HistoryScreen
```

### Stack Navigator (HomeStack)
```
HomeStack
├── Home (HomeScreen) - Default
├── CreateBill (CreateBillScreen)
├── CreateGroup (CreateGroupScreen)
├── GroupDetails (GroupDetailsScreen)
├── ScanBill (ScanBillScreen)
└── BillDetails (BillDetailsScreen)
```

### Navigation Flow Diagram
```
┌─────────────────────────────────────────────────┐
│                   Tab Navigator                  │
├─────────────────────────────────────────────────┤
│  HomeTab                          History        │
│    │                                 │           │
│    ▼                                 ▼           │
│  HomeStack                     HistoryScreen     │
└─────────────────────────────────────────────────┘

HomeStack Navigation:
┌──────────────┐
│  HomeScreen  │ (Entry Point)
└──────┬───────┘
       │
       ├──→ CreateBill
       ├──→ CreateGroup ──→ GroupDetails
       ├──→ ScanBill
       ├──→ GroupDetails
       └──→ BillDetails
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "expo": "~54.0.33",
  "react": "19.1.0",
  "react-native": "0.81.5"
}
```

### Navigation
```json
{
  "@react-navigation/native": "^7.2.2",
  "@react-navigation/stack": "^7.8.9",
  "@react-navigation/bottom-tabs": "^7.15.9",
  "react-native-screens": "^4.24.0",
  "react-native-safe-area-context": "^5.7.0"
}
```

### Camera & Media
```json
{
  "expo-camera": "~17.0.10",
  "expo-image-picker": "~17.0.10"
}
```

### UI & Icons
```json
{
  "@expo/vector-icons": "^15.1.1",
  "expo-linear-gradient": "^55.0.11",
  "expo-status-bar": "~3.0.9"
}
```

### Storage
```json
{
  "@react-native-async-storage/async-storage": "^3.0.2"
}
```

## 🎨 Design System

### Color Palette
- **Primary Purple:** `#6366F1` (Indigo-500)
- **Dark Purple:** `#4338CA` (Indigo-700)
- **Light Purple:** `#EEF2FF` (Indigo-50)
- **Success Green:** `#10B981` (Emerald-500)
- **Error Red:** `#EF4444` (Red-500)
- **Info Blue:** `#0EA5E9` (Sky-500)
- **Background:** `#F8FAFC` (Slate-50)
- **Text Dark:** `#0F172A` (Slate-900)
- **Text Gray:** `#64748B` (Slate-500)

### Typography
- **Headers:** 18-20px, weight 600
- **Body:** 12-14px, weight 400-500
- **Small:** 9-11px, weight 500
- **Font:** System default (San Francisco on iOS, Roboto on Android)

### Spacing
- **Compact design** with reduced spacing throughout
- **Card padding:** 8-16px
- **Section margins:** 6-24px
- **Grid gaps:** 4-12px

### Components
- **Border radius:** 12-16px for cards, 8px for buttons
- **Shadows:** Subtle elevation with 0.05-0.1 opacity
- **Icons:** Ionicons from @expo/vector-icons

## 🚀 Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
```

## 📝 Documentation Files

- **CAMERA_FIX.md** - Solution for Camera.Constants deprecation error
- **CAMERA_SETUP.md** - Step-by-step camera setup guide
- **INSTALLATION_STEPS.md** - Package installation instructions
- **QUICK_START.md** - Quick start guide for development
- **SCAN_FEATURE_SUMMARY.md** - Scan bill feature documentation
- **README.md** - Project overview and setup
- **PROJECT_STRUCTURE.md** - This file

## 🔧 Development Notes

### Camera Implementation
- Uses new Expo Camera API (v17.0.10)
- Imports: `Camera, CameraType, FlashMode` from 'expo-camera'
- Replaced deprecated `Camera.Constants.Type` with `CameraType`
- Replaced deprecated `Camera.Constants.FlashMode` with `FlashMode`

### Styling Approach
- React Native StyleSheet (no Tailwind/NativeWind)
- Inline styles using StyleSheet.create()
- Compact, mobile-first design
- Non-sticky headers (scroll with content)

### Navigation Pattern
- Stack navigator for main flow
- Tab navigator for primary sections
- All screens have `headerShown: false` for custom headers
- Navigation prop passed to all screens

## 🎯 Feature Status

✅ **Completed:**
- Home dashboard UI
- Group creation flow
- Group details view
- Camera scan interface
- Navigation structure
- Camera permissions handling

🚧 **In Progress:**
- Bill creation form
- Bill details view
- History screen
- AI bill processing

📋 **Planned:**
- Settlement calculations
- Payment tracking
- Reports and analytics
- User authentication
- Data persistence
