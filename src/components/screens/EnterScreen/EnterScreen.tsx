import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './EnterScreen.styles';
import {Box, Button} from 'native-base';
import {NavigationProp} from '@react-navigation/native';
import MainLayout from '../../layouts/MainLayouts';

interface EnterScreenProps {
  navigation: NavigationProp<any>;
}

const EnterScreen = ({navigation}: EnterScreenProps) => {
  return (
    <MainLayout>
      <View style={styles.EnterScreenWrapper}>
        <Text style={styles.EnterHeading}>Welcome to my messenger!</Text>
        <Box style={styles.ButtonGroup}>
          <Button style={styles.Button} size="lg" variant="solid">
            Login
          </Button>
          <Button
            style={styles.Button}
            size="lg"
            variant="solid"
            onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Button>
        </Box>
      </View>
    </MainLayout>
  );
};

export default EnterScreen;
