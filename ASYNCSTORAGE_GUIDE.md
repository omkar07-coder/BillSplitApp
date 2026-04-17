# AsyncStorage Guide for BillSplit App

Complete guide on how to save and load data using AsyncStorage in your React Native app.

## 📚 Table of Contents
1. [Overview](#overview)
2. [Setup](#setup)
3. [Storage Utility Functions](#storage-utility-functions)
4. [Saving Groups](#saving-groups)
5. [Loading Groups](#loading-groups)
6. [Saving Bills](#saving-bills)
7. [Loading Bills](#loading-bills)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

AsyncStorage is React Native's simple, asynchronous, persistent, key-value storage system. It's perfect for storing app data locally on the device.

### What We Store
- **Groups**: User-created expense groups with members
- **Bills**: Individual expenses and their splits

### Data Format
- Stored as JSON strings
- Parsed back to JavaScript objects when retrieved
- Each data type has its own storage key

---

## 🔧 Setup

### 1. Install AsyncStorage

Already installed in your project:
```bash
npm install @react-native-async-storage/async-storage@3.0.2
```

### 2. Import in Your Files

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
```

---

## 🛠️ Storage Utility Functions

We've created a centralized utility file: `src/utils/storage.js`

### Key Features
- ✅ Save/load groups
- ✅ Save/load bills
- ✅ Update existing data
- ✅ Delete data
- ✅ Error handling
- ✅ Console logging for debugging

### Storage Keys
```javascript
const STORAGE_KEYS = {
  GROUPS: 'groups',
  BILLS: 'bills',
};
```

---

## 💾 Saving Groups

### Step 1: Create Group Object

```javascript
const newGroup = {
  id: Date.now().toString(),           // Unique ID
  name: 'College Squad',                // Group name
  emoji: '👨‍🎓',                          // Group emoji
  members: ['You (Raj)', 'Ram', 'Priya'], // Array of members
  createdAt: new Date().toISOString(),  // Timestamp
  active: true,                         // Active status
};
```

### Step 2: Save to AsyncStorage

```javascript
import { saveGroup } from '../utils/storage';

const success = await saveGroup(newGroup);

if (success) {
  console.log('Group saved!');
} else {
  console.log('Failed to save group');
}
```

### How It Works

1. **Get existing groups** from AsyncStorage
2. **Add new group** to the beginning of array
3. **Convert to JSON** string
4. **Save** to AsyncStorage with key 'groups'
5. **Return** success/failure status

### Complete Example (CreateGroupScreen.js)

```javascript
import { saveGroup } from '../utils/storage';

const createGroup = async () => {
  // Validate input
  if (!groupName.trim()) {
    Alert.alert('Error', 'Please enter a group name');
    return;
  }
  
  // Create group object
  const newGroup = {
    id: Date.now().toString(),
    name: groupName.trim(),
    emoji: emojis[selectedEmoji],
    members: ['You (Raj)', ...members],
    createdAt: new Date().toISOString(),
    active: true,
  };
  
  // Save to AsyncStorage
  const success = await saveGroup(newGroup);
  
  if (success) {
    Alert.alert('Success', 'Group created!');
    navigation.goBack();
  } else {
    Alert.alert('Error', 'Failed to create group');
  }
};
```

---

## 📂 Loading Groups

### Step 1: Import Function

```javascript
import { getGroups } from '../utils/storage';
```

### Step 2: Load Groups

```javascript
const loadGroups = async () => {
  const groups = await getGroups();
  console.log('Loaded groups:', groups);
  setGroups(groups); // Update state
};
```

### Step 3: Load on Screen Focus

```javascript
import { useEffect } from 'react';

useEffect(() => {
  // Load when screen focuses
  const unsubscribe = navigation.addListener('focus', () => {
    loadGroups();
  });

  // Load on initial mount
  loadGroups();

  // Cleanup
  return unsubscribe;
}, [navigation]);
```

### Complete Example (HomeScreen.js)

```javascript
import React, { useState, useEffect } from 'react';
import { getGroups } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadGroups();
    });

    loadGroups();

    return unsubscribe;
  }, [navigation]);

  const loadGroups = async () => {
    const loadedGroups = await getGroups();
    setGroups(loadedGroups);
  };

  return (
    <View>
      {groups.length > 0 ? (
        groups.map(group => (
          <Text key={group.id}>{group.name}</Text>
        ))
      ) : (
        <Text>No groups yet</Text>
      )}
    </View>
  );
}
```

---

## 💰 Saving Bills

### Step 1: Create Bill Object

```javascript
const newBill = {
  id: Date.now().toString(),
  title: 'Dinner at Pizza Palace',
  amount: 800.00,
  date: '2024-01-22',
  group: 'College Squad',
  groupEmoji: '👨‍🎓',
  members: ['You (Raj)', 'Ram', 'Priya'],
  splitAmount: 266.67,
  createdAt: new Date().toISOString(),
};
```

### Step 2: Save to AsyncStorage

```javascript
import { saveBill } from '../utils/storage';

const success = await saveBill(newBill);

if (success) {
  console.log('Bill saved!');
  navigation.goBack();
}
```

### Complete Example (CreateBillScreen.js)

```javascript
import { saveBill } from '../utils/storage';

const saveBillToStorage = async () => {
  // Validation
  if (!billTitle.trim()) {
    Alert.alert('Error', 'Please enter a bill title');
    return;
  }

  // Create bill object
  const newBill = {
    id: Date.now().toString(),
    title: billTitle.trim(),
    amount: parseFloat(amount),
    date: date,
    group: groupName,
    groupEmoji: groupEmoji,
    members: selectedMembers,
    splitAmount: parseFloat(calculateSplitAmount()),
    createdAt: new Date().toISOString(),
  };

  // Save to AsyncStorage
  const success = await saveBill(newBill);

  if (success) {
    Alert.alert('Success', 'Bill added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  } else {
    Alert.alert('Error', 'Failed to save bill');
  }
};
```

---

## 📋 Loading Bills

### Load All Bills

```javascript
import { getBills } from '../utils/storage';

const loadBills = async () => {
  const bills = await getBills();
  setBills(bills);
};
```

### Load Bills for Specific Group

```javascript
import { getBillsByGroup } from '../utils/storage';

const loadGroupBills = async (groupName) => {
  const bills = await getBillsByGroup(groupName);
  setGroupBills(bills);
};
```

### Complete Example (GroupDetailsScreen.js)

```javascript
import React, { useState, useEffect } from 'react';
import { getBillsByGroup } from '../utils/storage';

export default function GroupDetailsScreen({ route }) {
  const { groupName } = route.params;
  const [bills, setBills] = useState([]);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    const groupBills = await getBillsByGroup(groupName);
    setBills(groupBills);
  };

  return (
    <View>
      <Text>{groupName} Bills</Text>
      {bills.map(bill => (
        <View key={bill.id}>
          <Text>{bill.title}: ₹{bill.amount}</Text>
        </View>
      ))}
    </View>
  );
}
```

---

## ✅ Best Practices

### 1. Always Use Try-Catch

```javascript
const saveData = async () => {
  try {
    await AsyncStorage.setItem('key', 'value');
    console.log('✅ Saved successfully');
  } catch (error) {
    console.error('❌ Error saving:', error);
  }
};
```

### 2. Use Unique IDs

```javascript
// Good: Unique timestamp-based ID
id: Date.now().toString()

// Bad: Index-based ID (can cause duplicates)
id: index.toString()
```

### 3. Validate Before Saving

```javascript
if (!groupName.trim()) {
  Alert.alert('Error', 'Please enter a group name');
  return;
}

if (members.length === 0) {
  Alert.alert('Error', 'Please add at least one member');
  return;
}
```

### 4. Reload Data After Changes

```javascript
// After saving
await saveGroup(newGroup);
await loadGroups(); // Refresh the list

// Or navigate back and let focus listener reload
navigation.goBack();
```

### 5. Handle Empty States

```javascript
{groups.length > 0 ? (
  groups.map(group => <GroupCard key={group.id} group={group} />)
) : (
  <EmptyState message="No groups yet" />
)}
```

### 6. Use Descriptive Keys

```javascript
// Good
const STORAGE_KEYS = {
  GROUPS: 'groups',
  BILLS: 'bills',
  USER_SETTINGS: 'user_settings',
};

// Bad
const KEY1 = 'k1';
const KEY2 = 'k2';
```

### 7. Log for Debugging

```javascript
const loadGroups = async () => {
  const groups = await getGroups();
  console.log('📦 Loaded groups:', groups.length);
  console.log('Groups:', groups);
  setGroups(groups);
};
```

---

## 🐛 Troubleshooting

### Issue: Data Not Persisting

**Symptoms**: Data disappears after app restart

**Solutions**:
1. Check if `await` is used with AsyncStorage calls
2. Verify data is actually being saved (check console logs)
3. Make sure you're using the correct storage key
4. Test with `getAllData()` utility function

```javascript
import { getAllData } from '../utils/storage';

const debugStorage = async () => {
  const data = await getAllData();
  console.log('All storage data:', data);
};
```

### Issue: Data Not Loading

**Symptoms**: Screen shows empty even though data exists

**Solutions**:
1. Check if `loadGroups()` is being called
2. Verify `useEffect` dependencies
3. Check console for error messages
4. Make sure state is being updated

```javascript
const loadGroups = async () => {
  console.log('🔄 Loading groups...');
  const groups = await getGroups();
  console.log('📦 Loaded:', groups.length, 'groups');
  setGroups(groups);
  console.log('✅ State updated');
};
```

### Issue: Duplicate Data

**Symptoms**: Same group/bill appears multiple times

**Solutions**:
1. Use unique IDs (timestamp-based)
2. Check for duplicate save calls
3. Filter duplicates before saving

```javascript
// Check for duplicates
const existingGroups = await getGroups();
const isDuplicate = existingGroups.some(g => g.name === newGroup.name);

if (isDuplicate) {
  Alert.alert('Error', 'Group already exists');
  return;
}
```

### Issue: JSON Parse Error

**Symptoms**: "Unexpected token" or "JSON.parse" error

**Solutions**:
1. Ensure data is valid JSON
2. Handle null/undefined values
3. Use try-catch when parsing

```javascript
export const getGroups = async () => {
  try {
    const groupsJson = await AsyncStorage.getItem('groups');
    
    if (!groupsJson) {
      return []; // Return empty array if no data
    }
    
    const groups = JSON.parse(groupsJson);
    return Array.isArray(groups) ? groups : [];
  } catch (error) {
    console.error('Error parsing groups:', error);
    return [];
  }
};
```

### Issue: Data Not Updating

**Symptoms**: Changes don't reflect in UI

**Solutions**:
1. Reload data after saving
2. Use navigation focus listener
3. Force re-render with state update

```javascript
// After saving
await saveGroup(newGroup);

// Option 1: Reload immediately
await loadGroups();

// Option 2: Navigate back (focus listener will reload)
navigation.goBack();

// Option 3: Force update
setGroups(prev => [newGroup, ...prev]);
```

---

## 🧪 Testing AsyncStorage

### View All Data

```javascript
import { getAllData } from '../utils/storage';

const viewAllData = async () => {
  const data = await getAllData();
  console.log('=== ALL STORAGE DATA ===');
  console.log('Groups:', data.groups);
  console.log('Bills:', data.bills);
  console.log('Total Groups:', data.totalGroups);
  console.log('Total Bills:', data.totalBills);
};
```

### Clear All Data

```javascript
import { clearAllData } from '../utils/storage';

const resetApp = async () => {
  Alert.alert(
    'Clear All Data',
    'Are you sure? This cannot be undone.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          await clearAllData();
          Alert.alert('Success', 'All data cleared');
        },
      },
    ]
  );
};
```

### Test Save/Load

```javascript
const testStorage = async () => {
  console.log('🧪 Testing AsyncStorage...');
  
  // Test save
  const testGroup = {
    id: 'test-123',
    name: 'Test Group',
    emoji: '🧪',
    members: ['Test User'],
    createdAt: new Date().toISOString(),
    active: true,
  };
  
  const saved = await saveGroup(testGroup);
  console.log('Save result:', saved);
  
  // Test load
  const groups = await getGroups();
  console.log('Loaded groups:', groups);
  
  // Test find
  const found = groups.find(g => g.id === 'test-123');
  console.log('Found test group:', found);
  
  console.log('✅ Test complete');
};
```

---

## 📊 Data Structure Reference

### Group Object
```javascript
{
  id: "1234567890",              // Unique ID (timestamp)
  name: "College Squad",          // Group name
  emoji: "👨‍🎓",                    // Group emoji
  members: [                      // Array of member names
    "You (Raj)",
    "Ram",
    "Priya"
  ],
  createdAt: "2024-01-22T10:30:00.000Z", // ISO timestamp
  active: true,                   // Active status
  updatedAt: "2024-01-22T11:00:00.000Z"  // Last update (optional)
}
```

### Bill Object
```javascript
{
  id: "1234567890",              // Unique ID (timestamp)
  title: "Dinner at Pizza Palace", // Bill title
  amount: 800.00,                 // Total amount
  date: "2024-01-22",            // Bill date
  group: "College Squad",         // Group name
  groupEmoji: "👨‍🎓",              // Group emoji
  members: [                      // Members in this bill
    "You (Raj)",
    "Ram",
    "Priya"
  ],
  splitAmount: 266.67,           // Per-person amount
  createdAt: "2024-01-22T10:30:00.000Z" // ISO timestamp
}
```

---

## 🚀 Quick Reference

### Save Group
```javascript
import { saveGroup } from '../utils/storage';
await saveGroup(groupObject);
```

### Load Groups
```javascript
import { getGroups } from '../utils/storage';
const groups = await getGroups();
```

### Save Bill
```javascript
import { saveBill } from '../utils/storage';
await saveBill(billObject);
```

### Load Bills
```javascript
import { getBills } from '../utils/storage';
const bills = await getBills();
```

### Load Bills by Group
```javascript
import { getBillsByGroup } from '../utils/storage';
const bills = await getBillsByGroup('College Squad');
```

### Update Group
```javascript
import { updateGroup } from '../utils/storage';
await updateGroup(groupId, { name: 'New Name' });
```

### Delete Group
```javascript
import { deleteGroup } from '../utils/storage';
await deleteGroup(groupId);
```

---

**Your data is now persisted locally and will survive app restarts!** 🎉
