/* eslint-disable react/no-unstable-nested-components */
// MainNavigator.tsx
import React from 'react';

import ChatsScreen from '../Screens/HomeScreen';
import ContactsScreen from '../Screens/ContactsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import ChatScreen from '../Screens/ChatScreen';

import BottomAppbar from '../Components/bottomAppBar';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function BottomBarTabs() {
return (
    <Tab.Navigator tabBar={props => <BottomAppbar {...props} />} initialRouteName="Profile">

    <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
            headerShown: false,
            tabBarLabel: () => 'Contacts',
            tabBarIcon: () => null,
        }}
    />

    <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
            headerShown: false,
            tabBarLabel: () => 'Chats',
            tabBarIcon: () => null,
        }}
    />

    <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
            headerShown: false,
            tabBarLabel: () => 'Profile',
            tabBarIcon: () => null,
        }}
    />

    <Tab.Screen
        name="ChatRoomScreen"
        component={ChatScreen}
        options={{
            headerShown: false,
            tabBarLabel: () => 'ChatRoom',
            tabBarIcon: () => null,
        }}
    />

    </Tab.Navigator>
);
}
