import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from '../Screens/HomeScreen';
import topAppBar from '../Components/topAppBarComponent';

export default function MainNavigator() {
    const Stack = createNativeStackNavigator();
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Chats" component={HomeScreen} />
            <Stack.Screen name="Home" component={topAppBar} />
        </Stack.Navigator>
    </NavigationContainer>
    );
}
