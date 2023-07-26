import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {validatePassword, validatePhoneNumber} from '../../../utils/helpers';
import MainLayout from '../../layouts/MainLayouts';
import {styles} from './SignInScreen.styles';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  IFetchingStatuses,
  LoginUser,
  RootNavigationProp,
} from '../../../utils/types';
import {login} from '../../../store/auth/auth.actions';
import {
  authSelectors,
  loadingSelectors,
} from '../../../store/auth/auth.selectors';
import {useNavigation} from '@react-navigation/native';
import {Button, Input} from 'native-base';
import {setUnAuth} from '../../../store/auth/auth.slice';
import {setUser} from '../../../store/user/user.slice';
import LoadingSpinner from '../../common/LoadingSpinner/index';

const SignInScreen = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelectors);
  const loading = useAppSelector(loadingSelectors);
  const navigation = useNavigation<RootNavigationProp>();
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
  /*useEffect(() => {
    dispatch(setUnAuth());
    dispatch(setUser(null));
  }, [dispatch]);*/

  useEffect(() => {
    if (auth) {
      navigation.navigate('MainScreen');
    }
  }, [auth, navigation]);

  const onSubmit = (data: LoginUser) => {
    dispatch(login(data));
  };
  console.log(auth);
  return (
    <MainLayout>
      <View style={styles.SignUpWrapper}>
        <Text style={styles.SignUpHeading}>Sign In</Text>
      </View>
      {loading === IFetchingStatuses.pending && <LoadingSpinner />}
      <View style={styles.InputContainer}>
        <View style={styles.InputWrapper}>
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
                  variant={'outlined'}
                  keyboardType={'numeric'}
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Enter your mobile number'}
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
                  onChangeText={onChange}
                  value={value}
                  placeholder={'Enter your password'}
                  variant="outlined"
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
        <Button
          variant={'contained'}
          style={styles.SubmitButton}
          onPress={handleSubmit(onSubmit)}>
          Sign In
        </Button>
      </View>
    </MainLayout>
  );
};

export default SignInScreen;
