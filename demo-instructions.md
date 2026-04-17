# Demo Instructions

## Quick Start

1. **Install Expo Go** on your mobile device:
   - iOS: Download from App Store
   - Android: Download from Google Play Store

2. **Start the development server**:
   ```bash
   cd BillSplitApp
   npm start
   ```

3. **Connect your device**:
   - Scan the QR code with Expo Go app
   - Or use device simulator if available

## Demo Flow

### 1. Home Screen
- Shows empty state initially
- Floating action button (+) to create bills

### 2. Create Your First Bill
- Tap the "+" button
- Fill in: "Dinner at Italian Restaurant"
- Amount: $120.00
- Tip: $18.00
- Tax: $9.60
- Add people: "Alice", "Bob", "Charlie", "Diana"
- See live calculation: $36.90 per person
- Tap "Create Bill"

### 3. View Bill Details
- See complete breakdown
- Individual amounts for each person
- Share functionality

### 4. Create More Bills
- "Coffee Shop": $24.50, 2 people
- "Movie Night": $68.00, 4 people
- "Lunch": $45.75, 3 people

### 5. History Tab
- View statistics
- See all bills chronologically
- Clear all bills option

## Key Features to Demonstrate

✅ **Real-time Calculation**: Watch per-person amount update as you type
✅ **Easy Person Management**: Add/remove people with + and - buttons
✅ **Bill Breakdown**: Subtotal, tip, tax, and total clearly displayed
✅ **Persistent Storage**: Bills saved between app sessions
✅ **Share Functionality**: Share bill details via text/email
✅ **Clean UI**: Modern, intuitive interface
✅ **Statistics**: Track spending over time

## Test Scenarios

1. **Empty Fields**: Try creating bill without required fields
2. **Single Person**: Create bill with just one person
3. **No Tip/Tax**: Create bill with just base amount
4. **Large Numbers**: Test with various amounts
5. **Long Names**: Test with longer person names
6. **Delete Bills**: Test deletion from home screen
7. **Share Bill**: Test sharing functionality

## Troubleshooting

- If QR code doesn't work, try typing the URL manually in Expo Go
- Make sure your phone and computer are on the same network
- Restart the development server if needed: `npm start --clear`