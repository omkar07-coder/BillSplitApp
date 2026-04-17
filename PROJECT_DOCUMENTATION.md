# BillSplit - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technical Stack](#technical-stack)
4. [Architecture](#architecture)
5. [Installation](#installation)
6. [Usage](#usage)
7. [API Integration](#api-integration)
8. [Design System](#design-system)
9. [Troubleshooting](#troubleshooting)
10. [Future Roadmap](#future-roadmap)

---

## 🎯 Project Overview

**BillSplit** is a comprehensive mobile expense management application built specifically for Indian college students. It simplifies the process of splitting bills, tracking expenses, and managing group finances with an intuitive, modern interface.

### Target Audience
- College students in India
- Friend groups sharing expenses
- Roommates managing household costs
- Travel groups tracking trip expenses

### Problem Statement
Managing shared expenses among friends is complicated:
- Tracking who paid what becomes messy
- Calculating fair splits is time-consuming
- Remembering who owes whom is difficult
- Settling up requires manual coordination

### Solution
BillSplit automates expense tracking with:
- AI-powered bill scanning
- Automatic split calculations
- Real-time balance tracking
- Intelligent AI assistant for help
- Beautiful, intuitive interface

---

## 🌟 Features

### 1. AI-Powered Bill Scanning
**Description**: Capture receipts with your camera and let AI extract details automatically.

**How it works**:
- Open camera from home screen or scan tab
- Position receipt in scan frame
- Tap capture button
- AI detects merchant, amount, items
- Review and edit if needed
- Create bill instantly

**Technical Implementation**:
- Uses expo-camera (v17.0.10)
- CameraView with new API
- Permission handling
- Mock AI detection (placeholder for real OCR)
- Navigation to ReviewBillScreen

**Files**:
- `src/screens/ScanBillScreen.js`
- `src/screens/ScanTabScreen.js`
- `src/screens/ReviewBillScreen.js`

### 2. Smart Expense Splitting
**Description**: Create bills and automatically split them among selected group members.

**Features**:
- Enter bill title, amount, date
- Select group and members
- Automatic per-person calculation
- Support for partial member selection
- Real-time split preview

**Technical Implementation**:
- Form validation
- AsyncStorage persistence
- JSON data format
- Automatic calculations
- Navigation with params

**Files**:
- `src/screens/CreateBillScreen.js`
- `src/utils/` (future: calculation helpers)

**Data Structure**:
```javascript
{
  id: "1234567890",
  title: "Dinner at Pizza Palace",
  amount: 800.00,
  date: "2024-01-22",
  group: "Roommates",
  groupEmoji: "🏠",
  members: ["You (Raj)", "Ram", "Priya"],
  splitAmount: 266.67,
  createdAt: "2024-01-22T18:30:00.000Z"
}
```

### 3. Group Management
**Description**: Create and manage expense groups with custom emojis and members.

**Features**:
- Unlimited groups
- Custom emoji selection (8 options)
- Add/remove members
- Owner badge
- Active/inactive status
- Group-specific balances

**Technical Implementation**:
- State management with useState
- Member list with add/remove
- Emoji picker interface
- Navigation to GroupDetails

**Files**:
- `src/screens/CreateGroupScreen.js`
- `src/screens/GroupDetailsScreen.js`

### 4. AI Chat Assistant
**Description**: Intelligent chatbot powered by Groq's free Llama 3 AI model.

**Features**:
- Context-aware conversations
- Conversation history maintained
- Suggestion chips for quick questions
- Real-time responses
- Helpful error messages

**Technical Implementation**:
- Groq API integration
- llama3-8b-8192 model
- Conversation history tracking
- Platform detection (web/mobile)
- CORS handling

**Files**:
- `src/screens/ChatScreen.js`
- `src/utils/askAI.js`
- `src/config/keys.js`

**API Details**:
- Endpoint: `https://api.groq.com/openai/v1/chat/completions`
- Model: `llama3-8b-8192`
- Temperature: 0.7
- Max tokens: 200
- Free tier: 30 requests/minute

### 5. Activity History
**Description**: Complete timeline of all expenses and transactions.

**Features**:
- Filter tabs (All, Expenses, Settled, Pending)
- Vertical card design
- Status badges
- Group tags
- Color-coded indicators
- Timestamps

**Technical Implementation**:
- Tab-based filtering
- ScrollView with cards
- Status-based styling
- Mock data (placeholder for real data)

**Files**:
- `src/screens/HistoryScreen.js`

### 6. Premium UI/UX
**Description**: Modern, fintech-inspired design with smooth animations.

**Features**:
- Gradient backgrounds
- Card-based layouts
- Smooth transitions
- Micro-interactions
- Responsive design
- Touch-friendly (44px minimum)

**Design Principles**:
- 8pt grid system
- Consistent spacing
- Color-coded feedback
- Clear hierarchy
- Minimal cognitive load

---

## 🛠️ Technical Stack

### Frontend
- **React Native**: 0.81.5
- **React**: 19.1.0
- **Expo**: ~54.0.33

### Navigation
- **@react-navigation/native**: 7.2.2
- **@react-navigation/stack**: 7.8.9
- **@react-navigation/bottom-tabs**: 7.15.9

### UI Libraries
- **expo-linear-gradient**: 55.0.11
- **@expo/vector-icons**: 15.1.1
- **StyleSheet API**: Built-in

### Camera & Media
- **expo-camera**: 17.0.10
- **expo-image-picker**: 17.0.10

### Storage
- **@react-native-async-storage/async-storage**: 3.0.2

### AI Integration
- **Groq API**: Free Llama 3
- **fetch()**: Native HTTP client

### Development Tools
- **Expo CLI**: Development server
- **Metro**: JavaScript bundler
- **React DevTools**: Debugging

---

## 🏗️ Architecture

### Component Hierarchy

```
App
├── NavigationContainer
│   └── TabNavigator
│       ├── HomeStack
│       │   ├── HomeScreen
│       │   ├── CreateBillScreen
│       │   ├── CreateGroupScreen
│       │   ├── GroupDetailsScreen
│       │   ├── ScanBillScreen
│       │   ├── ReviewBillScreen
│       │   ├── BillDetailsScreen
│       │   └── ChatScreen
│       └── HistoryScreen
```

### Data Flow

#### State Management
- Local component state (useState)
- Navigation params for data passing
- AsyncStorage for persistence
- No global state management (yet)

#### Data Persistence
- AsyncStorage for bills
- JSON format
- Key: "bills"
- Array of bill objects

#### API Communication
- fetch() for HTTP requests
- Groq API for AI responses
- Error handling with try/catch
- Platform-specific behavior

### File Organization

```
src/
├── components/          # Reusable UI components
│   ├── AIAssistantModal.js
│   └── BillCard.js
├── screens/            # Screen components
│   ├── HomeScreen.js
│   ├── CreateBillScreen.js
│   ├── CreateGroupScreen.js
│   ├── GroupDetailsScreen.js
│   ├── ScanBillScreen.js
│   ├── ScanTabScreen.js
│   ├── ReviewBillScreen.js
│   ├── BillDetailsScreen.js
│   ├── HistoryScreen.js
│   └── ChatScreen.js
├── utils/              # Utility functions
│   └── askAI.js
└── config/             # Configuration
    └── keys.js
```

---

## 📦 Installation

### Prerequisites
```bash
# Node.js (v16+)
node --version

# npm or yarn
npm --version

# Expo CLI
npm install -g expo-cli

# Android Studio (for Android)
# Xcode (for iOS, Mac only)
```

### Setup Steps

1. **Clone and Install**
```bash
git clone <repository-url>
cd BillSplitApp
npm install
```

2. **Configure API Key**
```bash
# Edit src/config/keys.js
export const GROQ_API_KEY = 'gsk_your_key_here';
```

3. **Start Development**
```bash
npm start
```

4. **Run on Platform**
```bash
npm run android  # Android
npm run ios      # iOS (Mac only)
npm run web      # Web (limited)
```

---

## 💻 Usage

### For Developers

#### Running the App
```bash
# Start with cache clear
npm start -- --reset-cache

# Run on specific platform
npm run android
npm run ios
npm run web
```

#### Testing Features
1. **Home Screen**: Main dashboard with actions
2. **Create Bill**: Add expense form
3. **Create Group**: Group management
4. **Scan Bill**: Camera functionality
5. **AI Chat**: Chatbot (mobile only)
6. **History**: Activity timeline

#### Debugging
```bash
# Check console logs
# Use React DevTools
# Check AsyncStorage data
# Test on real device
```

### For Users

#### Creating First Group
1. Tap "Create Group"
2. Enter name and emoji
3. Add members
4. Save

#### Adding Expense
1. Tap "Add Expense"
2. Fill bill details
3. Select members
4. Review split
5. Save

#### Scanning Bill
1. Tap "Scan Bill"
2. Grant camera permission
3. Capture receipt
4. Review details
5. Confirm

---

## 🤖 API Integration

### Groq API Setup

1. **Get API Key**
   - Visit console.groq.com
   - Sign up (free)
   - Create API key
   - Copy key (starts with gsk_)

2. **Add to Project**
```javascript
// src/config/keys.js
export const GROQ_API_KEY = 'gsk_your_key_here';
```

3. **Test Connection**
```bash
node test-groq-api.js
```

### API Usage

```javascript
// src/utils/askAI.js
import { GROQ_API_KEY } from '../config/keys';

const response = await fetch(GROQ_API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GROQ_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'llama3-8b-8192',
    messages: conversationHistory,
    temperature: 0.7,
    max_tokens: 200,
  }),
});
```

### Rate Limits
- 30 requests/minute (free tier)
- 14,400 requests/day
- No expiration

---

## 🎨 Design System

### Colors
```javascript
// Primary
primary: '#6366F1',      // Indigo
secondary: '#8B5CF6',    // Purple
accent: '#A855F7',       // Deep Purple

// Status
success: '#10B981',      // Green
error: '#EF4444',        // Red
warning: '#FCD34D',      // Yellow
info: '#0EA5E9',         // Sky Blue

// Neutral
text: '#0F172A',         // Dark
textSecondary: '#64748B', // Gray
textTertiary: '#94A3B8',  // Light Gray
background: '#F8FAFC',    // Very Light
border: '#E2E8F0',        // Border Gray
```

### Typography
```javascript
// Sizes
header: 16-20,
title: 14-16,
body: 13-15,
caption: 11-12,
label: 9-11,

// Weights
bold: 700,
semibold: 600,
medium: 500,
regular: 400,
```

### Spacing (8pt grid)
```javascript
xs: 8,
sm: 12,
md: 16,
lg: 20,
xl: 24,
```

---

## 🐛 Troubleshooting

### Issue: Blank Screen
**Solution**: Clear cache
```bash
npm start -- --reset-cache
```

### Issue: Camera Not Working
**Solutions**:
- Grant permissions
- Install expo-camera
- Check CAMERA_FIX.md

### Issue: AI Not Responding
**Solutions**:
- Test on mobile (not web)
- Verify API key
- Check internet

### Issue: Build Errors
**Solutions**:
- Delete node_modules
- npm install
- Restart server

---

## 🚀 Future Roadmap

### Phase 1: Core Features (Current)
- ✅ Bill splitting
- ✅ Group management
- ✅ Camera scanning
- ✅ AI chat
- ✅ Activity history

### Phase 2: Backend Integration
- [ ] User authentication
- [ ] Cloud database
- [ ] Real-time sync
- [ ] Push notifications

### Phase 3: Advanced Features
- [ ] Real OCR integration
- [ ] Payment integration (UPI)
- [ ] Multiple currencies
- [ ] Recurring expenses
- [ ] Budget tracking

### Phase 4: Polish
- [ ] TypeScript migration
- [ ] Unit tests
- [ ] Performance optimization
- [ ] Accessibility
- [ ] Dark mode

---

## 📊 Project Statistics

- **Total Files**: 50+
- **Lines of Code**: ~5,000
- **Screens**: 10
- **Components**: 2
- **Dependencies**: 15+
- **Development Time**: Ongoing
- **Platform Support**: iOS, Android, Web

---

## 📞 Contact & Support

For questions and support:
- Check documentation files
- Review troubleshooting guide
- Contact development team

---

**Last Updated**: 2024  
**Version**: 1.0.0  
**Status**: Active Development
