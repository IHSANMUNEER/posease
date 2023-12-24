import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import colors from '../components/colors';

const MyStatusBar = () => {
  return (
    <SafeAreaView style={{backgroundColor: colors.primary}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'light-content'}
      />
    </SafeAreaView>
  );
};

export default MyStatusBar;