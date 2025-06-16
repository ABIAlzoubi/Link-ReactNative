import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView } from '@react-native-community/blur';
import {dimensions,colors} from '../Utils/values';



const BottomAppbar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.blurWrapper}>
                <BlurView
                    style={styles.blurContainer}
                    blurType="light"
                    blurAmount={5}
                    reducedTransparencyFallbackColor="white"
                >
                    <View style={styles.iconsContainer}>
                        <View style={styles.singleIconContainer}>
                            <Icon name="group" size={27} color="gray" onPress={() => {}} />
                            <Text style={styles.iconTitle}>Contacts</Text>
                        </View>
                        <View style={styles.selectedIcon}>
                            <Icon name="comments-o" size={25} color={colors.secondary} onPress={() => {}} />
                            <Text style={styles.SelectediconTitle}>Chats</Text>
                        </View>
                        <View style={styles.singleIconContainer}>
                            <Icon name="user" size={27} color="gray" onPress={() => {}} />
                            <Text style={styles.iconTitle}>Profile</Text>
                        </View>
                    </View>
                </BlurView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: dimensions.screenWidth,
        height: dimensions.screenHight * 0.075,
        backgroundColor: 'transparent',
    },
    blurWrapper: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        elevation:5,
    },
    blurContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconsContainer: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        width: '100%',
        height: '100%',
    },
    singleIconContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    iconTitle:{
        fontSize:12,
    },
    selectedIcon: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.primaryColor,
        borderColor: 'white',
        borderWidth: 1,
        width:dimensions.screenWidth * 0.22,
        height:dimensions.screenWidth * 0.11,
        borderRadius: dimensions.screenWidth * 0.15 ,
        transform: [{ translateY: -5 }],
    },
    SelectediconTitle:{
        display: 'none',
    },
});

export default BottomAppbar;
