import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import CreateBillScreen from './src/screens/CreateBillScreen';
import CreateGroupScreen from './src/screens/CreateGroupScreen';
import GroupDetailsScreen from './src/screens/GroupDetailsScreen';
import ScanBillScreen from './src/screens/ScanBillScreen';
import ScanTabScreen from './src/screens/ScanTabScreen';
import ReviewBillScreen from './src/screens/ReviewBillScreen';
import BillDetailsScreen from './src/screens/BillDetailsScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ChatScreen from './src/screens/ChatScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CreateBill" 
        component={CreateBillScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CreateGroup" 
        component={CreateGroupScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="GroupDetails" 
        component={GroupDetailsScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ScanBill" 
        component={ScanBillScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ReviewBill" 
        component={ReviewBillScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="BillDetails" 
        component={BillDetailsScreen} 
        options={{ title: 'Bill Details' }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  console.log('App.js rendering...');
  
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Activity') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6366F1',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarStyle: {
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
        })}
      >
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStack} 
          options={{ title: 'Home', headerShown: false }}
        />
        <Tab.Screen 
          name="Activity" 
          component={HistoryScreen} 
          options={{ title: 'Activity', headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}