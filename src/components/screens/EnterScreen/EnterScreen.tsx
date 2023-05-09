import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './EnterScreen.styles';

const EnterScreen = () => {
  return (
    <View style={styles.EnterScreenWrapper}>
      <Text style={styles.EnterHeading}>Welcome to my messenger!</Text>
    </View>
  );
};

export default EnterScreen;
