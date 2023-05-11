import React, {useRef} from 'react';
import {Text, View} from 'react-native';
import MainLayout from '../../layouts/MainLayouts';
import {styles} from './SignUp.styles';
import {Button, Input} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import PhoneInput from 'react-native-phone-input';

const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      mobile: '',
      nickName: '',
      password: '',
    },
  });

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\8\d{10}$/;
    if (!phoneNumber) {
      return 'Phone number cannot be empty';
    } else if (!phoneRegex.test(phoneNumber)) {
      return 'Phone number must start with 8 and have ten digits';
    }
    return true;
  };

  return (
    <MainLayout>
      <View style={styles.SignUpWrapper}>
        <Text style={styles.SignUpHeading}>Sign Up</Text>
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
          <Text>Enter your nickname</Text>
          <Controller
            control={control}
            name={'nickName'}
            rules={{required: 'This field is required'}}
            render={({field: {onChange, value}}) => (
              <View>
                <Input
                  type={'text'}
                  size={'lg'}
                  onChange={onChange}
                  value={value}
                  placeholder={'Enter your nickname'}
                  style={{flex: 1}}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.InputWrapper}>
          <Text>Enter your password</Text>
          <Controller
            control={control}
            name={'password'}
            rules={{required: 'This field is required'}}
            render={({field: {onChange, value}}) => (
              <View>
                <Input
                  type={'text'}
                  size={'lg'}
                  onChange={onChange}
                  value={value}
                  placeholder={'Enter your password'}
                  style={{flex: 1}}
                />
              </View>
            )}
          />
        </View>
        <View />
        <Button>Sign Up</Button>
      </View>
    </MainLayout>
  );
};

export default SignUpScreen;
