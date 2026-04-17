import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GroupDetailsScreen({ navigation, route }) {
  const { groupName = 'College Squad', emoji = '👨‍🎓', members = ['You (Raj)', 'Ram', 'Priya', 'Amit'] } = route.params || {};

  const expenses = [
    {
      id: 1,
      title: 'Pizza Night',
      amount: 800,
      paidBy: 'Ram',
      date: 'Today, 2:30 PM',
      splitBetween: 4,
    },
    {
      id: 2,
      title: 'Groceries',
      amount: 320,
      paidBy: 'You',
      date: 'Yesterday, 8:10 PM',
      splitBetween: 3,
    },
  ];

  const balances = [
    { name: 'Ram', amount: 150, type: 'owes' },
    { name: 'Priya', amount: 75, type: 'gets' },
    { name: 'Amit', amount: 225, type: 'owes' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.statusIndicators}>
            <View style={[styles.indicator, { backgroundColor: '#10B981' }]} />
            <View style={[styles.indicator, { backgroundColor: '#0EA5E9' }]} />
            <View style={[styles.indicator, { backgroundColor: '#1F2937' }]} />
          </View>
        </View>
        
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          
          <View style={styles.groupInfo}>
            <View style={styles.groupHeader}>
              <Text style={styles.groupEmoji}>{emoji}</Text>
              <Text style={styles.groupName}>{groupName}</Text>
            </View>
            <Text style={styles.memberCount}>{members.length} members</Text>
          </View>
          
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('CreateBill')}
          >
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.actionText}>Add Expense</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Ionicons name="people" size={20} color="#6366F1" />
            <Text style={[styles.actionText, styles.secondaryText]}>Settle Up</Text>
          </TouchableOpacity>
        </View>

        {/* Balances */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Balances</Text>
          {balances.map((balance, index) => (
            <View key={index} style={styles.balanceItem}>
              <View style={styles.balanceInfo}>
                <Text style={styles.balanceName}>{balance.name}</Text>
                <Text style={[
                  styles.balanceAmount,
                  { color: balance.type === 'owes' ? '#EF4444' : '#10B981' }
                ]}>
                  {balance.type === 'owes' ? 'owes' : 'gets'} ₹{balance.amount}
                </Text>
              </View>
              <TouchableOpacity style={styles.settleButton}>
                <Text style={styles.settleButtonText}>Settle</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Recent Expenses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          {expenses.map((expense) => (
            <TouchableOpacity key={expense.id} style={styles.expenseItem}>
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseTitle}>{expense.title}</Text>
                <Text style={styles.expenseDetails}>
                  {expense.paidBy} paid • ₹{expense.amount / expense.splitBetween} per person
                </Text>
                <Text style={styles.expenseDate}>{expense.date}</Text>
              </View>
              <Text style={styles.expenseAmount}>₹{expense.amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366F1',
  },
  header: {
    backgroundColor: '#6366F1',
    paddingBottom: 20,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 8,
  },
  timeText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  statusIndicators: {
    flexDirection: 'row',
    gap: 4,
  },
  indicator: {
    width: 12,
    height: 6,
    borderRadius: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupInfo: {
    flex: 1,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  groupEmoji: {
    fontSize: 24,
  },
  groupName: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  memberCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 12,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  secondaryText: {
    color: '#6366F1',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  balanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  balanceInfo: {
    flex: 1,
  },
  balanceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  balanceAmount: {
    fontSize: 12,
    fontWeight: '500',
  },
  settleButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  settleButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  expenseDetails: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  expenseDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
});