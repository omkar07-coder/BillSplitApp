import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ScanBillScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');
  const [cameraMode, setCameraMode] = useState('bill'); // 'selfie' or 'bill'
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Request permission on mount if not determined
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    // Animated scanning line
    if (!isProcessing && permission?.granted) {
      Animated.loop(
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
      ).start();
    }
  }, [isProcessing, permission?.granted]);

  const takePicture = async () => {
    if (cameraRef.current && !isProcessing) {
      setIsProcessing(true);
      
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        // Simulate processing
        setTimeout(() => {
          setIsProcessing(false);
          navigation.navigate('ReviewBill', {
            billData: {
              merchant: 'Pizza Palace',
              totalAmount: 800.00,
              date: 'Today, Jan 22, 2024',
              items: [
                { name: 'Margherita Pizza', quantity: 2, price: 350, total: 700 },
                { name: 'Garlic Bread', quantity: 1, price: 100, total: 100 },
              ],
            },
          });
        }, 1800);
      } catch (error) {
        console.error('Error taking picture:', error);
        setIsProcessing(false);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        navigation.navigate('ReviewBill', {
          billData: {
            merchant: 'Pizza Palace',
            totalAmount: 800.00,
            date: 'Today, Jan 22, 2024',
            items: [
              { name: 'Margherita Pizza', quantity: 2, price: 350, total: 700 },
              { name: 'Garlic Bread', quantity: 1, price: 100, total: 100 },
            ],
          },
        });
      }, 1800);
    }
  };

  const toggleFlash = () => {
    setFlash(flash === 'off' ? 'torch' : 'off');
  };

  const switchToSelfie = () => {
    setCameraMode('selfie');
    setFacing('front');
  };

  const switchToBill = () => {
    setCameraMode('bill');
    setFacing('back');
  };

  const flipCamera = () => {
    setFacing(facing === 'back' ? 'front' : 'back');
    setCameraMode(facing === 'back' ? 'selfie' : 'bill');
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#A855F7" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="white" />
          </TouchableOpacity>
          
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

        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Camera permission denied</Text>
          <Text style={styles.permissionSubtitle}>Allow camera or use HTTPS</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={pickImage}>
            <Ionicons name="images" size={20} color="white" />
          </TouchableOpacity>
          
          <View style={styles.captureButtonOuter}>
            <View style={styles.captureButtonInner} />
          </View>
          
          <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
            <Ionicons 
              name={flash === 'off' ? "flash-off" : "flash"} 
              size={20} 
              color={flash === 'off' ? "white" : "#FCD34D"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 176],
  });

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        flash={flash}
        ref={cameraRef}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="white" />
          </TouchableOpacity>
          
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

        {/* Scan Frame */}
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

        {/* Controls */}
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
              flash !== 'off' && styles.flashActive
            ]} 
            onPress={toggleFlash}
          >
            <Ionicons 
              name={flash === 'off' ? "flash-off" : "flash"} 
              size={20} 
              color={flash === 'off' ? "white" : "#FCD34D"}
            />
          </TouchableOpacity>
        </View>
      </CameraView>

      {/* Processing Overlay */}
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
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
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
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#E879F9',
    shadowColor: '#E879F9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
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
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 8,
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
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  permissionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F87171',
    marginBottom: 4,
    textAlign: 'center',
  },
  permissionSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
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
