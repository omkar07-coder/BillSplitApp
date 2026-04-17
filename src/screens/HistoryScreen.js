import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBills } from '../utils/storage';

export default function HistoryScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
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
    console.log('Loading bills...');
    const loadedBills = await getBills();
    console.log('Loaded bills:', loadedBills.length);
    setBills(loadedBills);
  };

  // Mock activities for demo (will be replaced by real bills)
  const activities = [
    {
      id: 1,
      title: 'Pizza Night',
      merchant: 'Pizza Palace',
      amount: 800,
      type: 'expense',
      date: 'Today, 2:30 PM',
      status: 'settled',
      group: 'College Squad',
      icon: '🍕',
    },
    {
      id: 2,
      title: 'Groceries Run',
      merchant: 'SuperMart',
      amount: 320,
      type: 'expense',
      date: 'Yesterday, 8:10 PM',
      status: 'pending',
      group: 'Roommates',
      icon: '🛒',
    },
    {
      id: 3,
      title: 'Movie Tickets',
      merchant: 'PVR Cinemas',
      amount: 600,
      type: 'expense',
      date: 'Mon, 7:45 PM',
      status: 'pending',
      group: 'College Squad',
      icon: '🎬',
    },
  ];

  const filters = [
    { id: 'all', label: 'All', icon: 'list-outline' },
    { id: 'expenses', label: 'Expenses', icon: 'wallet-outline' },
    { id: 'settled', label: 'Settled', icon: 'checkmark-circle-outline' },
    { id: 'pending', label: 'Pending', icon: 'time-outline' },
  ];

  const filteredActivities = activities.filter(activity => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'expenses') return activity.type === 'expense';
    if (selectedFilter === 'settled') return activity.status === 'settled';
    if (selectedFilter === 'pending') return activity.status === 'pending';
    return true;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.statusIndicators}>
          <View style={[styles.indicator, { backgroundColor: '#10B981' }]} />
          <View style={[styles.indicator, { backgroundColor: '#0EA5E9' }]} />
          <View style={[styles.indicator, { backgroundColor: '#0F172A' }]} />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Activity</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterTab,
                  selectedFilter === filter.id && styles.filterTabActive
                ]}
                onPress={() => setSelectedFilter(filter.id)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.filterIconContainer,
                  selectedFilter === filter.id && styles.filterIconContainerActive
                ]}>
                  <Ionicons 
                    name={filter.icon} 
                    size={20} 
                    color={selectedFilter === filter.id ? '#6366F1' : '#94A3B8'} 
                  />
                </View>
                <Text style={[
                  styles.filterTabText,
                  selectedFilter === filter.id && styles.filterTabTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Activity List */}
        <View style={styles.activityList}>
          {/* Real Bills from AsyncStorage */}
          {bills.length > 0 && (
            <>
              <Text style={styles.sectionLabel}>Recent Bills</Text>
              {bills.slice(0, 5).map((bill) => (
                <TouchableOpacity 
                  key={bill.id} 
                  style={styles.activityCard}
                  activeOpacity={0.8}
                >
                  <View style={styles.activityHeader}>
                    <View style={styles.activityIconContainer}>
                      <Text style={styles.activityEmoji}>{bill.groupEmoji}</Text>
                    </View>
                    <View style={styles.activityInfo}>
                      <Text style={styles.activityTitle}>{bill.title}</Text>
                      <Text style={styles.activityMerchant}>
                        {bill.members.length} people • ₹{bill.splitAmount.toFixed(2)} each
                      </Text>
                    </View>
                    <View style={styles.activityRight}>
                      <Text style={styles.activityAmount}>₹{bill.amount}</Text>
                    </View>
                  </View>
                  <View style={styles.activityFooter}>
                    <View style={styles.groupTag}>
                      <Ionicons name="people" size={11} color="#64748B" />
                      <Text style={styles.groupTagText}>{bill.group}</Text>
                    </View>
                    <View style={styles.activityFooterRight}>
                      <Text style={styles.activityDate}>
                        {new Date(bill.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* Mock Activities (for demo) */}
          {activities.length > 0 && bills.length > 0 && (
            <Text style={styles.sectionLabel}>Demo Activities</Text>
          )}
          
          {filteredActivities.map((activity) => (
            <TouchableOpacity 
              key={activity.id} 
              style={styles.activityCard}
              activeOpacity={0.8}
            >
              <View style={styles.activityHeader}>
                <View style={styles.activityIconContainer}>
                  <Text style={styles.activityEmoji}>{activity.icon}</Text>
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityMerchant}>{activity.merchant}</Text>
                </View>
                <View style={styles.activityRight}>
                  <Text style={styles.activityAmount}>₹{activity.amount}</Text>
                </View>
              </View>
              <View style={styles.activityFooter}>
                <View style={styles.groupTag}>
                  <Ionicons name="people" size={11} color="#64748B" />
                  <Text style={styles.groupTagText}>{activity.group}</Text>
                </View>
                <View style={styles.activityFooterRight}>
                  <View style={[
                    styles.statusBadge,
                    activity.status === 'settled' ? styles.statusSettled : styles.statusPending
                  ]}>
                    <Text style={[
                      styles.statusText,
                      activity.status === 'settled' ? styles.statusTextSettled : styles.statusTextPending
                    ]}>
                      {activity.status === 'settled' ? 'Settled' : 'Pending'}
                    </Text>
                  </View>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 8,
    backgroundColor: '#F8FAFC',
  },
  timeText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  statusIndicators: {
    flexDirection: 'row',
    gap: 3,
  },
  indicator: {
    width: 12,
    height: 6,
    borderRadius: 3,
  },
  scrollContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterContent: {
    gap: 12,
    paddingVertical: 4,
  },
  filterTab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterTabActive: {
    backgroundColor: '#EEF2FF',
    shadowColor: '#6366F1',
    shadowOpacity: 0.15,
    elevation: 2,
  },
  filterIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterIconContainerActive: {
    backgroundColor: '#DDD6FE',
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTabTextActive: {
    color: '#6366F1',
  },
  activityList: {
    paddingHorizontal: 20,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  activityMerchant: {
    fontSize: 11,
    color: '#64748B',
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  groupTagText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  activityFooterRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusSettled: {
    backgroundColor: '#DCFCE7',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 9,
    fontWeight: '600',
  },
  statusTextSettled: {
    color: '#16A34A',
  },
  statusTextPending: {
    color: '#D97706',
  },
  activityDate: {
    fontSize: 10,
    color: '#94A3B8',
  },
  bottomSpacer: {
    height: 20,
  },
});