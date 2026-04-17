import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BillCard({ bill, onPress, onDelete, showDelete = true }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {bill.title}
        </Text>
        {showDelete && (
          <TouchableOpacity
            onPress={onDelete}
            style={styles.deleteButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.amount}>${bill.total.toFixed(2)}</Text>
      
      <View style={styles.details}>
        <Text style={styles.people}>
          <Ionicons name="people-outline" size={14} color="#666" /> {bill.people.length} people
        </Text>
        <Text style={styles.perPerson}>
          ${bill.perPerson.toFixed(2)} each
        </Text>
      </View>
      
      <Text style={styles.date}>
        {new Date(bill.date).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    padding: 4,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  people: {
    fontSize: 14,
    color: '#666',
  },
  perPerson: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});