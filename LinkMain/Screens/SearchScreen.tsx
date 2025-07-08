import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dimensions as  Dimensions} from '../Utils/values';
import { FlatList } from 'react-native-gesture-handler';
import SeachedComponent from '../Components/contactsComponent';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { API_BASE_URL } from '../Utils/NgRockLink';
// const screenHeight = Dimensions.screenHeight;
const screenWidth = Dimensions.screenWidth;

type Contact = {
    contacT_USER_ID:string;
    username: string;
    profilepic: string;
};
const SearchScreen = () =>{
    const userId = 1;
    const [searchList,setSearchList] = useState<Contact[]>([]);


useFocusEffect(
    useCallback(()=>{
    const fetchData = async () => {
        try {
        const chatResponse = await axios.get(`${API_BASE_URL}/api/Contacts/GetAllContacts/${userId}`);
        setSearchList(chatResponse.data);

        } catch (error) {
        console.error('Failed to fetch data:', error);
        }
    };

    fetchData();
    },[userId])
    );


    return(
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={searchList}
                keyExtractor={(item) => item.contacT_USER_ID.toString()}
                renderItem={({item}) => (
                <TouchableOpacity
                    activeOpacity={1} onPress={() => {}}>
                    <SeachedComponent contact={item }/>
                </TouchableOpacity>
            )}
            horizontal
            style={styles.SearchList}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create(
{
    safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    },
    SearchList:{
    height: screenWidth * 0.23,
    maxHeight:screenWidth * 0.23,
    minHeight:screenWidth * 0.23,
    width:'100%',
    },
}
);
export default SearchScreen;
