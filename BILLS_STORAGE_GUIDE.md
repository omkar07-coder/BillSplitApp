# Bills Storage Guide - Quick Reference

Complete guide on saving and loading bills in your BillSplit app.

## 🎯 Quick Start

### 1. Save a Bill

```javascript
import { saveBill } from '../utils/storage';

// Create bill object
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

// Save to AsyncStorage
const success = await saveBill(newBill);

if (success) {
  Alert.alert('Success', 'Bill saved!');
}
```

### 2. Load All Bills

```javascript
import { getBills } from '../utils/storage';

const bills = await getBills();
console.log('Total bills:', bills.length);
```

### 3. Load Bills for a Group

```javascript
import { getBillsByGroup } from '../utils/storage';

const groupBills = await getBillsByGroup('College Squad');
console.log('Group bills:', groupBills.length);
```

---

## 📋 Bill Object Structure

```javascript
{
  id: "1234567890",                    // Unique ID (timestamp)
  title: "Dinner at Pizza Palace",     // Bill title
  amount: 800.00,                      // Total amount (number)
  date: "2024-01-22",                  // Bill date (string)
  group: "College Squad",              // Group name
  groupEmoji: "👨‍🎓",                    // Group emoji
  members: [                           // Array of members
    "You (Raj)",
    "Ram",
    "Priya"
  ],
  splitAmount: 266.67,                 // Per-person amount (number)
  createdAt: "2024-01-22T10:30:00.000Z" // ISO timestamp
}
```

---

## 💾 CreateBillScreen Implementation

### Complete Example

```javascript
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { saveBill } from '../utils/storage';

export default function CreateBillScreen({ navigation, route }) {
  const { groupName, groupEmoji, members } = route.params || {};
  
  const [billTitle, setBillTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const calculateSplitAmount = () => {
    const numAmount = parseFloat(amount) || 0;
    const numPeople = selectedMembers.length || 1;
    return (numAmount / numPeople).toFixed(2);
  };

  const saveBillToStorage = async () => {
    // Validation
    if (!billTitle.trim()) {
      Alert.alert('Error', 'Please enter a bill title');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    if (selectedMembers.length === 0) {
      Alert.alert('Error', 'Please select at least one member');
      return;
    }

    // Create bill object
    const newBill = {
      id: Date.now().toString(),
      title: billTitle.trim(),
      amount: parseFloat(amount),
      date: date,
      group: groupName || 'No Group',
      groupEmoji: groupEmoji || '💰',
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

  return (
    // Your UI here
    <TouchableOpacity onPress={saveBillToStorage}>
      <Text>Save Bill</Text>
    </TouchableOpacity>
  );
}
```

---

## 📊 HistoryScreen Implementation

### Load and Display Bills

```javascript
import React, { useState, useEffect } from 'react';
import { getBills } from '../utils/storage';

export default function HistoryScreen({ navigation }) {
  const [bills, setBills] = useState([]);

  // Load bills when screen focuses
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadBills();
    });

    loadBills();

    return unsubscribe;
  }, [navigation]);

  const loadBills = async () => {
    const loadedBills = await getBills();
    setBills(loadedBills);
  };

  return (
    <ScrollView>
      {bills.map(bill => (
        <View key={bill.id}>
          <Text>{bill.title}</Text>
          <Text>₹{bill.amount}</Text>
          <Text>{bill.group}</Text>
          <Text>{bill.members.length} people</Text>
          <Text>₹{bill.splitAmount} per person</Text>
        </View>
      ))}
    </ScrollView>
  );
}
```

---

## 👥 GroupDetailsScreen Implementation

### Load Bills for Specific Group

```javascript
import React, { useState, useEffect } from 'react';
import { getBillsByGroup } from '../utils/storage';

export default function GroupDetailsScreen({ route }) {
  const { groupName } = route.params;
  const [groupBills, setGroupBills] = useState([]);

  useEffect(() => {
    loadGroupBills();
  }, []);

  const loadGroupBills = async () => {
    const bills = await getBillsByGroup(groupName);
    setGroupBills(bills);
  };

  // Calculate total expenses
  const totalExpenses = groupBills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <View>
      <Text>{groupName}</Text>
      <Text>Total Expenses: ₹{totalExpenses}</Text>
      <Text>{groupBills.length} bills</Text>
      
      {groupBills.map(bill => (
        <View key={bill.id}>
          <Text>{bill.title}: ₹{bill.amount}</Text>
        </View>
      ))}
    </View>
  );
}
```

---

## 🔄 Update a Bill

```javascript
import { getBills, deleteBill, saveBill } from '../utils/storage';

const updateBill = async (billId, updates) => {
  // Get all bills
  const bills = await getBills();
  
  // Find the bill
  const bill = bills.find(b => b.id === billId);
  
  if (!bill) {
    console.error('Bill not found');
    return false;
  }
  
  // Delete old bill
  await deleteBill(billId);
  
  // Save updated bill
  const updatedBill = {
    ...bill,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  return await saveBill(updatedBill);
};

// Usage
await updateBill('1234567890', { 
  title: 'Updated Title',
  amount: 900 
});
```

