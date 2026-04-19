import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

// Register the root component for React Native / Expo web
AppRegistry.registerComponent('main', () => App);

// If we're running in a browser, run the app and attach to #root
if (typeof document !== 'undefined') {
  const rootTag = document.getElementById('root') || document.body.appendChild(document.createElement('div'));
  AppRegistry.runApplication('main', { rootTag });
}
