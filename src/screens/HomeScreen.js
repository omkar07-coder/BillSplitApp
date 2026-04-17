import React, { useState, useEffect } from 'react';
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
import { getGroups } from '../utils/storage';
import AIAssistantModal from '../components/AIAssistantModal';

export default function HomeScreen({ navigation }) {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  // Load groups from AsyncStorage when screen focuses
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadGroups();
    });

    // Load groups on initial mount
    loadGroups();

    return unsubscribe;
  }, [navigation]);

  const loadGroups = async () => {
    const loadedGroups = await getGroups();
    console.log('Loaded groups:', loadedGroups);
    setGroups(loadedGroups);
  };

  const quickActions = [
    {
      id: 'add-expense',
      label: 'Add Expense',
      description: 'Quick split',
      gradient: ['#6366F1', '#8B5CF6'],
      icon: 'add-circle',
      onPress: () => navigation.navigate('CreateBill'),
    },
    {
      id: 'create-group',
      label: 'Create Group',
      description: 'New squad',
      gradient: ['#0EA5E9', '#06B6D4'],
      icon: 'people',
      onPress: () => navigation.navigate('CreateGroup'),
    },
    {
      id: 'scan-bill',
      label: 'Scan Bill',
      description: 'AI powered',
      gradient: ['#10B981', '#059669'],
      icon: 'camera',
      onPress: () => navigation.navigate('ScanBill'),
    },
    {
      id: 'ask-ai',
      label: 'Ask AI',
      description: 'Get insights',
      gradient: ['#A855F7', '#C026D3'],
      icon: 'chatbubble-ellipses-outline',
      onPress: () => navigation.navigate('Chat'),
    },
  ];

  const activity = [
    {
      title: 'Pizza Night',
      subtitle: 'Ram paid • ₹200 per person',
      amount: '₹800',
      tone: 'positive',
      time: 'Today, 2:30 PM',
    },
    {
      title: 'Groceries Run',
      subtitle: 'You paid • split between 3',
      amount: '₹320',
      tone: 'neutral',
      time: 'Yesterday, 8:10 PM',
    },
    {
      title: 'Movie Tickets',
      subtitle: 'Priya covered • settle up this week',
      amount: '₹600',
      tone: 'negative',
      time: 'Mon, 7:45 PM',
    },
  ];

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <AIAssistantModal 
        visible={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)} 
      />
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greetingText}>{getCurrentGreeting()}, Raj 👋</Text>
            <Text style={styles.subtitleText}>Manage your expenses</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.profileGradient}
            >
              <Text style={styles.profileText}>R</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick Action Banner */}
        <TouchableOpacity 
          style={styles.bannerContainer}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ScanBill')}
        >
          <LinearGradient
            colors={['#6366F1', '#8B5CF6', '#A855F7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <View style={styles.bannerContent}>
              <View style={styles.bannerIconContainer}>
                <View style={styles.bannerIcon}>
                  <Ionicons name="camera" size={28} color="#FF6B35" />
                </View>
              </View>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerLabel}>QUICK ACTION</Text>
                <Text style={styles.bannerTitle}>Scan a bill</Text>
                <Text style={styles.bannerSubtitle}>
                  Capture a receipt and let AI split it in seconds
                </Text>
              </View>
            </View>
            <View style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Scan Now</Text>
              <Ionicons name="arrow-forward" size={16} color="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Action Cards Grid */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={action.onPress}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={action.gradient}
                  style={styles.actionGradient}
                >
                  <View style={styles.actionIconContainer}>
                    <Ionicons name={action.icon} size={22} color="white" />
                  </View>
                </LinearGradient>
                <Text style={styles.actionLabel}>{action.label}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* My Groups Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Groups</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.groupsScrollContent}
          >
            {groups.length > 0 ? (
              groups.map((group) => (
                <TouchableOpacity 
                  key={group.id} 
                  style={styles.groupCard} 
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('GroupDetails', {
                    groupId: group.id,
                    groupName: group.name,
                    emoji: group.emoji,
                    members: group.members,
                  })}
                >
                  <View style={styles.groupCardHeader}>
                    <View style={styles.groupInfo}>
                      <View style={styles.groupIconContainer}>
                        <Text style={styles.groupIcon}>{group.emoji}</Text>
                      </View>
                      <Text style={styles.groupName}>{group.name}</Text>
                    </View>
                    {group.active && (
                      <View style={styles.activeTag}>
                        <Text style={styles.activeTagText}>Active</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.groupMembers}>{group.members.length} members</Text>
                  <Text style={styles.groupAmount}>
                    Tap to view details
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyGroupsContainer}>
                <Ionicons name="people-outline" size={48} color="#CBD5E1" />
                <Text style={styles.emptyGroupsText}>No groups yet</Text>
                <Text style={styles.emptyGroupsSubtext}>Create your first group to start tracking expenses</Text>
                <TouchableOpacity 
                  style={styles.createGroupButton}
                  onPress={() => navigation.navigate('CreateGroup')}
                >
                  <Text style={styles.createGroupButtonText}>Create Group</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
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
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  subtitleText: {
    fontSize: 13,
    color: '#64748B',
  },
  profileButton: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  profileGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  bannerContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  banner: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bannerIconContainer: {
    marginRight: 12,
  },
  bannerIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1,
    marginBottom: 2,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 16,
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  bannerButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
  },
  actionsSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  actionGradient: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionIconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  lastSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  seeAllText: {
    fontSize: 13,
    color: '#6366F1',
    fontWeight: '600',
  },
  groupsScrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  groupCard: {
    width: 180,
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  groupCardHeader: {
    marginBottom: 6,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  groupIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupIcon: {
    fontSize: 14,
  },
  groupName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  activeTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  activeTagText: {
    fontSize: 9,
    color: '#D97706',
    fontWeight: '600',
  },
  groupMembers: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 6,
  },
  groupAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  emptyGroupsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 40,
    minWidth: 300,
  },
  emptyGroupsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
  },
  emptyGroupsSubtext: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 8,
    textAlign: 'center',
  },
  createGroupButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 16,
  },
  createGroupButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  activityList: {
    gap: 10,
  },
  activityItem: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  activityIndicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  activityDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 3,
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 3,
  },
  activityTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
});
