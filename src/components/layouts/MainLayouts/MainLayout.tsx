import React from 'react';
import {View} from 'react-native';
import {styles} from './MainLayouts.styles';

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return <View style={styles.MainLayoutWrapper}>{children}</View>;
};

export default MainLayout;
