import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView } from '@react-native-community/blur';
import {dimensions,colors} from '../Utils/values';
import {
    //useNavigation,
    //useRoute,
    } from '@react-navigation/native';


const bottmNavHeight = dimensions.screenHeight * 0.075;
const bottmNavWedth = dimensions.screenWidth;
const BottomAppbar = () => {


    //const navigation = useNavigation();
    //const route = useRoute();
    //const currentRoute = route.name;

    const currentRoute = 'Chats';
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

                        <View style={currentRoute === 'Contacts' ? styles.selectedIcon : styles.UnselectedIcon}>
                            <Icon name="group" size={27} color={colors.primaryColor} onPress={() => {}} />
                            <Text style={styles.iconTitle}>Contacts</Text>
                        </View>

                        <View style={currentRoute === 'Chats' ? styles.selectedIcon : styles.UnselectedIcon}>
                            <Icon name="comments-o" size={25} color={colors.backgroundColor} onPress={() => {}} />
                            <Text style={styles.SelectedIconTitle}>Chats</Text>
                        </View>

                        <View style={currentRoute === 'Profile' ? styles.selectedIcon : styles.UnselectedIcon}>
                            <Icon name="user" size={27} color={colors.primaryColor} onPress={() => {}} />
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
        elevation:10,
    },
    blurContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    iconsContainer: {
        width: '100%',
        height: '95%',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
    },
    UnselectedIcon:{
        width:'15%',
        height:'100%',
        paddingTop:'3%',
        alignItems:'center',
    },
    iconTitle:{
        fontSize:12,
        includeFontPadding: false,
    },
    selectedIcon: {
        width:'20%',
        height:'65%',
        borderRadius: 99 ,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.primaryColor,
        marginBottom:10,
    },
    SelectedIconTitle:{
        display: 'none',
    },
});

export default BottomAppbar;
