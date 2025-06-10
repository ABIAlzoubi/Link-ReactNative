/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text,Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const  SigninScreen = () =>
{
    const { width, height } = Dimensions.get('window');
    return(
        <SafeAreaView  style={{ flex: 1 }}>
        <Text >Hello Sign in {width},{height}</Text>
        </SafeAreaView>
    );

};
export default SigninScreen;

