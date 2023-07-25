import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {styles} from './EnterScreen.styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import MainLayout from '../../layouts/MainLayouts';
import {useAuth} from '../../../utils/hooks/useAuth';
import {RootNavigationProp} from '../../../utils/types';
import {Button} from 'native-base';

const EnterScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <MainLayout>
      <View style={styles.EnterScreenWrapper}>
        <Text style={styles.EnterHeading}>Welcome to my messenger!</Text>
        <View style={styles.ButtonGroup}>
          <Button
            style={styles.Button}
            variant={'contained'}
            onPress={() => navigation.navigate('SignInScreen')}>
            Login
          </Button>
          <Button
            style={styles.Button}
            variant={'contained'}
            onPress={() => navigation.navigate('SignUpScreen')}>
            Sign Up
          </Button>
        </View>
      </View>
    </MainLayout>
  );
};

export default EnterScreen;
