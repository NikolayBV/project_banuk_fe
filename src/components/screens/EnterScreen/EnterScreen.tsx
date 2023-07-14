import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {styles} from './EnterScreen.styles';
import {NavigationProp} from '@react-navigation/native';
import MainLayout from '../../layouts/MainLayouts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';

interface EnterScreenProps {
  navigation: NavigationProp<any>;
}

const EnterScreen = ({navigation}: EnterScreenProps) => {
  useEffect(() => {
    const getToken = async () => {
      return await AsyncStorage.getItem('access_token');
    };
    getToken().then(res => {
      if (res) {
        navigation.navigate('MainScreen');
      }
    });
  }, [navigation]);

  return (
    <MainLayout>
      <View style={styles.EnterScreenWrapper}>
        <Text style={styles.EnterHeading}>Welcome to my messenger!</Text>
        <View style={styles.ButtonGroup}>
          <Button
            style={styles.Button}
            mode={'contained'}
            onPress={() => navigation.navigate('SignIn')}>
            Login
          </Button>
          <Button
            style={styles.Button}
            mode={'contained'}
            onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Button>
        </View>
      </View>
    </MainLayout>
  );
};

export default EnterScreen;