---

## 🗑️ Delete a Bill

```javascript
import { deleteBill } from '../utils/storage';

const removeBill = async (billId) => {
  Alert.alert(
    'Delete Bill',
    'Are you sure you want to delete this bill?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const success = await deleteBill(billId);
          if (success) {
            Alert.alert('Success', 'Bill deleted');
            loadBills(); // Refresh list
          }
        },
      },
    ]
  );
};
```

---

## 📈 Calculate Statistics

### Total Expenses

```javascript
const calculateTotalExpenses = (bills) => {
  return bills.reduce((sum, bill) => sum + bill.amount, 0);
};

const total = calculateTotalExpenses(bills);
console.log('Total:', total);
```

### Expenses by Group

```javascript
const getExpensesByGroup = (bills) => {
  const groupExpenses = {};
  
  bills.forEach(bill => {
    if (!groupExpenses[bill.group]) {
      groupExpenses[bill.group] = 0;
    }
    groupExpenses[bill.group] += bill.amount;
  });
  
  return groupExpenses;
};

const expenses = getExpensesByGroup(bills);
// { "College Squad": 1500, "Roommates": 800 }
```

### Recent Bills

```javascript
const getRecentBills = (bills, count = 5) => {
  return bills
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, count);
};

const recent = getRecentBills(bills, 5);
```

---

## 🔍 Filter Bills

### By Date Range

```javascript
const filterByDateRange = (bills, startDate, endDate) => {
  return bills.filter(bill => {
    const billDate = new Date(bill.date);
    return billDate >= startDate && billDate <= endDate;
  });
};

const start = new Date('2024-01-01');
const end = new Date('2024-01-31');
const januaryBills = filterByDateRange(bills, start, end);
```

### By Amount

```javascript
const filterByAmount = (bills, minAmount, maxAmount) => {
  return bills.filter(bill => 
    bill.amount >= minAmount && bill.amount <= maxAmount
  );
};

const expensiveBills = filterByAmount(bills, 500, 1000);
```

### By Member

```javascript
const filterByMember = (bills, memberName) => {
  return bills.filter(bill => 
    bill.members.includes(memberName)
  );
};

const myBills = filterByMember(bills, 'You (Raj)');
```

---

## 🐛 Debugging

### View All Bills

```javascript
import { getBills } from '../utils/storage';

const debugBills = async () => {
  const bills = await getBills();
  console.log('=== ALL BILLS ===');
  console.log('Total:', bills.length);
  bills.forEach((bill, index) => {
    console.log(`\n${index + 1}. ${bill.title}`);
    console.log(`   Amount: ₹${bill.amount}`);
    console.log(`   Group: ${bill.group}`);
    console.log(`   Members: ${bill.members.join(', ')}`);
    console.log(`   Date: ${bill.date}`);
  });
};
```

### Clear All Bills

```javascript
import { clearAllData } from '../utils/storage';

const clearBills = async () => {
  Alert.alert(
    'Clear All Bills',
    'This will delete all bills. Continue?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          await clearAllData();
          Alert.alert('Success', 'All bills cleared');
        },
      },
    ]
  );
};
```

---

## ✅ Best Practices

### 1. Always Validate Input

```javascript
if (!billTitle.trim()) {
  Alert.alert('Error', 'Please enter a bill title');
  return;
}

if (!amount || parseFloat(amount) <= 0) {
  Alert.alert('Error', 'Please enter a valid amount');
  return;
}
```

### 2. Use Try-Catch for Error Handling

```javascript
try {
  const success = await saveBill(newBill);
  if (success) {
    Alert.alert('Success', 'Bill saved!');
  }
} catch (error) {
  console.error('Error saving bill:', error);
  Alert.alert('Error', 'Failed to save bill');
}
```

### 3. Reload Data After Changes

```javascript
// After saving
await saveBill(newBill);
await loadBills(); // Refresh the list

// Or use navigation focus listener
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', loadBills);
  return unsubscribe;
}, [navigation]);
```

### 4. Format Amounts Properly

```javascript
// Always parse to float
amount: parseFloat(amount),

// Format for display
const formatted = `₹${bill.amount.toFixed(2)}`;
```

### 5. Handle Empty States

```javascript
{bills.length > 0 ? (
  bills.map(bill => <BillCard key={bill.id} bill={bill} />)
) : (
  <EmptyState message="No bills yet" />
)}
```

---

## 🚀 Quick Reference

```javascript
// Import
import { saveBill, getBills, getBillsByGroup, deleteBill } from '../utils/storage';

// Save
await saveBill(billObject);

// Load all
const bills = await getBills();

// Load by group
const groupBills = await getBillsByGroup('College Squad');

// Delete
await deleteBill(billId);
```

---

**Your bills are now persisted and ready to use!** 🎉
