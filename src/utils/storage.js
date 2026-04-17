import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  GROUPS: 'groups',
  BILLS: 'bills',
};

// ==================== GROUPS ====================

/**
 * Save a new group to AsyncStorage
 * @param {Object} group - Group object {id, name, emoji, members, createdAt}
 * @returns {Promise<boolean>} - Success status
 */
export const saveGroup = async (group) => {
  try {
    // Get existing groups
    const existingGroups = await getGroups();
    
    // Add new group
    const updatedGroups = [group, ...existingGroups];
    
    // Save to AsyncStorage
    await AsyncStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(updatedGroups));
    
    console.log('✅ Group saved successfully:', group.name);
    return true;
  } catch (error) {
    console.error('❌ Error saving group:', error);
    return false;
  }
};

/**
 * Get all groups from AsyncStorage
 * @returns {Promise<Array>} - Array of group objects
 */
export const getGroups = async () => {
  try {
    const groupsJson = await AsyncStorage.getItem(STORAGE_KEYS.GROUPS);
    
    if (groupsJson) {
      const groups = JSON.parse(groupsJson);
      console.log(`📦 Loaded ${groups.length} groups from storage`);
      return groups;
    }
    
    console.log('📦 No groups found, returning empty array');
    return [];
  } catch (error) {
    console.error('❌ Error loading groups:', error);
    return [];
  }
};

/**
 * Get a single group by ID
 * @param {string} groupId - Group ID
 * @returns {Promise<Object|null>} - Group object or null
 */
export const getGroupById = async (groupId) => {
  try {
    const groups = await getGroups();
    const group = groups.find(g => g.id === groupId);
    return group || null;
  } catch (error) {
    console.error('❌ Error getting group by ID:', error);
    return null;
  }
};

/**
 * Update an existing group
 * @param {string} groupId - Group ID to update
 * @param {Object} updates - Fields to update
 * @returns {Promise<boolean>} - Success status
 */
export const updateGroup = async (groupId, updates) => {
  try {
    const groups = await getGroups();
    const groupIndex = groups.findIndex(g => g.id === groupId);
    
    if (groupIndex === -1) {
      console.error('❌ Group not found:', groupId);
      return false;
    }
    
    // Update group
    groups[groupIndex] = {
      ...groups[groupIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    // Save back to storage
    await AsyncStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
    
    console.log('✅ Group updated successfully:', groupId);
    return true;
  } catch (error) {
    console.error('❌ Error updating group:', error);
    return false;
  }
};

/**
 * Delete a group
 * @param {string} groupId - Group ID to delete
 * @returns {Promise<boolean>} - Success status
 */
export const deleteGroup = async (groupId) => {
  try {
    const groups = await getGroups();
    const filteredGroups = groups.filter(g => g.id !== groupId);
    
    await AsyncStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(filteredGroups));
    
    console.log('✅ Group deleted successfully:', groupId);
    return true;
  } catch (error) {
    console.error('❌ Error deleting group:', error);
    return false;
  }
};

// ==================== BILLS ====================

/**
 * Save a new bill to AsyncStorage
 * @param {Object} bill - Bill object
 * @returns {Promise<boolean>} - Success status
 */
export const saveBill = async (bill) => {
  try {
    const existingBills = await getBills();
    const updatedBills = [bill, ...existingBills];
    
    await AsyncStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(updatedBills));
    
    console.log('✅ Bill saved successfully:', bill.title);
    return true;
  } catch (error) {
    console.error('❌ Error saving bill:', error);
    return false;
  }
};

/**
 * Get all bills from AsyncStorage
 * @returns {Promise<Array>} - Array of bill objects
 */
export const getBills = async () => {
  try {
    const billsJson = await AsyncStorage.getItem(STORAGE_KEYS.BILLS);
    
    if (billsJson) {
      const bills = JSON.parse(billsJson);
      console.log(`📦 Loaded ${bills.length} bills from storage`);
      return bills;
    }
    
    return [];
  } catch (error) {
    console.error('❌ Error loading bills:', error);
    return [];
  }
};

/**
 * Get bills for a specific group
 * @param {string} groupName - Group name
 * @returns {Promise<Array>} - Array of bill objects
 */
export const getBillsByGroup = async (groupName) => {
  try {
    const bills = await getBills();
    return bills.filter(bill => bill.group === groupName);
  } catch (error) {
    console.error('❌ Error getting bills by group:', error);
    return [];
  }
};

/**
 * Delete a bill
 * @param {string} billId - Bill ID to delete
 * @returns {Promise<boolean>} - Success status
 */
export const deleteBill = async (billId) => {
  try {
    const bills = await getBills();
    const filteredBills = bills.filter(b => b.id !== billId);
    
    await AsyncStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(filteredBills));
    
    console.log('✅ Bill deleted successfully:', billId);
    return true;
  } catch (error) {
    console.error('❌ Error deleting bill:', error);
    return false;
  }
};

// ==================== UTILITY ====================

/**
 * Clear all data from AsyncStorage (use with caution!)
 * @returns {Promise<boolean>} - Success status
 */
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.GROUPS, STORAGE_KEYS.BILLS]);
    console.log('✅ All data cleared');
    return true;
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    return false;
  }
};

/**
 * Get all storage data (for debugging)
 * @returns {Promise<Object>} - All data
 */
export const getAllData = async () => {
  try {
    const groups = await getGroups();
    const bills = await getBills();
    
    return {
      groups,
      bills,
      totalGroups: groups.length,
      totalBills: bills.length,
    };
  } catch (error) {
    console.error('❌ Error getting all data:', error);
    return null;
  }
};
