import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView } from '@react-native-community/blur';

const screenWidth = Dimensions.get('window').width;
const screeHight = Dimensions.get('window').height;

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
                        <Icon name="search" size={20} color="gray" onPress={() => {}} />
                        <Icon name="home" size={20} color="gray" onPress={() => {}} />
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
        width: screenWidth,
        height: screeHight * 0.075,
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: '100%',
    },
});

export default BottomAppbar;
