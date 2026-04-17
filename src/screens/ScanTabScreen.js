import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Platform,
  Modal,
  Linking,
  Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function ScanTabScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [type, setType] = useState('back');
  const [flashMode, setFlashMode] = useState('off');
  const [cameraMode, setCameraMode] = useState('bill');
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      checkCameraPermission();
    }, [])
  );

  const checkCameraPermission = async () => {
    try {
      const { status } = await Camera.getCameraPermissionsAsync();
      console.log('Camera permission status:', status);
      
      if (status === 'granted') {
        setHasPermission(true);
        setShowPermissionModal(false);
      } else if (status === 'undetermined') {
        setHasPermission(null);
        setShowPermissionModal(true);
      } else {
        setHasPermission(false);
        setShowPermissionModal(false);
      }
    } catch (error) {
      console.error('Error checking camera permission:', error);
      setHasPermission(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      setShowPermissionModal(false);
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log('Permission request result:', status);
      setHasPermission(status === 'granted');
    } catch (error) {
      console.error('Error requesting permission:', error);
      setHasPermission(false);
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  useEffect(() => {
    if (!isProcessing && hasPermission === true) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      
      return () => {
        animation.stop();
      };
    }
  }, [isProcessing, hasPermission]);

  const takePicture = async () => {
    if (cameraRef.current && !isProcessing) {
      setIsProcessing(true);
      
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        
        console.log('Photo taken:', photo.uri);
        
        setTimeout(() => {
          setIsProcessing(false);
          navigation.navigate('HomeTab', {
            screen: 'ReviewBill',
            params: {
              billData: {
                merchant: 'Pizza Palace',
                totalAmount: 800.00,
                date: 'Today, Jan 22, 2024',
                items: [
                  { name: 'Margherita Pizza', quantity: 2, price: 350, total: 700 },
                  { name: 'Garlic Bread', quantity: 1, price: 100, total: 100 },
                ],
              },
            },
          });
        }, 1800);
      } catch (error) {
        console.error('Error taking picture:', error);
        setIsProcessing(false);
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          navigation.navigate('HomeTab', {
            screen: 'ReviewBill',
            params: {
              billData: {
                merchant: 'Pizza Palace',
                totalAmount: 800.00,
                date: 'Today, Jan 22, 2024',
                items: [
                  { name: 'Margherita Pizza', quantity: 2, price: 350, total: 700 },
                  { name: 'Garlic Bread', quantity: 1, price: 100, total: 100 },
                ],
              },
            },
          });
        }, 1800);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const toggleFlash = () => {
    setFlashMode(flashMode === 'off' ? 'torch' : 'off');
  };

  const switchToSelfie = () => {
    setCameraMode('selfie');
    setType('front');
  };

  const switchToBill = () => {
    setCameraMode('bill');
    setType('back');
  };

  const flipCamera = () => {
    setType(type === 'back' ? 'front' : 'back');
    setCameraMode(type === 'back' ? 'selfie' : 'bill');
  };

  // STATE 1: Permission undetermined - show modal on dark background
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Modal
          visible={showPermissionModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            setShowPermissionModal(false);
            setHasPermission(false);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalIconContainer}>
                <Ionicons name="camera" size={48} color="#6366F1" />
              </View>
              <Text style={styles.modalTitle}>Camera Access Required</Text>
              <Text style={styles.modalText}>
                BillSplit needs access to your camera to scan bills and receipts.
              </Text>
              <TouchableOpacity 
                style={styles.modalAllowButton}
                onPress={requestCameraPermission}
              >
                <Text style={styles.modalAllowButtonText}>Allow Camera Access</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalDenyButton}
                onPress={() => {
                  setShowPermissionModal(false);
                  setHasPermission(false);
                }}
              >
                <Text style={styles.modalDenyButtonText}>Not Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A855F7" />
          <Text style={styles.loadingText}>Checking camera access...</Text>
        </View>
      </View>
    );
  }

  // STATE 2: Permission denied - show settings screen
  if (hasPermission === false) {
    return (
      <View style={styles.permissionDeniedContainer}>
        <View style={styles.permissionDeniedContent}>
          <View style={styles.cameraIconLarge}>
            <Ionicons name="camera-off" size={60} color="#EF4444" />
          </View>
          <Text style={styles.permissionDeniedTitle}>Camera Access Denied</Text>
          <Text style={styles.permissionDeniedText}>
            To scan bills, please enable camera access in your device settings.
          </Text>
          <TouchableOpacity style={styles.settingsButton} onPress={openSettings}>
            <Ionicons name="settings-outline" size={20} color="white" />
            <Text style={styles.settingsButtonText}>Open Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
            <Ionicons name="images-outline" size={20} color="#6366F1" />
            <Text style={styles.galleryButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // STATE 3: Permission granted - show camera
  // Move interpolation here, after all early returns
  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 176],
  });

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type}
        flashMode={flashMode}
        ref={cameraRef}
      >
        <View style={styles.header}>
          <View style={styles.headerButton} />
          
          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[styles.modeButton, cameraMode === 'selfie' && styles.modeButtonActive]}
              onPress={switchToSelfie}
            >
              <Text style={[styles.modeText, cameraMode === 'selfie' && styles.modeTextActive]}>
                Selfie
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, cameraMode === 'bill' && styles.modeButtonActive]}
              onPress={switchToBill}
            >
              <Text style={[styles.modeText, cameraMode === 'bill' && styles.modeTextActive]}>
                Bill
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.headerButton} onPress={flipCamera}>
            <Ionicons name="camera-reverse" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.scanFrameContainer}>
          <View style={styles.scanFrame}>
            {!isProcessing && (
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [{ translateY: scanLineTranslateY }],
                  },
                ]}
              />
            )}
            <View style={styles.scanTextContainer}>
              <Text style={styles.scanTitle}>POSITION BILL</Text>
              <Text style={styles.scanSubtitle}>Good lighting ✨</Text>
            </View>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={pickImage}>
            <Ionicons name="images" size={20} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.captureButtonOuter} 
            onPress={takePicture}
            disabled={isProcessing}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.controlButton,
              flashMode !== 'off' && styles.flashActive
            ]} 
            onPress={toggleFlash}
          >
            <Ionicons 
              name={flashMode === 'off' ? "flash-off" : "flash"} 
              size={20} 
              color={flashMode === 'off' ? "white" : "#FCD34D"}
            />
          </TouchableOpacity>
        </View>
      </Camera>

      {isProcessing && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator size="large" color="#A855F7" />
          <Text style={styles.processingTitle}>Processing...</Text>
          <Text style={styles.processingSubtitle}>Extracting bill details ✨</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 14,
    marginTop: 16,
  },
  permissionDeniedContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  permissionDeniedContent: {
    alignItems: 'center',
    maxWidth: 320,
  },
  cameraIconLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  permissionDeniedTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionDeniedText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 12,
  },
  settingsButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#6366F1',
  },
  galleryButtonText: {
    color: '#6366F1',
    fontSize: 15,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  modalAllowButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalAllowButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  modalDenyButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  modalDenyButtonText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 4,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modeButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  modeButtonActive: {
    backgroundColor: '#A855F7',
  },
  modeText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  modeTextActive: {
    color: 'white',
  },
  scanFrameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 144,
    height: 192,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(167, 139, 250, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#E879F9',
  },
  scanTextContainer: {
    alignItems: 'center',
  },
  scanTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 2,
  },
  scanSubtitle: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 24,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  flashActive: {
    backgroundColor: 'rgba(252, 211, 77, 0.3)',
    borderColor: 'rgba(252, 211, 77, 0.5)',
  },
  captureButtonOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  captureButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#0a0a0f',
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  processingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginTop: 12,
  },
  processingSubtitle: {
    fontSize: 11,
    color: 'rgba(167, 139, 250, 0.8)',
    marginTop: 4,
  },
});
