import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {validatePassword, validatePhoneNumber} from '../../../utils/helpers';
import {Button, Input} from 'native-base';
import MainLayout from '../../layouts/MainLayouts';
import {styles} from './SignInScreen.styles';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {LoginUser} from '../../../utils/types';
import {login} from '../../../store/auth/auth.actions';
import {NavigationProp} from '@react-navigation/native';
import {authSelectors} from '../../../store/auth/auth.selectors';
import {currentUserSelector} from '../../../store/user/user.selectors';

const SignInScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelectors);
  const user = useAppSelector(currentUserSelector);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      mobile: '',
      password: '',
    },
  });

  useEffect(() => {
    if (auth) {
      navigation.navigate('MainScreen');
    }
  }, [auth, navigation]);

  const onSubmit = (data: LoginUser) => {
    dispatch(login(data));
  };
  console.log(user);
  return (
    <MainLayout>
      <View style={styles.SignUpWrapper}>
        <Text style={styles.SignUpHeading}>Sign In</Text>
      </View>
      <View style={styles.InputContainer}>
        <View style={styles.InputWrapper}>
          <Text>Enter your mobile number</Text>
          <Controller
            control={control}
            name={'mobile'}
            rules={{
              required: 'This field is required',
              validate: validatePhoneNumber,
            }}
            render={({field: {onChange, value}}) => (
              <View>
                <Input
                  keyboardType={'numeric'}
                  size={'lg'}
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Enter your mobile number'}
                  style={{flex: 1}}
                />
                {errors.mobile && (
                  <Text style={{color: 'tomato'}}>
                    {errors.mobile?.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <View style={styles.InputWrapper}>
          <Text>Enter your password</Text>
          <Controller
            control={control}
            name={'password'}
            rules={{
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password must contain at least 8 characters!',
              },
              validate: validatePassword,
            }}
            render={({field: {onChange, value}}) => (
              <View>
                <Input
                  type={'text'}
                  size={'lg'}
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Enter your password'}
                  style={{flex: 1}}
                />
                {errors.password && (
                  <Text style={{color: 'tomato'}}>
                    {errors.password?.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <View />
        <Button style={styles.SubmitButton} onPress={handleSubmit(onSubmit)}>
          Sign In
        </Button>
      </View>
    </MainLayout>
  );
};

export default SignInScreen;
