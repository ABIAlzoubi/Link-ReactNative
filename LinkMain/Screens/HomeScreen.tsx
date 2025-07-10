/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Alert,
    FlatList,
    TextInput,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import ChatListComponent from '../Components/chatListComponent';
import OnlineComponent from '../Components/onlineComponent';
import ContacsComponent from '../Components/contactsComponent';


import { SwipeListView } from 'react-native-swipe-list-view';
import { API_BASE_URL } from '../Utils/NgRockLink';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native-gesture-handler';
import { dimensions as  Dimensions} from '../Utils/values';
const screenHeight = Dimensions.screenHeight;
const screenWidth = Dimensions.screenWidth;

import {colors} from '../Utils/values';
import Icon from 'react-native-vector-icons/FontAwesome';

type ActiveUser = {
  userID: number;
  username: string;
  profilepic: string;
};

type Chat = {
  chat_id: number;
  name: string;
  is_active: string;
  chat_type: string;
  content: string;
  sent_at: string;
  unreaded: number;
  profilepic: string;
};


type NumberOfUnreadedMessages = {
  chat_id: number;
  unread_count: number;
};


type Contact = {
  contacT_USER_ID:string;
  username: string;
  profilepic: string;
};
const HomeScreen = () =>{
    const userId = 1;
    const [playLootie,setPlayLootie] = useState(false);
    const [isLoadingChats, setIsLoadingChats] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(true);

    const [chatsList, setChatsList] = useState<Chat[]>([]);
    const [activeUsersList,setActiveUsersList] = useState<ActiveUser[]>([]);
    const [lastIndex] = useState(chatsList.length - 1);

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const [searchValue,setSearchValue] = useState('');
    const [searchInChatList,setsearchInChatList] = useState<Contact[]>([]);
    const [searchedList,setSearchedList] = useState<Contact[]>([]);


    const Search = async (searchtext:string ) => {
      setIsLoadingSearch(true);
      try{
        const rsponse = await axios.get(`${API_BASE_URL}/api/HomeScreen/searchForUser/${searchtext}`);
        setSearchedList(rsponse.data);
      }catch{

      }
      const filteredChats = chatsList.filter(user => user.name.toLowerCase().includes(searchtext.toLowerCase()));
      const filter: Contact[] = filteredChats.map(chat => ({
        contacT_USER_ID: chat.chat_id.toString(),
        username: chat.name,
        profilepic: chat.chat_type === 'group' ? 'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png' : chat.profilepic,
      }));
      setsearchInChatList(filter);
      setIsLoadingSearch(false);
    };

    function combineUnreadCounts(

      chatsListData:Chat[],
      numberOfUnreadedMessages: NumberOfUnreadedMessages[]
      ): Chat[] {
      const unreadMap = new Map(
        numberOfUnreadedMessages.map(({ chat_id, unread_count }) => [chat_id, unread_count])
      );

      return chatsListData.map(chat => ({
        ...chat,
        unreaded: unreadMap.get(chat.chat_id) ?? 0,
      }));
    }

    useFocusEffect(
    useCallback(() => {
      setSearchValue('');
      setIsLoadingChats(true);
      const fetchData = async () => {
        try {
          const chatResponse = await axios.get(`${API_BASE_URL}/api/HomeScreen/GetAllChatsByuserID/${userId}`);
          const activeUsersResponse = await axios.get(`${API_BASE_URL}/api/HomeScreen/GetActiveUsers/${userId}`);
          const numberOfUnreadedResponse = await axios.get(`${API_BASE_URL}/api/HomeScreen/GetAllUnreadMessagesCount/${userId}`);

          setActiveUsersList(activeUsersResponse.data);

          const enriched = combineUnreadCounts(chatResponse.data, numberOfUnreadedResponse.data);
          setChatsList(enriched);

        } catch (error) {
          console.error('Failed to fetch data:', error);
        }finally {
          setIsLoadingChats(false);
        }
      };

      fetchData();
    }, [userId])
    );

    const handleDelete = (item:number) => {
        setChatsList((prev) => prev.filter((chat) => chat.chat_id !== item));
    };
    const handleMessageSeen = (item:number) => {
        Alert.alert('Archived', `Chat ${item} archived`);
    };



  return(
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.AppBar}>
          <View style={styles.container}>
            <Text style={styles.Title}>Link</Text>
            <View style={styles.SearchContainer}>
              <TextInput
                  numberOfLines={1}
                  multiline={false}
                  placeholderTextColor={colors.TextColor}
                  placeholder="Search..."
                  value = {searchValue}
                  style={styles.searchInput}
                  onChangeText={(text) => {
                    setSearchValue(text);
                    if (debounceTimeout.current) {
                      clearTimeout(debounceTimeout.current);
                    }
                    debounceTimeout.current = setTimeout(() => {
                      if (text.trim() === '') {
                        setsearchInChatList([]);
                        setSearchedList([]);
                      } else {
                        Search(text);
                      }
                    }, 400);
                  }}
              />
              <Icon name="search" size={18} color={colors.primaryColor} />
            </View>
          </View>
        </View>

    {isLoadingChats ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: screenHeight}}>
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      ) : searchValue !== '' ?
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}>
          {isLoadingSearch && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: screenHeight * 0.5 }}>
              <ActivityIndicator size="large" color={colors.primaryColor} />
            </View>
          )}

          {!isLoadingSearch && searchedList.length === 0 && searchInChatList.length === 0 &&
          <>
            <LottieView
              source={require('../Assets/Animations/NotFoundSearchIcon.json')}
              autoPlay = {true}
              loop={true}
              style={{ width: 250, height: 250 ,alignSelf:'center'}}
            />
            <Text style={{ textAlign: 'center',color: colors.primaryColor,fontSize:20,fontWeight:'bold' }}>
              No contacts found.
            </Text>
          </>
          }


          {searchInChatList.length > 0 &&
          <>
            <Text>Your Chats</Text>
            <FlatList
            data={searchInChatList}
            keyExtractor={(item) => item.contacT_USER_ID}
            renderItem={({item}) => (
                <TouchableOpacity
                    activeOpacity={1} onPress={() => {}}>
                    <ContacsComponent contact={item}/>
                </TouchableOpacity>
            )}
            scrollEnabled={false}
            />
          </>
          }
          {searchedList.length > 0 &&
          <>
            <Text>Link Users</Text>
            <FlatList
              data={searchedList}
              keyExtractor={(item) => item.contacT_USER_ID}
              renderItem={({item}) => (
                  <TouchableOpacity
                      activeOpacity={1} onPress={() => {}}>
                      <ContacsComponent contact={item}/>
                  </TouchableOpacity>
              )}
              scrollEnabled={false}
            /></>
          }

        </ScrollView> :
        <>
          <FlatList
          data={activeUsersList}
          keyExtractor={(item) => item.userID.toString()}
          renderItem={({item}) => (
              <TouchableOpacity
                  activeOpacity={1} onPress={() => {}}>
                  <OnlineComponent AcUser={item}/>
              </TouchableOpacity>
          )}
          horizontal
          style={styles.onlineList}
        />

      <SwipeListView
        data={chatsList}
        keyExtractor={(item) => item.chat_id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity
                activeOpacity={1} onPress={() => {}} >
                <ChatListComponent chat={item}/>
            </TouchableOpacity>
        )}


        renderHiddenItem={({item,index}) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backLeftBtn, styles.backBtn ,{ marginBottom: lastIndex === index ? (screenHeight * 0.0646) : 0 }]}
                onPress={() => handleMessageSeen(item.chat_id)}
            >
            <LottieView
                source={require('../Assets/Animations/MessageReaded.json')}
                autoPlay = {playLootie}
                loop={false}
                style={{ width: 50, height: 50 }}
            />
            <Text style={styles.HiddenItemsTitle}>Unread</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={[styles.backRightBtn, styles.backBtn ,{ marginBottom: lastIndex === index ? (screenHeight * 0.0627) : 0 }]}
                onPress={() => handleDelete(item.chat_id)}
            >
            <LottieView
                source={require('../Assets/Animations/trashAnimation.json')}
                autoPlay = {playLootie}
                loop={false}
                style={{ width: 52, height: 52 }}
            />
            <Text style={styles.HiddenItemsTitle}>Delete</Text>
            </TouchableOpacity>

        </View>
        )}
        leftOpenValue={screenWidth * 0.4}
        rightOpenValue={-screenWidth * 0.4}
        swipeToOpenPercent={screenWidth * 0.15}
        disableRightSwipe={false}
        disableLeftSwipe={false}
        showsVerticalScrollIndicator={false}
        closeOnRowPress={true}
        onRowOpen={() => setPlayLootie(true)}
        onRowDidOpen={() => setPlayLootie(false)}
        contentContainerStyle={{flexGrow: 1,paddingBottom: screenHeight * 0.05 }}
        />
        </>
      }


    </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  backBtn: {
    width: 75,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  backLeftBtn: {
    backgroundColor: '#4caf50',
  },
  backRightBtn: {
    backgroundColor: '#f44336',
  },
  backTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
  },
  onlineList:{
    height: screenWidth * 0.23,
    maxHeight:screenWidth * 0.23,
    minHeight:screenWidth * 0.23,
    width:'100%',
    minWidth:'100%',
    borderColor:'#edebeb',
    borderBottomWidth:1,
  },
  HiddenItemsTitle:{
    color:'white',
    fontWeight:'bold',
    fontSize:12,
  },








  AppBar:{
      height: screenHeight * 0.07,
      width: screenWidth,
      display:'flex',
      alignItems:'center',
      marginBottom:screenWidth * 0.01,
      paddingHorizontal:screenWidth * 0.02,
  },
  container:{
      height:'100%',
      width:'100%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
  },
  Title:{
      fontSize:screenWidth * 0.11,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: colors.primaryColor,
  },
  SearchContainer:{
      height:screenWidth * 0.11,
      width:'77%',
      minWidth:'77%',
      maxWidth:'77%',
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      borderColor:'lightgray',
      borderWidth:1,
      borderRadius:999,
      padding:0,
      paddingHorizontal:screenWidth * 0.03,
  },
  searchInput:{
      fontSize:13,
      maxWidth:'95%',
      minWidth:'95%',
      width:'95%',
      height:'100%',
      color:'black',
      writingDirection: 'auto',
  },
});


