import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import {dimensions,colors} from '../Utils/values';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';
// import { API_BASE_URL } from '../Utils/NgRockLink';
// import axios from 'axios';

const screenHeight = dimensions.screenHeight;
const screenWidth = dimensions.screenWidth;


const SecondaryTopAppbar = ({userProfileInfo}) =>{
    const navigation = useNavigation();



    return(
    <View style={styles.Container}>

        <TouchableOpacity
            onPress={()=>{navigation.navigate('Chats');}}
            style={styles.iconContainer}
        >
            <Icon
                name={'arrow-left'}
                size={22}
                color={ colors.primaryColor}
                activeOpacity={0.3}
            />
        </TouchableOpacity>
        <Image source={{uri:userProfileInfo.Image}}/>
        <View style={styles.titleContainer}>
        <Text style={styles.iconTitle}>{userProfileInfo.UserName}</Text>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    Container:{
    height: screenHeight * 0.04,
    width: screenWidth,
    display:'flex',
    flexDirection:'row',
    paddingHorizontal:screenWidth * 0.04,
    justifyContent: 'space-between',
    },
    iconContainer:{
        width: screenWidth * 0.1,
        justifyContent: 'center',
    },
    titleContainer: {
    flexDirection:'row',
    alignItems: 'center',
    },
    iconTitle:{
        textAlign:'center',
        fontSize:17,
        color:colors.primaryColor,
        fontWeight:'bold',
    },
});
export default SecondaryTopAppbar;

