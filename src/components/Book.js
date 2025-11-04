import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text, Alert } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import BookPage from './BookPage';

const { width, height } = Dimensions.get('window');

const Book = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoRead, setIsAutoRead] = useState(false);
  const rotateY = useSharedValue(0);
  const [sound, setSound] = useState();
  const autoReadIntervalRef = useRef(null);

  // Load page turn sound effect (we'll create a simple one)
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Auto-read mode
  useEffect(() => {
    if (isAutoRead && currentPage < pages.length - 1) {
      // Speak current page text
      const textToSpeak = `${pages[currentPage].text}. ${pages[currentPage].content}`;
      Speech.speak(textToSpeak, {
        language: 'en-US',
        pitch: 1.2,
        rate: 0.8,
        onDone: () => {
          // After speech is done, wait a bit and turn page
          setTimeout(() => {
            if (currentPage < pages.length - 1) {
              turnPage('next');
            } else {
              setIsAutoRead(false);
            }
          }, 1000);
        },
      });
    }

    return () => {
      if (!isAutoRead) {
        Speech.stop();
      }
    };
  }, [isAutoRead, currentPage]);

  const playPageTurnSound = async () => {
    try {
      // Create a simple beep sound for page turn
      const { sound: pageSound } = await Audio.Sound.createAsync(
        // Using a simple beep - in production, you'd load a custom sound file
        { uri: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFAtIoOPu' },
        { shouldPlay: true }
      );
      setSound(pageSound);
      // Unload after playing
      setTimeout(() => pageSound.unloadAsync(), 1000);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const turnPage = (direction) => {
    if (direction === 'next' && currentPage < pages.length - 1) {
      playPageTurnSound();
      rotateY.value = withTiming(-180, { duration: 600 }, () => {
        runOnJS(setCurrentPage)(currentPage + 1);
        rotateY.value = 0;
      });
    } else if (direction === 'prev' && currentPage > 0) {
      playPageTurnSound();
      rotateY.value = withTiming(180, { duration: 600 }, () => {
        runOnJS(setCurrentPage)(currentPage - 1);
        rotateY.value = 0;
      });
    }
  };

  const onGestureEvent = (event) => {
    const { translationX } = event.nativeEvent;

    if (translationX < -50 && currentPage < pages.length - 1) {
      turnPage('next');
    } else if (translationX > 50 && currentPage > 0) {
      turnPage('prev');
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY.value}deg` },
      ],
    };
  });

  const toggleAutoRead = () => {
    if (!isAutoRead) {
      setIsAutoRead(true);
    } else {
      setIsAutoRead(false);
      Speech.stop();
    }
  };

  const leftPage = pages[currentPage];
  const rightPage = currentPage < pages.length - 1 ? pages[currentPage + 1] : null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.bookContainer}>
        {/* Control buttons */}
        <View style={styles.controls}>
          <Pressable
            style={[styles.button, isAutoRead && styles.buttonActive]}
            onPress={toggleAutoRead}
          >
            <Text style={styles.buttonText}>
              {isAutoRead ? '⏸ Pause' : '▶ Auto-Read'}
            </Text>
          </Pressable>
          <Text style={styles.modeText}>
            Mode: {isAutoRead ? 'Auto-Read' : 'Self-Read'}
          </Text>
        </View>

        {/* Book spread (two pages side by side) */}
        <PanGestureHandler onEnded={onGestureEvent}>
          <Animated.View style={[styles.bookSpread, animatedStyle]}>
            <View style={styles.spread}>
              {/* Left page */}
              <BookPage page={leftPage} isLeft={true} />

              {/* Right page */}
              {rightPage && <BookPage page={rightPage} isLeft={false} />}
            </View>
          </Animated.View>
        </PanGestureHandler>

        {/* Navigation arrows */}
        <View style={styles.navigation}>
          <Pressable
            style={[styles.navButton, currentPage === 0 && styles.navButtonDisabled]}
            onPress={() => turnPage('prev')}
            disabled={currentPage === 0}
          >
            <Text style={styles.navButtonText}>← Previous</Text>
          </Pressable>

          <Text style={styles.pageInfo}>
            Page {currentPage + 1} of {pages.length}
          </Text>

          <Pressable
            style={[styles.navButton, currentPage >= pages.length - 1 && styles.navButtonDisabled]}
            onPress={() => turnPage('next')}
            disabled={currentPage >= pages.length - 1}
          >
            <Text style={styles.navButtonText}>Next →</Text>
          </Pressable>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B7355',
  },
  bookContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  button: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonActive: {
    backgroundColor: '#E74C3C',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modeText: {
    color: '#F5F5DC',
    fontSize: 16,
    fontWeight: '600',
  },
  bookSpread: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  spread: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    width: width - 40,
  },
  navButton: {
    backgroundColor: '#2C3E50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  navButtonDisabled: {
    backgroundColor: '#95A5A6',
    opacity: 0.5,
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pageInfo: {
    color: '#F5F5DC',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Book;
