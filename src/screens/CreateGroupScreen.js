import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { saveGroup } from '../utils/storage';

export default function CreateGroupScreen({ navigation }) {
  const [selectedEmoji, setSelectedEmoji] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState('');

  const emojis = ['👨‍🎓', '🏠', '✈️', '🍺', '🏖️', '🍕', '🎮', '⚽'];

  const removeMember = (name) => {
    setMembers((prev) => prev.filter((m) => m !== name));
  };

  const addMember = () => {
    if (!newMemberName.trim()) {
      Alert.alert('Error', 'Please enter a member name');
      return;
    }
    
    if (members.includes(newMemberName.trim())) {
      Alert.alert('Error', 'Member already exists');
      return;
    }
    
    setMembers((prev) => [...prev, newMemberName.trim()]);
    setNewMemberName('');
  };

  const createGroup = async () => {
    console.log('Creating group...');
    
    if (!groupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }
    
    if (members.length === 0) {
      Alert.alert('Error', 'Please add at least one member');
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
    
    console.log('Saving group:', newGroup);
    
    // Save to AsyncStorage
    const success = await saveGroup(newGroup);
    
    console.log('Save result:', success);
    
    if (success) {
      // Show success message and navigate back
      Alert.alert(
        'Success', 
        'Group created successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('Navigating to Home...');
              navigation.popToTop(); // Go back to the first screen in stack
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('Error', 'Failed to create group. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4338CA" />
      
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.statusIndicators}>
          <View style={[styles.indicator, { backgroundColor: '#10B981' }]} />
          <View style={[styles.indicator, { backgroundColor: '#0EA5E9' }]} />
          <View style={[styles.indicator, { backgroundColor: '#1F2937' }]} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Create Group</Text>
            <Text style={styles.stepText}>Step 1 of 2</Text>
          </View>
        </View>

        {/* Group Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Group Name</Text>
          <TextInput
            style={styles.textInput}
            value={groupName}
            onChangeText={setGroupName}
            placeholder="e.g., Roommates, Trip Squad"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Emoji Selector */}
        <View style={styles.section}>
          <Text style={styles.label}>Choose an Emoji</Text>
          <View style={styles.emojiGrid}>
            {emojis.map((emoji, index) => (
              <TouchableOpacity
                key={emoji}
                style={[
                  styles.emojiButton,
                  selectedEmoji === index && styles.emojiButtonSelected
                ]}
                onPress={() => setSelectedEmoji(index)}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Members List */}
        <View style={styles.section}>
          <Text style={styles.label}>Members</Text>
          
          {/* Owner */}
          <View style={styles.memberItem}>
            <Text style={styles.memberName}>You (Raj)</Text>
            <View style={styles.ownerBadge}>
              <Text style={styles.ownerText}>Owner</Text>
            </View>
          </View>

          {/* Other Members */}
          {members.map((name, index) => (
            <View key={`${name}-${index}`} style={styles.memberItem}>
              <Text style={styles.memberName}>{name}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeMember(name)}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Add Person Input */}
          <View style={styles.addMemberContainer}>
            <TextInput
              style={styles.memberInput}
              value={newMemberName}
              onChangeText={setNewMemberName}
              placeholder="Enter member name"
              placeholderTextColor="#9CA3AF"
              onSubmitEditing={addMember}
            />
            <TouchableOpacity style={styles.addButton} onPress={addMember}>
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Create Group Button */}
        <TouchableOpacity style={styles.createButton} onPress={createGroup}>
          <Text style={styles.createButtonText}>Create Group</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4338CA',
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
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  stepText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
    color: '#1F2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emojiButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emojiButtonSelected: {
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  emojiText: {
    fontSize: 18,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  memberName: {
    fontSize: 12,
    color: '#1F2937',
  },
  ownerBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ownerText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#4B5563',
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  addPersonButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  addPersonText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#4B5563',
  },
  addMemberContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  memberInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
    color: '#1F2937',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});