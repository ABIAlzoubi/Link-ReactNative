import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView } from '@react-native-community/blur';
import { dimensions, colors } from '../Utils/values';

const bottmNavHeight = dimensions.screenHeight * 0.075;
const bottmNavWedth = dimensions.screenWidth;


const BottomAppbar = ({ state,navigation }) => {
    const currentRoute = state.routes[state.index].name;

    if (currentRoute === 'ChatRoomScreen') {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.blurWrapper}>
                <BlurView
                    style={styles.blurContainer}
                    blurType="light"
                    blurAmount={7}
                    reducedTransparencyFallbackColor="white"
                >
                    <View style={styles.iconsContainer}>
                        {state.routes.filter(route => route.name !== 'ChatRoomScreen').map((route, index) => {
                            const isFocused = state.index === index;


                            let iconName = 'circle';
                            if (route.name === 'Contacts') {iconName = 'group';}
                            else if (route.name === 'Chats') {iconName = 'comments-o';}
                            else if (route.name === 'Profile') {iconName = 'user';}

                            const onPress = () => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    canPreventDefault: true,
                                });

                                if (!isFocused && !event.defaultPrevented) {
                                    navigation.navigate(route.name);
                                }
                            };

                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    onPress={onPress}
                                    style={isFocused ? styles.selectedIcon : styles.UnselectedIcon}
                                    activeOpacity={0.7}
                                >
                                    <Icon
                                        name={iconName}
                                        size={isFocused ? 22 : 27}
                                        color={isFocused ? colors.backgroundColor : colors.primaryColor}
                                    />
                                    {!isFocused && <Text style={styles.iconTitle}>{route.name}</Text>}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </BlurView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: bottmNavWedth,
        height: bottmNavHeight,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'transparent',
    },
    blurWrapper: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        elevation: 10,
    },
    blurContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    iconsContainer: {
        width: '100%',
        height: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    UnselectedIcon: {
        width: '20%',
        height: '100%',
        paddingTop: '3%',
        alignItems: 'center',
    },
    iconTitle: {
        fontSize: 12,
        includeFontPadding: false,
        color: colors.primaryColor,
        fontWeight:'bold',
    },
    selectedIcon: {
        width: '20%',
        height: '65%',
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryColor,
        marginBottom: 10,
    },
});

export default BottomAppbar;
