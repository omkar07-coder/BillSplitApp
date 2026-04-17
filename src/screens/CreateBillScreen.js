import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { saveBill } from '../utils/storage';

export default function CreateBillScreen({ navigation, route }) {
  const { groupName, groupEmoji, members: groupMembers } = route.params || {};

  // Form state
  const [billTitle, setBillTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Initialize selected members when component mounts
  useEffect(() => {
    if (groupMembers && groupMembers.length > 0) {
      setSelectedMembers(groupMembers.map(m => m));
    }
  }, []);

  // Toggle member selection
  const toggleMember = (member) => {
    if (selectedMembers.includes(member)) {
      setSelectedMembers(selectedMembers.filter(m => m !== member));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  // Calculate split amount per person
  const calculateSplitAmount = () => {
    const numAmount = parseFloat(amount) || 0;
    const numPeople = selectedMembers.length || 1;
    return (numAmount / numPeople).toFixed(2);
  };

  // Save bill to AsyncStorage
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

    console.log('Creating bill...');

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

    console.log('Saving bill:', newBill);

    // Save to AsyncStorage using utility function
    const success = await saveBill(newBill);

    console.log('Save result:', success);

    if (success) {
      // Navigate back with success
      Alert.alert(
        'Success', 
        'Bill added successfully!', 
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('Navigating back...');
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('Error', 'Failed to save bill. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Bill</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Bill Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Information</Text>

          {/* Bill Title Input */}
          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Ionicons name="receipt-outline" size={18} color="#6366F1" />
              <Text style={styles.inputLabel}>Bill Title</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="e.g., Dinner at Pizza Palace"
              placeholderTextColor="#94A3B8"
              value={billTitle}
              onChangeText={setBillTitle}
            />
          </View>

          {/* Amount Input */}
          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Ionicons name="cash-outline" size={18} color="#6366F1" />
              <Text style={styles.inputLabel}>Total Amount</Text>
            </View>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#94A3B8"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          {/* Date Input */}
          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Ionicons name="calendar-outline" size={18} color="#6366F1" />
              <Text style={styles.inputLabel}>Date</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#94A3B8"
              value={date}
              onChangeText={setDate}
            />
          </View>
        </View>

        {/* Group Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group</Text>
          <View style={styles.groupCard}>
            <View style={styles.groupInfo}>
              <View style={styles.groupIconContainer}>
                <Text style={styles.groupIcon}>{groupEmoji || '💰'}</Text>
              </View>
              <View style={styles.groupDetails}>
                <Text style={styles.groupName}>{groupName || 'No Group'}</Text>
                <Text style={styles.groupMemberCount}>
                  {groupMembers?.length || 0} members
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Member Selection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Split Between</Text>
          <Text style={styles.sectionSubtitle}>
            Select members to include in this bill
          </Text>

          <View style={styles.membersList}>
            {groupMembers && groupMembers.length > 0 ? (
              groupMembers.map((member, index) => {
                const isSelected = selectedMembers.includes(member);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.memberItem,
                      isSelected && styles.memberItemSelected,
                    ]}
                    onPress={() => toggleMember(member)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.memberInfo}>
                      <View
                        style={[
                          styles.memberAvatar,
                          isSelected && styles.memberAvatarSelected,
                        ]}
                      >
                        <Text style={styles.memberAvatarText}>
                          {member.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.memberName,
                          isSelected && styles.memberNameSelected,
                        ]}
                      >
                        {member}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.checkbox,
                        isSelected && styles.checkboxSelected,
                      ]}
                    >
                      {isSelected && (
                        <Ionicons name="checkmark" size={16} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="people-outline" size={48} color="#CBD5E1" />
                <Text style={styles.emptyStateText}>No members available</Text>
                <Text style={styles.emptyStateSubtext}>
                  Add members to the group first
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Split Preview Section */}
        {selectedMembers.length > 0 && amount && parseFloat(amount) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Split Preview</Text>
            <View style={styles.previewCard}>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Total Amount</Text>
                <Text style={styles.previewValue}>₹{amount}</Text>
              </View>
              <View style={styles.previewDivider} />
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>Number of People</Text>
                <Text style={styles.previewValue}>{selectedMembers.length}</Text>
              </View>
              <View style={styles.previewDivider} />
              <View style={styles.previewHighlight}>
                <Text style={styles.previewHighlightLabel}>Per Person</Text>
                <Text style={styles.previewHighlightValue}>
                  ₹{calculateSplitAmount()}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveBillToStorage}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle" size={20} color="white" />
          <Text style={styles.saveButtonText}>Add Bill</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#F8FAFC',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12,
  },
  inputCard: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  input: {
    fontSize: 15,
    color: '#0F172A',
    padding: 0,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6366F1',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    padding: 0,
  },
  groupCard: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  groupIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupIcon: {
    fontSize: 24,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  groupMemberCount: {
    fontSize: 13,
    color: '#64748B',
  },
  membersList: {
    gap: 10,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  memberItemSelected: {
    borderColor: '#6366F1',
    backgroundColor: '#F0F1FF',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberAvatarSelected: {
    backgroundColor: '#6366F1',
  },
  memberAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  memberName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  memberNameSelected: {
    color: '#6366F1',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },
  previewCard: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  previewLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  previewValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  previewDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  previewHighlight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F1FF',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  previewHighlightLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6366F1',
  },
  previewHighlightValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6366F1',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6366F1',
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});
