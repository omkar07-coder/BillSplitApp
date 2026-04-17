import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AIAssistantModal from '../components/AIAssistantModal';

export default function HomeScreen({ navigation }) {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const groups = [
    {
      name: "College Squad",
      members: 4,
      status: "You owe",
      amount: "₹150",
      tone: "negative",
      icon: "👨‍🎓",
      active: true,
    },
    {
      name: "Roommates",
      members: 3,
      status: "You get",
      amount: "₹450",
      tone: "positive",
      icon: "🏠",
      active: false,
    },
  ];

  const activity = [
    {
      title: "Pizza Night",
      subtitle: "Ram paid • ₹200 per person",
      amount: "₹800",
      tone: "positive",
      time: "Today, 2:30 PM",
    },
    {
      title: "Groceries Run",
      subtitle: "You paid • split between 3",
      amount: "₹320",
      tone: "neutral",
      time: "Yesterday, 8:10 PM",
    },
    {
      title: "Movie Tickets",
      subtitle: "Priya covered • settle up this week",
      amount: "₹600",
      tone: "negative",
      time: "Mon, 7:45 PM",
    },
  ];

  const quickActions = [
    {
      id: "add-expense",
      label: "Add Expense",
      bg: "#EEF2FF",
      iconBg: "#6366F1",
      icon: "add",
      onPress: () => navigation.navigate('CreateBill'),
    },
    {
      id: "create-group",
      label: "Create Group",
      bg: "#F0F9FF",
      iconBg: "#0EA5E9",
      icon: "people",
      onPress: () => navigation.navigate('CreateGroup'),
    },
    {
      id: "scan-bill",
      label: "Scan Bill",
      bg: "#ECFDF5",
      iconBg: "#059669",
      icon: "camera",
      onPress: () => navigation.navigate('ScanBill'),
    },
    {
      id: "ask-ai",
      label: "Ask AI",
      bg: "#FDF4FF",
      iconBg: "#A855F7",
      icon: "chatbubble-ellipses",
      onPress: () => setIsAIChatOpen(true),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* AI Assistant Modal */}
      <AIAssistantModal 
        visible={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)} 
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.statusIndicators}>
            <View style={[styles.indicator, { backgroundColor: '#10B981' }]} />
            <View style={[styles.indicator, { backgroundColor: '#0EA5E9' }]} />
            <View style={[styles.indicator, { backgroundColor: '#0F172A' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greetingText}>Good evening, Raj</Text>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Your bill hub</Text>
              <Text style={styles.waveEmoji}>👋</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.profileContainer}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileText}>R</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Scan Bill Card */}
        <TouchableOpacity 
          style={styles.scanCard}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ScanBill')}
        >
          <View style={styles.scanCardContent}>
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={24} color="#FF6B35" />
            </View>
            <View style={styles.scanTextContainer}>
              <Text style={styles.quickActionText}>
                Quick action
              </Text>
              <Text style={styles.scanTitleText}>
                Scan a bill
              </Text>
              <Text style={styles.scanSubtitleText}>
                Capture a receipt and let AI split it in seconds.
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions Grid */}
        <View style={styles.actionGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionButton, { backgroundColor: action.bg }]}
              onPress={action.onPress}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: action.iconBg }]}>
                <Ionicons name={action.icon} size={16} color="white" />
              </View>
              <Text style={styles.actionButtonText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* My Groups Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Groups</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.groupsGrid}>
            {groups.map((group) => (
              <TouchableOpacity 
                key={group.name} 
                style={styles.groupCard} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('GroupDetails', {
                  groupName: group.name,
                  emoji: group.icon,
                  members: ['You (Raj)', 'Ram', 'Priya', 'Amit'],
                })}
              >
                <View style={styles.groupCardHeader}>
                  <View style={styles.groupInfo}>
                    <View style={styles.groupIconContainer}>
                      <Text style={styles.groupIcon}>{group.icon}</Text>
                    </View>
                    <Text style={styles.groupName}>{group.name}</Text>
                  </View>
                  {group.active && (
                    <View style={styles.activeTag}>
                      <Text style={styles.activeTagText}>Active</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.groupMembers}>{group.members} members</Text>
                <Text style={[
                  styles.groupAmount,
                  { color: group.tone === 'positive' ? '#10B981' : '#EF4444' }
                ]}>
                  {group.status} {group.amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.lastSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activityList}>
            {activity.map((item, index) => (
              <TouchableOpacity key={index} style={styles.activityItem} activeOpacity={0.8}>
                <View style={styles.activityContent}>
                  <View style={styles.activityIndicator}>
                    <View style={[
                      styles.activityDot,
                      {
                        backgroundColor: 
                          item.tone === 'positive' ? '#10B981' :
                          item.tone === 'negative' ? '#EF4444' : '#94A3B8'
                      }
                    ]} />
                  </View>
                  <View style={styles.activityDetails}>
                    <Text style={styles.activityTitle}>
                      {item.title} • {item.amount}
                    </Text>
                    <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
                    <Text style={styles.activityTime}>{item.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: 35,
    paddingBottom: 4,
  },
  timeText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  statusIndicators: {
    flexDirection: 'row',
    gap: 3,
  },
  indicator: {
    width: 10,
    height: 3,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  greetingText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  waveEmoji: {
    fontSize: 16,
  },
  profileContainer: {
    padding: 1,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  scanCard: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  scanCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  scanTextContainer: {
    flex: 1,
  },
  quickActionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 9,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  scanTitleText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  scanSubtitleText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 9,
    lineHeight: 12,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 4,
  },
  actionButton: {
    width: '48%',
    aspectRatio: 1.2,
    borderRadius: 12,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionButtonText: {
    fontSize: 9,
    fontWeight: '500',
    color: '#475569',
    textAlign: 'center',
  },
  section: {
    marginBottom: 6,
  },
  lastSection: {
    marginBottom: 70,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '500',
  },
  groupsGrid: {
    flexDirection: 'row',
    gap: 6,
  },
  groupCard: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  groupCardHeader: {
    marginBottom: 3,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  groupIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupIcon: {
    fontSize: 10,
  },
  groupName: {
    fontSize: 9,
    fontWeight: '600',
    color: '#0F172A',
  },
  activeTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  activeTagText: {
    fontSize: 8,
    color: '#D97706',
    fontWeight: '500',
  },
  groupMembers: {
    fontSize: 8,
    color: '#64748B',
    marginBottom: 4,
  },
  groupAmount: {
    fontSize: 9,
    fontWeight: '600',
  },
  activityList: {
    gap: 4,
  },
  activityItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  activityIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  activityDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 1,
  },
  activitySubtitle: {
    fontSize: 9,
    color: '#64748B',
    marginBottom: 1,
  },
  activityTime: {
    fontSize: 8,
    color: '#94A3B8',
  },
});