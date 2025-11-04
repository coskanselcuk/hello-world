import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BookPage = ({ page, isLeft }) => {
  return (
    <View style={[styles.page, { backgroundColor: page.backgroundColor }]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{page.image}</Text>
        <Text style={styles.mainText}>{page.text}</Text>
        <Text style={styles.subText}>{page.content}</Text>
      </View>
      {/* Page number */}
      <Text style={[styles.pageNumber, isLeft ? styles.pageLeft : styles.pageRight]}>
        {page.id}
      </Text>
      {/* Book spine shadow effect */}
      {isLeft && <View style={styles.spineLeft} />}
      {!isLeft && <View style={styles.spineRight} />}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: width / 2,
    height: height * 0.8,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4C5B9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#2C3E50',
    fontFamily: 'System',
  },
  subText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#34495E',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    fontSize: 16,
    color: '#7F8C8D',
  },
  pageLeft: {
    left: 20,
  },
  pageRight: {
    right: 20,
  },
  spineLeft: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  spineRight: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});

export default BookPage;
