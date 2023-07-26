import {Heading, HStack, Spinner} from 'native-base';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading fontSize="md">Loading</Heading>
    </HStack>
  );
};

export default LoadingSpinner;
