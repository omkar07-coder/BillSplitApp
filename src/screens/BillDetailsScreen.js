import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BillDetailsScreen({ route }) {
  const { bill } = route.params;

  const shareBill = async () => {
    const shareText = `Bill Split: ${bill.title}\n\nTotal: $${bill.total.toFixed(2)}\nPer Person: $${bill.perPerson.toFixed(2)}\n\nPeople:\n${bill.people.map((person, index) => `${index + 1}. ${person} - $${bill.perPerson.toFixed(2)}`).join('\n')}`;

    try {
      await Share.share({
        message: shareText,
        title: `Bill Split - ${bill.title}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share bill');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{bill.title}</Text>
        <Text style={styles.date}>{new Date(bill.date).toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bill Breakdown</Text>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Subtotal</Text>
          <Text style={styles.breakdownValue}>${bill.subtotal.toFixed(2)}</Text>
        </View>
        {bill.tip > 0 && (
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Tip</Text>
            <Text style={styles.breakdownValue}>${bill.tip.toFixed(2)}</Text>
          </View>
        )}
        {bill.tax > 0 && (
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Tax</Text>
            <Text style={styles.breakdownValue}>${bill.tax.toFixed(2)}</Text>
          </View>
        )}
        <View style={[styles.breakdownItem, styles.totalItem]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${bill.total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Split Details</Text>
        <View style={styles.splitSummary}>
          <Text style={styles.splitText}>
            Split between {bill.people.length} people
          </Text>
          <Text style={styles.perPersonAmount}>
            ${bill.perPerson.toFixed(2)} per person
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>People</Text>
        {bill.people.map((person, index) => (
          <View key={index} style={styles.personItem}>
            <View style={styles.personInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {person.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.personName}>{person}</Text>
            </View>
            <Text style={styles.personAmount}>${bill.perPerson.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={shareBill}>
        <Ionicons name="share-outline" size={20} color="white" />
        <Text style={styles.shareButtonText}>Share Bill</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  breakdownLabel: {
    fontSize: 16,
    color: '#666',
  },
  breakdownValue: {
    fontSize: 16,
    color: '#333',
  },
  totalItem: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  splitSummary: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  splitText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  perPersonAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  personItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  personName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  personAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  shareButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});