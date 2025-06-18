import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SecondaryTopBar from '../Components/SecondaryTopAppbar';





const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.containe}>
      <SecondaryTopBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containe:{
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
