import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {styles} from './EnterScreen.styles';
import {Box, Button} from 'native-base';
import {NavigationProp} from '@react-navigation/native';
import MainLayout from '../../layouts/MainLayouts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../../../store/hooks';
import {setAuth} from '../../../store/auth/auth.slice';

interface EnterScreenProps {
  navigation: NavigationProp<any>;
}

const EnterScreen = ({navigation}: EnterScreenProps) => {
  useEffect(() => {
    const getToken = async () => {
      return await AsyncStorage.getItem('access_token');
    };
    getToken().then(res => {
      console.log(res, 'token');
      if (res) {
        navigation.navigate('MainScreen');
      }
    });
  }, [navigation]);

  return (
    <MainLayout>
      <View style={styles.EnterScreenWrapper}>
        <Text style={styles.EnterHeading}>Welcome to my messenger!</Text>
        <Box style={styles.ButtonGroup}>
          <Button
            style={styles.Button}
            size="lg"
            variant="solid"
            onPress={() => navigation.navigate('SignIn')}>
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
