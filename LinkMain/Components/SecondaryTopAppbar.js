import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import {dimensions,colors} from '../Utils/values';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API_BASE_URL } from '../Utils/NgRockLink';
import axios from 'axios';

const screenHeight = dimensions.screenHeight;
const screenWidth = dimensions.screenWidth;


const SecondaryTopAppbar = ({userProfileInfo}) =>{
    const navigation = useNavigation();
    const route = useRoute();
    const routeName = route.name;


    const SaveChanges = async () =>{
        try{
        if (userProfileInfo.imageFormData) {
        const ImagePath = await axios.post(
        `${API_BASE_URL}/api/Profile/UploadProfileImage/${userProfileInfo.userid}`,
        userProfileInfo.imageFormData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
        }
        );
        userProfileInfo.profilepic = ImagePath.data.imageUrl;
        }
        await axios.put(`${API_BASE_URL}/api/Profile/UpdateUserProfile`,userProfileInfo);


        navigation.navigate('Chats');
        }
        catch{
            console.error('Error updating profile:');
        }
    };



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

        <View style={styles.titleContainer}>
            <Text style={styles.iconTitle}>{routeName}</Text>
        </View>

        <TouchableOpacity
            style={styles.titleContainer}
            onPress={()=>{routeName === 'Profile' ? SaveChanges() : routeName === 'Contacts' ? navigation.navigate('Chats') : null;}}
        >
            <Text style={styles.iconTitle}>{routeName === 'Profile' ? 'Save' : routeName === 'Contacts' ? 'Done' : null}</Text>
        </TouchableOpacity>
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

